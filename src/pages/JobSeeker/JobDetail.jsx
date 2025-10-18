import {
  MapPin,
  DollarSign,
  Building2,
  Clock,
  Users,
  ArrowLeft,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import Navbar from "../../components/ui/Navbar";
import StatusBadge from "../../components/ui/StatusBadge";
import toast from "react-hot-toast";
import { formatCurrency, formatDate } from "../../utils/format";
const JobDetail = () => {
  const { jobId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const getJobDetailsById = async () => {
    try {
      setLoading(true);
      const params = user ? { userId: user._id } : {};
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_JOB_BY_ID(jobId),
        { params }
      );
      if (response.status === 200) {
        setJobDetails(response.data.job);
        console.log(response.data.job);
      }
    } catch (error) {
      console.log("Failed to fetch job details:", error);
      toast.error(
        error?.response?.data?.message || "Lỗi khi tải chi tiết công việc"
      );
    } finally {
      setLoading(false);
    }
  };
  const applyToJob = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      if (jobId) {
        const response = await axiosInstance.post(
          API_PATHS.APPLICATIONS.APPLY_JOB(jobId)
        );
        if (response.status === 201) {
          toast.success("Ứng tuyển công việc thành công.");
        }
      }
      getJobDetailsById();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Lỗi khi ứng tuyển công việc. Vui lòng thử lại."
      );
    }
  };
  useEffect(() => {
    if (jobId && !loading) {
      getJobDetailsById();
    }
  }, [jobId, user, loading]);
  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto pt-24">
        {jobDetails && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="relative px-0 pb-8 border-b border-gray-100">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  {jobDetails?.company?.companyLogo ? (
                    <img
                      src={jobDetails?.company?.companyLogo}
                      alt={jobDetails?.company?.companyName}
                      className="h-20 w-20 object-cover rounded-2xl border-4 border-white/20 shadow-lg"
                    />
                  ) : (
                    <div className="h-20 w-20 flex items-center justify-center bg-gray-100 rounded-2xl border-2 border-gray-200 shadow-lg">
                      <Building2 className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h1 className="text-lg lg:text-xl font-semibold mb-2 leading-tight text-gray-900">
                      {jobDetails?.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {jobDetails?.location || "Địa điểm không xác định"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {jobDetails?.applicationStatus ? (
                    <StatusBadge status={jobDetails?.applicationStatus} />
                  ) : (
                    <button
                      className="bg-gradient-to-r from-primary-50 to-primary-50 hover:from-primary-500 hover:to-primary-600 hover:text-white text-sm text-primary-700 px-6 py-2.5 rounded-xl shadow-md transition-all duration-200 font-semibold transform hover:-translate-y-0.5 cursor-pointer"
                      onClick={applyToJob}>
                      Ứng tuyển
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full border border-blue-200">
                    {jobDetails?.category || "Chưa xác định"}
                  </span>
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 font-semibold rounded-full border border-purple-200">
                    {jobDetails?.type || "Chưa xác định"}
                  </span>
                  <div className="flex items-center space-x-1 px-4 py-2 bg-gray-50 text-gray-700 font-semibold text-sm rounded-full border border-gray-200">
                    <Clock className="h-4 w-4" />
                    <span>
                      {jobDetails?.createdAt
                        ? formatDate(jobDetails?.createdAt)
                        : "Chưa xác định"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-0 pb-8 space-y-8">
              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 ">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10 ">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          Lương cơ bản
                        </h3>
                        <div className="text-lg font-black text-gray-900">
                          {formatCurrency(jobDetails?.salaryMin)} -{" "}
                          {formatCurrency(jobDetails?.salaryMax)}
                          <span className="text-lg text-gray-600 font-normal ml-1">
                            mỗi tháng
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      <Users className="h-4 w-4" />
                      <span>Thỏa thuận</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <span className="text-lg">Mô tả công việc</span>
                </h3>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {jobDetails?.description}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                  <span className="text-lg">Yêu cầu công việc</span>
                </h3>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-50 rounded-xl p-6">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {jobDetails?.requirements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
