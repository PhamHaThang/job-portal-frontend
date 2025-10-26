import { useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  Building,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import StatusBadge from "../../components/ui/StatusBadge";
import Pagination from "../../components/ui/Pagination";
import { formatDate } from "../../utils/format";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const MyApplications = () => {
  useDocumentTitle("Đơn ứng tuyển của tôi");
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_MY_APPLICATIONS
      );
      if (response.status === 200) {
        setApplications(response.data.applications || []);
      }
    } catch (error) {
      console.log("Error fetching applications:", error);
      toast.error("Lỗi khi tải danh sách đơn ứng tuyển");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const filteredApplications =
    filterStatus === "all"
      ? applications
      : applications.filter((app) => app.status === filterStatus);

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    endIndex
  );

  const getStatusCount = (status) => {
    if (status === "all") return applications.length;
    return applications.filter((app) => app.status === status).length;
  };

  const statusFilters = [
    { label: "Tất cả", value: "all", count: applications.length },
    {
      label: "Đã nộp",
      value: "Applied",
      count: getStatusCount("Applied"),
    },
    {
      label: "Đang xem xét",
      value: "In Review",
      count: getStatusCount("In Review"),
    },
    {
      label: "Đã chấp nhận",
      value: "Accepted",
      count: getStatusCount("Accepted"),
    },
    {
      label: "Từ chối",
      value: "Rejected",
      count: getStatusCount("Rejected"),
    },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 pb-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đơn ứng tuyển của tôi
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi tất cả các đơn ứng tuyển của bạn
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filterStatus === filter.value
                  ? "bg-primary-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 cursor-pointer"
              }`}>
              {filter.label}{" "}
              <span className="ml-1 px-2 rounded-full bg-white/20 text-sm">
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Applications List */}
        {paginatedApplications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Briefcase className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filterStatus === "all"
                ? "Chưa có đơn ứng tuyển nào"
                : "Không có đơn ứng tuyển nào với trạng thái này"}
            </h3>
            <p className="text-gray-500 mb-6">
              {filterStatus === "all"
                ? "Bắt đầu tìm kiếm và ứng tuyển các công việc phù hợp"
                : ""}
            </p>
            {filterStatus === "all" && (
              <button
                onClick={() => navigate("/find-jobs")}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg px-6 py-3 transition-colors cursor-pointer">
                <Briefcase className="h-5 w-5" />
                Tìm kiếm việc làm
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedApplications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden cursor-pointer">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {application.job.title}
                        </h3>
                        <StatusBadge status={application.status} />
                      </div>

                      {/* Job Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                        {application.job.company && (
                          <div className="flex items-center gap-1.5">
                            <Building className="h-4 w-4 text-primary-600" />
                            <span className="font-medium text-gray-900">
                              {application.job.company.companyName ||
                                application.job.company.name}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{application.job.location || "Không rõ"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span>{application.job.type}</span>
                        </div>
                        {application.job.category && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {application.job.category}
                          </span>
                        )}
                      </div>

                      {/* Timestamps */}
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            Nộp đơn:{" "}
                            {formatDate(application.createdAt, "DD/MM/YYYY")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            Cập nhật:{" "}
                            {formatDate(application.updatedAt, "DD/MM/YYYY")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                    {application.resume && (
                      <a
                        href={application.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                        <FileText className="h-4 w-4" />
                        Xem CV đã nộp
                      </a>
                    )}
                    <button
                      onClick={() =>
                        navigate(`/jobs/${application.job._id}`, {
                          state: { job: application.job },
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors ml-auto cursor-pointer">
                      <ExternalLink className="h-4 w-4" />
                      Xem chi tiết công việc
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Component */}
        {totalPages > 1 && (
          <>
            <div className="mt-6 text-center text-sm text-gray-600">
              Hiển thị {startIndex + 1}-
              {Math.min(endIndex, filteredApplications.length)} của{" "}
              {filteredApplications.length} đơn ứng tuyển
            </div>
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
