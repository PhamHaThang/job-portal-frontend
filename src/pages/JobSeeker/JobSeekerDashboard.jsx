import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, X } from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import FilterContent from "../../components/ui/FilterContent";
import SearchHeader from "../../components/ui/SearchHeader";
import JobCard from "../../components/ui/JobCard";
import UserLayout from "../../components/layout/UserLayout";
const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    type: "",
    minSalary: "",
    maxSalary: "",
  });
  const [expanededSections, setExpandedSections] = useState({
    categories: true,
    jobType: true,
    salary: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchJobs = async (filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filterParams.keyword) params.append("keyword", filterParams.keyword);
      if (filterParams.location)
        params.append("location", filterParams.location);
      if (filterParams.category)
        params.append("category", filterParams.category);
      if (filterParams.type) params.append("type", filterParams.type);
      if (filterParams.minSalary)
        params.append("minSalary", filterParams.minSalary);
      if (filterParams.maxSalary)
        params.append("maxSalary", filterParams.maxSalary);
      if (user) params.append("userId", user?._id);

      const response = await axiosInstance.get(
        `${API_PATHS.JOBS.GET_ALL_JOBS}?${params.toString()}`
      );
      if (response.status === 200) {
        console.log(response.data);
        const jobsData = Array.isArray(response.data)
          ? response.data
          : response.data.jobs || [];
        setJobs(jobsData);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Lỗi khi tải danh sách công việc. Vui lòng thử lại."
      );
      setJobs([]);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const apiFilter = {
        keyword: filters.keyword,
        location: filters.location,
        category: filters.category,
        type: filters.type,
        minSalary: filters.minSalary,
        maxSalary: filters.maxSalary,
      };
      const hasFilters = Object.values(apiFilter).some(
        (value) =>
          value !== "" &&
          value != null &&
          value !== undefined &&
          value !== false
      );
      if (hasFilters) {
        fetchJobs(apiFilter);
      } else {
        fetchJobs();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [filters, user]);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      category: "",
      type: "",
      minSalary: "",
      maxSalary: "",
    });
  };
  const MobileFilterOverlay = () => (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        showMobileFilter ? "" : "hidden"
      }`}>
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setShowMobileFilter(false)}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">Bộ lọc</h3>
          <button
            onClick={clearAllFilters}
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm cursor-pointer hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors  ">
            Xóa tất cả
          </button>
        </div>
        <div className="p-6 h-full overflow-y-auto pb-20">
          <FilterContent
            toggleSection={toggleSection}
            expandedSections={expanededSections}
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
  const toggleSaveJob = async (jobId, isSaved) => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      if (isSaved) {
        const response = await axiosInstance.delete(
          API_PATHS.JOBS.UNSAVE_JOB(jobId)
        );
        if (response.status === 200) {
          toast.success("Đã bỏ lưu công việc.");
        }
      } else {
        const response = await axiosInstance.post(
          API_PATHS.JOBS.SAVE_JOB(jobId)
        );
        if (response.status === 201) {
          toast.success("Đã lưu công việc.");
        }
      }
      await fetchJobs();
    } catch (error) {
      console.error(error);
      if (isSaved) {
        toast.error(
          error.response?.data?.message ||
            "Lỗi khi bỏ lưu công việc. Vui lòng thử lại."
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Lỗi khi lưu công việc. Vui lòng thử lại."
        );
      }
    }
  };
  const applyToJob = async (jobId) => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      if (jobId) {
        const response = await axiosInstance.post(
          API_PATHS.APPLICATIONS.APPLY_JOB(jobId)
        );
        console.log(response.data);
        if (response.status === 201) {
          toast.success("Ứng tuyển công việc thành công.");
        }
      }
      await fetchJobs();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Lỗi khi ứng tuyển công việc. Vui lòng thử lại."
      );
    }
  };
  if (jobs.length === 0 && loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <SearchHeader
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
        <div className="flex gap-6 lg:gap-8">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6 ">
                <h3 className="font-bold text-gray-900 text-xl ">Bộ lọc</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-primary-600 hover:text-primary-700 font-semibold text-sm cursor-pointer hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors  ">
                  Xóa tất cả
                </button>
              </div>
              <FilterContent
                toggleSection={toggleSection}
                expandedSections={expanededSections}
                filters={filters}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 gap-4">
              <div>
                <p className="text-gray-600 text-sm lg:text-base">
                  Hiển thị{" "}
                  <span className="font-bold text-gray-900">{jobs.length}</span>{" "}
                  công việc
                </p>
              </div>
              <div className="flex items-center justify-between lg:justify-end gap-4">
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm">
                  <Filter className="w-4 h-4" />
                  Lọc
                </button>
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="flex items-center border border-gray-200 rounded-xl p-1 shadow-sm bg-white ">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        viewMode === "grid"
                          ? "bg-primary-600 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}>
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        viewMode === "list"
                          ? "bg-primary-600 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}>
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {jobs.length === 0 && !loading ? (
              <div className="text-center py-16 lg:py-20 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 ">
                <div className="text-gray-400 mb-6">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                  Không tìm thấy công việc phù hợp.
                </h3>
                <p className="text-gray-600 mb-6">
                  Thử điều chỉnh hoặc xóa bộ lọc để tìm kiếm nhiều công việc
                  hơn.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm transition-colors cursor-pointer">
                  Xóa tất cả bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6"
                      : "space-y-4 lg:space-y-6"
                  }>
                  {paginatedJobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      onToggleSave={() => toggleSaveJob(job._id, job.isSaved)}
                      onApply={() => applyToJob(job._id)}
                    />
                  ))}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        Trước
                      </button>
                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={
                          currentPage === totalPages || totalPages === 0
                        }
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        Sau
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Hiển thị{" "}
                          <span className="font-medium">{startIndex + 1}</span>{" "}
                          -{" "}
                          <span className="font-medium">
                            {Math.min(startIndex + itemsPerPage, jobs.length)}
                          </span>{" "}
                          trong{" "}
                          <span className="font-medium">{jobs.length}</span> kết
                          quả
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() =>
                              setCurrentPage(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center p-2 border text-sm font-medium rounded-l-md  text-gray-500 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                            Trước
                          </button>
                          {Array.from(
                            { length: totalPages },
                            (_, idx) => idx + 1
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer ${
                                page === currentPage
                                  ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              }`}>
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() =>
                              setCurrentPage(
                                Math.min(totalPages, currentPage + 1)
                              )
                            }
                            disabled={
                              currentPage === totalPages || totalPages === 0
                            }
                            className="relative inline-flex items-center p-2 border text-sm font-medium rounded-r-md  text-gray-500 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                            Sau
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <MobileFilterOverlay />
    </div>
  );
};

export default JobSeekerDashboard;
