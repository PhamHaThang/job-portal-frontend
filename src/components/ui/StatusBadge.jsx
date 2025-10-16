const StatusBadge = ({ status }) => {
  const statusConfig = {
    Applied: "bg-gray-100 text-gray-800",
    "In Review": "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
    Accepted: "bg-green-100 text-green-800",
  };
  const statusArr = {
    Applied: "Đã ứng tuyển",
    Rejected: "Từ chối",
    Accepted: "Chấp nhận",
    "In Review": "Đang xem xét",
  };
  return (
    <span
      className={`px-3 py-1 rounded text-sm font-medium ${
        statusConfig[status] || "bg-gray-100 text-gray-800"
      }`}>
      {statusArr[status] || status}
    </span>
  );
};

export default StatusBadge;
