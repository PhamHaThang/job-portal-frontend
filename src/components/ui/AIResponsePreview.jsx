import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertCircle, Check, Copy } from "lucide-react";

const CodeBlock = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "text";
  const codeSnippet = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="relative mt-4 overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
      <div className="flex items-center justify-between bg-gray-950 px-4 py-2 text-xs uppercase tracking-wide text-gray-300">
        <span>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[11px] font-medium text-gray-200 transition hover:bg-white/10 cursor-pointer">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied && <span className="ml-2">Đã sao chép</span>}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-sm leading-6 text-gray-100">
        <code>{codeSnippet}</code>
      </pre>
    </div>
  );
};

const Paragraph = ({ children }) => (
  <div className="mb-4 leading-6 text-gray-700 last:mb-0">{children}</div>
);

const Blockquote = ({ children }) => (
  <blockquote className="my-4 border-l-4 border-primary-300 bg-primary-50/60 px-4 py-2 text-sm italic text-gray-700">
    {children}
  </blockquote>
);

const List = ({ ordered, children }) => {
  const Component = ordered ? "ol" : "ul";
  return (
    <Component
      className={`my-3 ml-6 space-y-2 text-sm text-gray-700 ${
        ordered ? "list-decimal" : "list-disc"
      }`}>
      {children}
    </Component>
  );
};

const Table = ({ children }) => (
  <div className="my-4 w-full overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-300 border border-gray-200 text-sm text-left text-gray-700">
      {children}
    </table>
  </div>
);

const TableCell = ({ isHeader, children }) => {
  const Component = isHeader ? "th" : "td";
  return (
    <Component
      className={`px-4 py-2 ${
        isHeader
          ? "bg-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-600"
          : "bg-white text-sm text-gray-700"
      }`}>
      {children}
    </Component>
  );
};

const AIResponsePreview = ({ content }) => {
  const markdownComponents = useMemo(
    () => ({
      p: Paragraph,
      ol: (props) => <List ordered {...props} />,
      ul: (props) => <List ordered={false} {...props} />,
      blockquote: Blockquote,
      table: Table,
      thead: ({ children }) => (
        <thead className="bg-gray-100">{children}</thead>
      ),
      tbody: ({ children }) => <tbody>{children}</tbody>,
      th: (props) => <TableCell isHeader {...props} />,
      td: (props) => <TableCell {...props} />,
      code: ({ inline, className, children }) => {
        const text = String(children).trim();

        if (inline || !className) {
          if (text === "http") {
            return text;
          }
          return (
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px] font-medium text-gray-800">
              {children}
            </code>
          );
        }

        return <CodeBlock className={className}>{children}</CodeBlock>;
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
      <div className="flex items-center gap-2 rounded-xl border border-dashed border-primary-200 bg-primary-50/60 px-4 py-3 text-sm text-primary-600">
        <AlertCircle size={16} />
        <span>AI chưa có phản hồi. Vui lòng tạo nội dung trước.</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponsePreview;
