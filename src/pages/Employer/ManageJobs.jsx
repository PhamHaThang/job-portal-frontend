import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { formatDate } from "../../utils/format";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import LoadingRow from "../../components/ui/LoadingRow";
import { toast } from "react-hot-toast";
const ManageJobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const itemPerPage = 8;

  const [jobs, setJobs] = useState([]);
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    if (sortField) {
      filtered.sort((a, b) => {
        let aField = a[sortField];
        let bField = b[sortField];
        if (sortField === "applicants") {
          aField = Number(aField);
          bField = Number(bField);
        }
        if (sortDirection === "asc") {
          return aField > bField ? 1 : -1;
        } else {
          return aField < bField ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [jobs, searchTerm, statusFilter, sortField, sortDirection]);
  const totalPages = Math.ceil(filteredAndSortedJobs.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const paginatedJobs = filteredAndSortedJobs.slice(
    startIndex,
    startIndex + itemPerPage
  );
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const handleStatusChange = async (jobId) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.JOBS.TOGGLE_CLOSE(jobId)
      );
      if (response.status === 200) {
        toast.success("Cập nhật trạng thái công việc thành công");
        getPostedJobs(true);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data.message);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.JOBS.DELETE_JOB(jobId)
      );
      if (response.status === 200) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        toast.success("Xóa công việc thành công");
        getPostedJobs(true);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data.message);
        toast.error(error.response.data.message || "Xóa công việc thất bại");
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <ChevronUp className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 text-primary-500 " />
    ) : (
      <ChevronDown className="h-4 w-4 text-primary-500" />
    );
  };
  const getPostedJobs = async (disableLoader) => {
    setIsLoading(!disableLoader);
    try {
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_JOBS_EMPLOYER
      );
      if (response.status === 200 && response.data?.jobs?.length > 0) {
        const formattedJobs = response.data?.jobs?.map((job) => ({
          id: job._id,
          title: job.title,
          company: job?.company?.name || "Chưa xác định",
          status: job?.isClosed ? "Closed" : "Active",
          applicants: job?.applicationCount || 0,
          datePosted: formatDate(job.createdAt),
          logo: job?.company?.companyLogo,
        }));
        setJobs(formattedJobs);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data.message);
      } else {
        console.error("Error message:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPostedJobs();
  }, []);
  return (
    <DashboardLayout activeMenu="manage-jobs">
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Quản lý việc làm
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Quản lý việc làm của bạn và theo dõi ứng viên
                </p>
              </div>
              <button
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                onClick={() => navigate("/post-job")}>
                <Plus className="w-5 h-5 mr-2" />
                Thêm mới
              </button>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/5 border border-white/20 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm công việc..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg  focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-0 transition-all duration-200 bg-gray-50/50 placeholder-gray-400 "
                />
              </div>
              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500  transition-all duration-200 cursor-pointer outline-0">
                  <option value="All">Tất cả</option>
                  <option value="Active">Mở</option>
                  <option value="Closed">Đóng</option>
                </select>
              </div>
            </div>

            <div className="my-4">
              <p className="text-sm text-gray-600">
                Hiển thị {paginatedJobs.length} trong{" "}
                {filteredAndSortedJobs.length} công việc
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              {filteredAndSortedJobs.length === 0 && !isLoading ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-gray-100 mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không tìm thấy công việc nào
                  </h3>
                  <p className="text-gray-500">
                    Thử điều chỉnh tiêu chí tìm kiếm hoặc bộ lọc
                  </p>
                </div>
              ) : (
                <div className="w-[75vw] md:w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                      <tr>
                        <th
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-200 min-w-[200px] sm:min-w-0
                      "
                          onClick={() => handleSort("title")}>
                          <div className="flex items-center space-x-1">
                            <span>Tiêu đề</span>
                            <SortIcon field="title" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-200 min-w-[120px] sm:min-w-0"
                          onClick={() => handleSort("status")}>
                          <div className="flex items-center space-x-1">
                            <span>Trạng thái</span>
                            <SortIcon field="status" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-200 min-w-[130px] sm:min-w-0"
                          onClick={() => handleSort("applicants")}>
                          <div className="flex items-center space-x-1">
                            <span>Ứng viên</span>
                            <SortIcon field="applicants" />
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-200 min-w-[180px] sm:min-w-0">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {isLoading
                        ? Array(5)
                            .fill(0)
                            .map((_, idx) => <LoadingRow key={idx} />)
                        : paginatedJobs.map((job) => (
                            <tr
                              key={job.id}
                              className="hover:bg-primary-50/30 transition-all duration-200 border-b border-gray-100/60">
                              <td className="px-6 py-4 whitespace-nowrap min-w-[200px] sm:min-w-0">
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {job.title}
                                  </div>
                                  <div className="text-xs text-gray-500 font-medium">
                                    {job.company}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap min-w-[120px] sm:min-w-0">
                                <span
                                  className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${
                                    job.status === "Active"
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                      : "bg-red-100 text-red-700 border border-red-200"
                                  }`}>
                                  {job.status === "Active"
                                    ? "Đang mở"
                                    : "Đang đóng"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap min-w-[130px] sm:min-w-0">
                                <button
                                  className="flex items-center text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 hover:bg-blue-50 px-2 py-1 rounded-lg cursor-pointer"
                                  onClick={() =>
                                    navigate("/applicants", {
                                      state: { jobId: job.id },
                                    })
                                  }>
                                  <Users className="w-4 h-4 mr-1.5" />
                                  {job.applicants}
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap min-w-[180px] sm:min-w-0 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button
                                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:bg-blue-50 p-2 rounded-lg cursor-pointer"
                                    onClick={() =>
                                      navigate("/post-job", {
                                        state: { jobId: job.id },
                                      })
                                    }>
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  {job.status === "Active" ? (
                                    <button
                                      className="flex items-center gap-2 text-xs text-orange-600 hover:text-orange-800 transition-colors duration-200 hover:bg-orange-50 p-2 rounded-lg cursor-pointer"
                                      onClick={() =>
                                        handleStatusChange(job.id)
                                      }>
                                      <X className="w-4 h-4" />
                                      <span className="hidden sm:inline">
                                        Đóng
                                      </span>
                                    </button>
                                  ) : (
                                    <button
                                      className="flex items-center gap-2 text-xs text-green-600 hover:text-green-800 transition-colors duration-200 hover:bg-green-50 p-2 rounded-lg cursor-pointer"
                                      onClick={() =>
                                        handleStatusChange(job.id)
                                      }>
                                      <Plus className=" w-4 h-4" />
                                      <span className="hidden sm:inline">
                                        Mở
                                      </span>
                                    </button>
                                  )}
                                  <button
                                    className="text-red-600 hover:text-red-800 transition-colors duration-200 hover:bg-red-50 p-2 rounded-lg cursor-pointer"
                                    onClick={() => handleDeleteJob(job.id)}>
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    Trước
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    Sau
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Hiển thị{" "}
                      <span className="font-medium">{startIndex + 1}</span> -{" "}
                      <span className="font-medium">
                        {Math.min(
                          startIndex + itemPerPage,
                          filteredAndSortedJobs.length
                        )}
                      </span>{" "}
                      trong{" "}
                      <span className="font-medium">
                        {filteredAndSortedJobs.length}
                      </span>{" "}
                      kết quả
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center p-2 border text-sm font-medium rounded-l-md  text-gray-500 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        Trước
                      </button>
                      {Array.from(
                        { length: totalPages },
                        (_, idx) => idx + 1
                      ).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}>
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={
                          currentPage === totalPages || totalPages === 0
                        }
                        className="relative inline-flex items-center p-2 border text-sm font-medium rounded-r-md  text-gray-500 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        Sau
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageJobs;
