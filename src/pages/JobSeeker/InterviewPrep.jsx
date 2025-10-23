import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoleInfoHeader from "../../components/ui/RoleInfoHeader";
import { formatDate } from "../../utils/format";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AnimatePresence, motion } from "framer-motion";
import QuestionCard from "../../components/ui/QuestionCard";
import toast from "react-hot-toast";
import { CircleAlert, ListCollapse, Loader, LoaderCircle } from "lucide-react";
import AIResponsePreview from "../../components/ui/AIResponsePreview";
import Drawer from "../../components/ui/Drawer";
import SkeletonLoader from "../../components/ui/SkeletonLoader";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
  parseJSONResponse,
} from "../../utils/helper";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const InterviewPrep = () => {
  useDocumentTitle("Luyện Phỏng Vấn");
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [aiReady, setAiReady] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.puter?.ai?.chat) {
        setAiReady(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);
  const fetchSessionDetailsById = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_SESSION_BY_ID(sessionId)
      );
      if (response.status === 200 && response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      setErrorMsg(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Lỗi khi tải chi tiết buổi luyện tập."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const generateConceptExplanation = async (question) => {
    if (!aiReady) {
      toast.error("AI chưa sẵn sàng, vui lòng thử lại sau.");
      return;
    }

    setErrorMsg("");
    setExplanation(null);
    setIsLoading(true);
    setOpenLearnMoreDrawer(true);
    try {
      const prompt = conceptExplainPrompt(question);
      const response = await window.puter.ai.chat(
        [
          {
            role: "system",
            content: "Bạn là trợ lý giải thích kiến thức phỏng vấn.",
          },
          { role: "user", content: prompt },
        ],
        { model: "gpt-5-nano" }
      );
      const raw =
        typeof response === "string"
          ? response
          : response?.message?.content || "";
      const parsed = parseJSONResponse(raw);
      setExplanation(parsed);
    } catch (error) {
      setExplanation(null);
      setErrorMsg(error.message || "Lỗi khi tạo giải thích.");
      toast.error(error.message || "Lỗi khi tạo giải thích.");
    } finally {
      setIsLoading(false);
    }
  };
  const toggleQuestionPinStatus = async (questionId) => {
    if (!questionId) return;
    try {
      const response = await axiosInstance.put(
        API_PATHS.QUESTION.TOGGLE_PIN(questionId)
      );
      if (response.status === 200 && response.data && response.data.question) {
        const updatedQuestion = response.data.question;
        toast.success(
          updatedQuestion.isPinned
            ? "Câu hỏi đã được ghim."
            : "Câu hỏi đã được bỏ ghim."
        );
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error toggling question pin status:", error);
      toast.error(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Lỗi khi cập nhật trạng thái ghim câu hỏi."
      );
    }
  };
  const uploadMoreQuestions = async () => {
    if (!aiReady) {
      toast.error("AI chưa sẵn sàng, vui lòng thử lại sau.");
      return;
    }
    const loadToastId = toast.loading("Đang tải thêm câu hỏi...");
    try {
      setIsUpdateLoader(true);
      const prompt = questionAnswerPrompt(
        sessionData.role,
        sessionData.experience,
        sessionData.topicsToFocus,
        5
      );
      const response = await window.puter.ai.chat(
        [
          {
            role: "system",
            content: "Bạn là AI chuyên tạo câu hỏi phỏng vấn.",
          },
          { role: "user", content: prompt },
        ],
        { model: "gpt-5-nano" }
      );

      const raw =
        typeof response === "string"
          ? response
          : response?.message?.content || "";
      const parsed = parseJSONResponse(raw);
      if (Array.isArray(parsed)) {
        const response1 = await axiosInstance.post(
          API_PATHS.QUESTION.ADD_QUESTION_TO_SESSION,
          { sessionId, questions: parsed }
        );
        if (response1.data) {
          toast.success("Tải thêm câu hỏi thành công", { id: loadToastId });
          fetchSessionDetailsById();
        }
      } else {
        throw new Error("Phản hồi AI không phải mảng câu hỏi.");
      }
    } catch (error) {
      console.error("Error uploading more questions:", error);
      toast.error(error.message || "Lỗi khi tải thêm câu hỏi.", {
        id: loadToastId,
      });
    } finally {
      setIsUpdateLoader(false);
    }
  };
  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {};
  }, []);

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-20">
      <div className="px-2 sm:px-4">
        <RoleInfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || ""}
          questions={sessionData?.questions || []}
          description={sessionData?.description || ""}
          lastedUpdated={
            sessionData?.updatedAt ? formatDate(sessionData.updatedAt) : ""
          }
        />
      </div>
      <div className="container mx-auto px-2 sm:px-4 mt-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Câu hỏi phỏng vấn
        </h2>
        <div className="grid grid-cols-12 gap-3 md:gap-4 mt-4 md:mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}>
            <AnimatePresence>
              {sessionData?.questions &&
                sessionData.questions.length > 0 &&
                sessionData.questions.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}>
                    <>
                      <div className="mb-4">
                        <QuestionCard
                          question={data.question}
                          answer={data.answer}
                          onLearnMore={() =>
                            generateConceptExplanation(data.question)
                          }
                          isPinned={data.isPinned}
                          onTogglePin={() => toggleQuestionPinStatus(data._id)}
                        />
                      </div>
                      {!isLoading &&
                        index === sessionData.questions.length - 1 && (
                          <div className="flex items-center justify-center">
                            <button
                              className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 md:px-5 py-2 text-xs md:text-sm font-medium rounded-lg text-nowrap cursor-pointer hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                              disabled={isUpdateLoader || isLoading}
                              onClick={uploadMoreQuestions}>
                              {isUpdateLoader ? (
                                <LoaderCircle
                                  size={16}
                                  className="animate-spin"
                                />
                              ) : (
                                <ListCollapse size={16} />
                              )}{" "}
                              <span>Tải thêm</span>
                            </button>
                          </div>
                        )}
                    </>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div>
        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation?.title}>
          {errorMsg && (
            <p
              className="flex gap-2 text-sm
            text-amber-600 font-medium
            ">
              <CircleAlert className="mt-1" size={14} /> {errorMsg}
            </p>
          )}
          {isLoading && <SkeletonLoader />}

          {!isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default InterviewPrep;
