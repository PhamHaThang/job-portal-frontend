import { Download, X } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { API_PATHS } from "../../utils/apiPaths";
import Avatar from "./Avatar";
import { formatDate } from "../../utils/format";
import StatusBadge from "./StatusBadge";
const statusOptions = [
  {
    value: "Applied",
    label: "Đã ứng tuyển",
  },
  {
    value: "In Review",
    label: "Đang xem xét",
  },
  { value: "Rejected", label: "Từ chối" },
  { value: "Accepted", label: "Chấp nhận" },
];
const ApplicantProfileReview = ({
  seletedApplicant,
  setSelectedApplicant,
  handleDownloadResume,
  handleClose,
}) => {
  const [currentStatus, setCurrentStatus] = useState(seletedApplicant.status);
  const [loading, setLoading] = useState(false);
  const onChangeStatus = async (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        API_PATHS.APPLICATIONS.UPDATE_APPLICATION_STATUS(seletedApplicant._id),
        {
          status: newStatus,
        }
      );
      if (response.status === 200) {
        setSelectedApplicant((prev) => ({
          ...prev,
          status: newStatus,
        }));
        toast.success("Cập nhật trạng thái thành công");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Cập nhật trạng thái thất bại");
      setCurrentStatus(seletedApplicant.status);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Hồ sơ ứng tuyển
          </h3>
          <button
            onClick={() => handleClose()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="text-center mb-6">
            {!seletedApplicant.applicant.avatar ? (
              <img
                src={seletedApplicant.applicant.avatar}
                alt={seletedApplicant.applicant.name}
                className="h-20 w-20 rounded-full mx-auto object-cover"
              />
            ) : (
              <Avatar
                name={seletedApplicant.applicant.name}
                className={`mx-auto`}
                size={80}
              />
            )}
            <h4
              className="mt-4 text-xl font-semibold
             text-gray-900">
              {seletedApplicant.applicant.name}
            </h4>
            <p className="text-gray-600">{seletedApplicant.applicant.email}</p>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">
                Vị trí ứng tuyển
              </h5>
              <p className="text-gray-700">{seletedApplicant.job.title}</p>
              <p className="text-gray-600">
                {seletedApplicant.job.location} -{seletedApplicant.job.type}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Chi tiết</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <StatusBadge status={currentStatus} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày ứng tuyển:</span>
                  <span className="text-gray-900">
                    {formatDate(seletedApplicant.createdAt, "DD/MM/yyyy")}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                handleDownloadResume(seletedApplicant.applicant.resume)
              }
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
              <Download className="h-4 w-4" />
              Tải CV
            </button>
            <div className="mt-4 ">
              <label className="block mb-1 text-sm text-gray-700 font-medium">
                Thay đổi trạng thái
              </label>
              <select
                value={currentStatus}
                onChange={onChangeStatus}
                disabled={loading}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              {loading && (
                <p className="text-xs text-gray-500 mt-1">
                  Đang cập nhật trạng thái...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfileReview;
