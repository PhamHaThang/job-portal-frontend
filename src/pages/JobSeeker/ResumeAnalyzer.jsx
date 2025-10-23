import { useState, useEffect, useMemo } from "react";
import {
  ANALYZE_RESUME_PROMPT,
  METRIC_CONFIG,
  buildPresenceChecklist,
} from "../../utils/data";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";
import TitlePage from "../../components/ui/TitlePage";
import toast from "react-hot-toast";
import {
  AlertCircle,
  Award,
  Check,
  CheckCircle2,
  FileUser,
  LoaderCircle,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { jsonrepair } from "jsonrepair";
import { motion, AnimatePresence } from "framer-motion";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ResumeAnalyzer = () => {
  useDocumentTitle("Đánh giá CV");
  const [aiReady, setAiReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [presenceChecklist, setPresenceChecklist] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.puter?.ai?.chat) {
        setAiReady(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const metricList = useMemo(() => METRIC_CONFIG, []);

  const extractPDFText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const pages = await Promise.all(
      Array.from({ length: pdf.numPages }, (_, index) =>
        pdf
          .getPage(index + 1)
          .then((page) =>
            page
              .getTextContent()
              .then((content) =>
                content.items
                  .map((item) => (item.str ? item.str.trim() : ""))
                  .join(" ")
              )
          )
      )
    );

    return pages.join("\n").replace(/\s+\n/g, "\n").trim();
  };

  const parseJSONResponse = (responseText) => {
    try {
      const repaired = jsonrepair(responseText);
      const parsed = JSON.parse(repaired);
      if (!parsed?.overallScore && !parsed?.error) {
        throw new Error("Phản hồi AI không hợp lệ.");
      }
      return parsed;
    } catch (error) {
      throw new Error(
        `Không thể đọc phản hồi từ AI. Chi tiết: ${error.message}`
      );
    }
  };

  const analyzeResume = async (text) => {
    const prompt = ANALYZE_RESUME_PROMPT.replace("{{DOCUMENT_TEXT}}", text);

    const response = await window.puter.ai.chat(
      [
        {
          role: "system",
          content:
            "Bạn là trợ lý giúp phân tích sơ yếu lý lịch và trả về JSON hợp lệ.",
        },
        { role: "user", content: prompt },
      ],
      {
        model: "gpt-5-nano",
      }
    );

    const raw =
      typeof response === "string"
        ? response
        : response?.message?.content || "";

    return parseJSONResponse(raw);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0] || null;

    if (!file || file.type !== "application/pdf") {
      toast.error("Vui lòng chọn tệp PDF hợp lệ.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước tệp tối đa 5MB.");
      return;
    }

    setUploadedFile(file);
    setIsLoading(true);
    setAnalysis(null);
    setResumeText("");
    setPresenceChecklist([]);
    setErrorMsg("");

    try {
      const text = await extractPDFText(file);
      setResumeText(text);
      setPresenceChecklist(buildPresenceChecklist(text));
      const result = await analyzeResume(text);
      if (result.error) {
        setErrorMsg(result.error);
        setAnalysis(null);
      } else {
        setAnalysis(result);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setAnalysis(null);
      toast.error(error.message || "Đã xảy ra lỗi khi phân tích CV.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setUploadedFile(null);
    setAnalysis(null);
    setResumeText("");
    setPresenceChecklist([]);
    setErrorMsg("");
    setIsLoading(false);
  };

  const renderMetric = (metric) => {
    const value = Number(
      analysis?.performanceMetrics?.[metric.key] ?? metric.defaultValue
    );
    return (
      <motion.div
        key={metric.key}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group/item rounded-2xl border border-primary-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${metric.colorClass} text-white shadow ${metric.shadowClass}`}>
            <metric.icon size={24} />
          </span>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {metric.label}
            </p>
            <p className="text-2xl font-semibold text-gray-900">{value}/10</p>
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all"
            style={{ width: `${Math.min(Math.max(value * 10, 0), 100)}%` }}
          />
        </div>
      </motion.div>
    );
  };

  const renderList = (title, items, emptyText, icon) => (
    <motion.section
      className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}>
      <header className="mb-4 flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600">
          {icon}
        </span>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </header>
      {Array.isArray(items) && items.length > 0 ? (
        <ul className="space-y-3 text-sm text-gray-700">
          {items.map((item, index) => (
            <motion.li
              key={`${title}-${index}`}
              className="flex gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}>
              <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-primary-500" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">{emptyText}</p>
      )}
    </motion.section>
  );

  return (
    <div className="min-h-screen pb-20 md:pb-24 pt-20 md:pt-24">
      <div className="px-2 sm:px-4">
        <TitlePage
          title="Đánh giá CV của bạn"
          description="Nhận phản hồi chi tiết và điểm số ATS để cải thiện hồ sơ xin việc."
        />
      </div>

      <motion.div
        className="mx-auto mt-6 md:mt-8 w-full max-w-5xl px-2 sm:px-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}>
        <motion.div
          className="rounded-2xl md:rounded-3xl border border-primary-200/70 bg-gradient-to-br from-primary-50 to-white p-4 md:p-6 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}>
          {!uploadedFile ? (
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 md:h-28 md:w-28 items-center justify-center rounded-2xl md:rounded-3xl bg-primary-100 text-primary-600">
                <FileUser
                  size={40}
                  strokeWidth={1}
                  className="md:w-[50px] md:h-[50px]"
                />
              </div>
              <h3 className="mt-4 md:mt-6 text-xl md:text-2xl font-semibold text-gray-800">
                Tải lên CV của bạn
              </h3>
              <p className="mt-2 text-xs md:text-sm text-gray-500 px-2">
                Chỉ hỗ trợ định dạng PDF, dung lượng tối đa 5MB.
              </p>

              <input
                id="resume-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                disabled={!aiReady || isLoading}
                onChange={handleFileUpload}
              />

              <label
                htmlFor="resume-upload"
                className={`mt-4 md:mt-6 inline-flex items-center gap-2 rounded-full px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold transition ${
                  !aiReady || isLoading
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "cursor-pointer bg-primary-600 text-white hover:bg-primary-700"
                }`}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                    <span className="hidden sm:inline">Đang phân tích...</span>
                    <span className="sm:hidden">Đang xử lý...</span>
                  </>
                ) : (
                  "Chọn tệp PDF"
                )}
              </label>

              {!aiReady && (
                <p className="mt-3 text-xs text-gray-400 px-2">
                  Đang khởi tạo AI, vui lòng chờ trong giây lát...
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3 md:gap-4 rounded-xl md:rounded-2xl border border-primary-100 bg-white/80 p-4 md:p-5 shadow-inner backdrop-blur">
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Tệp đã tải lên
                  </h4>
                  <p className="text-sm md:text-base font-semibold text-gray-800 truncate">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-600 hover:bg-gray-100 cursor-pointer w-full sm:w-auto justify-center">
                  <RotateCcw size={16} />
                  <span className="hidden sm:inline">Tải lại CV khác</span>
                  <span className="sm:hidden">Tải CV khác</span>
                </button>
              </div>

              {isLoading && (
                <div className="flex items-center gap-2 md:gap-3 rounded-lg md:rounded-xl border border-dashed border-primary-200 bg-primary-50/60 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm text-primary-700">
                  <LoaderCircle className="h-4 w-4 md:h-5 md:w-5 animate-spin flex-shrink-0" />
                  <span className="hidden sm:inline">
                    Đang phân tích CV, vui lòng chờ...
                  </span>
                  <span className="sm:hidden">Đang phân tích...</span>
                </div>
              )}

              {errorMsg && !isLoading && (
                <div className="flex items-start gap-2 md:gap-3 rounded-lg md:rounded-xl border border-red-200 bg-red-50 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm text-red-600">
                  <XCircle className="mt-0.5 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Không thể phân tích CV</p>
                    <p className="mt-1 text-xs text-red-500 break-words">
                      {errorMsg}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {analysis && !errorMsg && (
            <motion.div
              className="mt-6 md:mt-10 space-y-4 md:space-y-8"
              key="analysis-block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}>
              <section className="rounded-xl md:rounded-2xl border border-primary-100 bg-white p-4 md:p-6 shadow-sm">
                <header className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-primary-500">
                      Điểm tổng quan
                    </p>
                    <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-gray-900">
                      {analysis?.overallScore || "0/10"}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
                    <Award size={16} />
                    Phân tích hoàn tất
                  </div>
                </header>
                {analysis?.summary && (
                  <p className="mt-4 text-sm text-gray-600">
                    {analysis.summary}
                  </p>
                )}
              </section>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {renderList(
                  "Điểm mạnh nổi bật",
                  analysis?.strengths,
                  "Chưa phát hiện điểm mạnh cụ thể.",
                  <CheckCircle2 size={16} />
                )}
                {renderList(
                  "Mục cần cải thiện",
                  analysis?.improvements,
                  "Chưa phát hiện đề xuất cải thiện.",
                  <AlertCircle size={16} />
                )}
              </div>

              <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {metricList.map((metric) => renderMetric(metric))}
              </section>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {renderList(
                  "Từ khóa quan trọng",
                  analysis?.keywords,
                  "Chưa có gợi ý từ khóa.",
                  <CheckCircle2 size={16} />
                )}
                {renderList(
                  "Hành động đề xuất",
                  analysis?.actionItems,
                  "Chưa có hành động cụ thể.",
                  <AlertCircle size={16} />
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {renderList(
                  "Mẹo chuyên nghiệp",
                  analysis?.proTips,
                  "Chưa có mẹo chuyên sâu.",
                  <CheckCircle2 size={16} />
                )}
                {renderList(
                  "Danh sách ATS",
                  analysis?.atsChecklist,
                  "Chưa có yêu cầu ATS cụ thể.",
                  <AlertCircle size={16} />
                )}
              </div>

              <section className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">
                  Checklist hiện diện nội dung
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Dựa trên nội dung CV đã quét
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {presenceChecklist.map((item, index) => (
                    <li
                      key={`check-${index}`}
                      className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                      <span
                        className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                          item.present
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}>
                        {item.present ? (
                          <Check size={18} />
                        ) : (
                          <AlertCircle size={18} />
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.present
                            ? "Đã phát hiện trong CV"
                            : "Chưa phát hiện, hãy bổ sung"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {resumeText && (
                <section className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-900">
                    Trích xuất nội dung CV
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Nội dung được dùng để phân tích
                  </p>
                  <pre className="mt-4 max-h-64 overflow-y-auto rounded-xl bg-gray-50 p-4 text-xs leading-6 text-gray-700">
                    {resumeText}
                  </pre>
                </section>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResumeAnalyzer;
