import { Calendar, Clock, Trash2 } from "lucide-react";

const SummaryCard = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  const initials = role
    ? role
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("")
    : "AI";

  const questionsCount = Array.isArray(questions)
    ? questions.length
    : Number(questions || 0);
  return (
    <div className="bg-white border border-primary-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div
        className="flex-1 p-5 cursor-pointer"
        onClick={onSelect}
        role="button"
        tabIndex={0}>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary-100 bg-primary-50 text-base font-semibold text-primary-700 shadow-inner">
            {initials}
          </div>
          <div className="flex-1 ">
            <h3 className="text-lg font-semibold text-primary-700 line-clamp-1">
              {role || "Chưa xác định vị trí"}
            </h3>
            <p className="text-xs font-medium text-gray-600 line-clamp-1">
              {topicsToFocus || "Chưa có chủ đề trọng tâm"}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 my-3 line-clamp-2">
          {description || "Chưa có mô tả cho buổi luyện tập."}
        </p>
        <div className="space-y-2 text-sm">
          <div className="text-gray-700">
            <span className="font-medium text-primary-600">Kinh nghiệm:</span>{" "}
            {experience || "Không có"}
          </div>
          <div className="text-gray-700">
            <span className="font-medium text-primary-600">Chủ đề:</span>{" "}
            {topicsToFocus || "Không có"}
          </div>
          <div className="text-gray-700">
            <span className="font-medium text-primary-600">Số câu hỏi:</span>{" "}
            {questionsCount}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-100 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={16} />
          <span>Cập nhật: {lastUpdated || "Chưa rõ"}</span>
        </div>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600
                cursor-pointer transition-colors duration-200
          "
          type="button">
          <Trash2 size={16} />
          Xóa
        </button>
      </div>
    </div>
  );
};

export default SummaryCard;
