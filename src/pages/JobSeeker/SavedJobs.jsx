import { ArrowLeft, Bookmark, Grid, List, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useState, useEffect } from "react";
import JobCard from "../../components/ui/JobCard";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
const SavedJobs = () => {
  useDocumentTitle("Công việc đã lưu");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedJobList, setSavedJobList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const getSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_SAVED_JOBS);
      if (response.status === 200) {
        setSavedJobList(response.data.savedJobs);
      }
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      toast.error("Lỗi khi tải công việc đã lưu.");
    } finally {
      setLoading(false);
    }
  };
  const handleUnsaveJob = async (jobId) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.JOBS.UNSAVE_JOB(jobId)
      );
      if (response.status === 200) {
        toast.success("Đã bỏ lưu công việc.");
        getSavedJobs();
      }
    } catch (error) {
      console.error("Error unsaving job:", error);
      toast.error("Lỗi khi bỏ lưu công việc.");
    }
  };
  useEffect(() => {
    if (user) {
      getSavedJobs();
    }
  }, [user]);
  return (
    <div className="pt-20 md:pt-24 px-2 sm:px-4 pb-8">
      {loading && <LoadingSpinner />}
      {savedJobList && (
        <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center space-x-2 px-3 md:px-3.5 py-2 md:py-2.5 text-xs md:text-sm rounded-lg md:rounded-xl font-medium text-gray-600 bg-white/50 hover:text-white hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-600 border border-gray-200 hover:border-transparent shadow-lg transition-all shadow-gray-100 hover:shadow-xl
                  transform hover:-translate-y-0.5 cursor-pointer flex-shrink-0">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <h1 className="text-base md:text-lg lg:text-xl font-semibold leading-tight text-gray-900 truncate">
                Công việc đã lưu ({savedJobList.length})
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4 w-full sm:w-auto justify-end">
              <div className="flex items-center border border-gray-200 rounded-lg md:rounded-xl p-0.5 md:p-1 shadow-sm bg-white">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 md:p-2 rounded-md md:rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-primary-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}>
                  <Grid className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 md:p-2 rounded-md md:rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-primary-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}>
                  <List className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="px-0 pb-4 md:pb-8 space-y-4 md:space-y-8">
            {savedJobList.length === 0 ? (
              <div className="text-center py-12 md:py-16 lg:py-20 bg-white/60 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/20 px-4">
                <div className="text-gray-300 mb-4 md:mb-6">
                  <Bookmark className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                  Chưa có công việc nào được lưu.
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 max-w-md mx-auto">
                  Hãy bắt đầu tìm kiếm và lưu những công việc bạn quan tâm để
                  xem lại sau.
                </p>
                <button
                  onClick={() => navigate(`/find-jobs`)}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl text-sm md:text-base shadow-sm transition-colors cursor-pointer">
                  Tìm kiếm
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-4 lg:gap-6"
                    : "space-y-3 md:space-y-4 lg:space-y-6"
                }>
                {savedJobList.map((savedJob) => (
                  <JobCard
                    key={savedJob._id}
                    job={savedJob?.job}
                    onClick={() => navigate(`/jobs/${savedJob?.job._id}`)}
                    onToggleSave={() => handleUnsaveJob(savedJob?.job._id)}
                    saved
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
