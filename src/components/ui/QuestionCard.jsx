import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Pin, PinOff, Sparkles } from "lucide-react";
import AIResponsePreview from "./AIResponsePreview";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const QuestionMarkdown = ({ content }) => {
  const components = useMemo(
    () => ({
      p: ({ children }) => (
        <div className="text-base font-semibold leading-6 text-gray-900 whitespace-pre-wrap">
          {children}
        </div>
      ),
      ol: ({ children }) => (
        <ol className="ml-5 list-decimal space-y-1 text-sm font-medium text-gray-700">
          {children}
        </ol>
      ),
      ul: ({ children }) => (
        <ul className="ml-5 list-disc space-y-1 text-sm font-medium text-gray-700">
          {children}
        </ul>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-2 border-l-4 border-primary-200 bg-primary-50/60 px-3 py-1.5 text-sm italic text-gray-700">
          {children}
        </blockquote>
      ),
      code: ({ inline, className, children }) => {
        const text = String(children).trim();
        if (inline || !className) {
          if (text === "http") return text;
          return (
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px] font-medium text-gray-800">
              {children}
            </code>
          );
        }
        return (
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
            <pre className="overflow-x-auto px-4 py-3 text-sm text-gray-100">
              <code>{text}</code>
            </pre>
          </div>
        );
      },
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-700">{children}</em>
      ),
    }),
    []
  );

  if (!content?.trim()) {
    return (
      <div className="text-base font-semibold leading-6 text-gray-400">
        Câu hỏi chưa được cung cấp.
      </div>
    );
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
};
const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const handleToggleExpand = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 16);
    } else {
      setHeight(0);
    }
  }, [isExpanded, answer]);

  return (
    <article
      className={`rounded-xl border border-primary-100 bg-white shadow-sm transition-shadow duration-200  hover:shadow-md ${
        isPinned ? "ring-2 ring-primary-200" : ""
      }`}>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-gray-900 leading-6">
            <QuestionMarkdown content={question} />
          </h3>
          <button
            type="button"
            onClick={onTogglePin}
            className="inline-flex items-center gap-1 rounded-full border border-primary-200 px-3 py-1 text-xs font-medium text-primary-600 hover:bg-primary-100 cursor-pointer transition-colors">
            {isPinned ? (
              <>
                <Pin size={14} />
              </>
            ) : (
              <>
                <PinOff size={14} />
              </>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onLearnMore}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 cursor-pointer ">
            <Sparkles size={14} />
            Xem thêm
          </button>
          <button
            type="button"
            onClick={handleToggleExpand}
            className={`inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition-colors cursor-pointer ${
              isExpanded
                ? "bg-primary-50 text-primary-600"
                : "hover:bg-gray-100"
            }`}>
            {isExpanded ? "Thu gọn" : "Xem câu trả lời"}
            <ChevronDown
              size={16}
              className={`transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className="px-5 transition-all duration-300 ease-out"
        style={{ maxHeight: height, overflow: "hidden" }}>
        <div ref={contentRef} className="pb-5 text-sm text-gray-700 leading-6">
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </article>
  );
};

export default QuestionCard;
