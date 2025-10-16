import DashboardLayout from "../../components/layout/DashboardLayout";
import { useState, useEffect, useMemo, use } from "react";
import {
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  Eye,
  ArrowLeft,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import { formatDate } from "../../utils/format";
import StatusBadge from "../../components/ui/StatusBadge";
import ApplicantProfileReview from "../../components/ui/ApplicantProfileReview";

const ApplicationViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jobId = location.state?.jobId || null;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seletedApplicant, setSelectedApplicant] = useState(null);
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_APPLICATIONS_FOR_JOB(jobId)
      );
      if (response.status === 200) {
        setApplications(response.data.applications || []);
      }
    } catch (error) {
      console.log("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!jobId) {
      navigate("/manage-jobs");
    } else {
      fetchApplications();
    }
  }, [jobId, navigate]);
  const groupedApplications = useMemo(() => {
    const filtered = applications.filter((app) => app.job.title.toLowerCase());
    return filtered.reduce((groups, app) => {
      const jobId = app.job._id;
      if (!groups[jobId]) {
        groups[jobId] = {
          job: app.job,
          applications: [],
        };
      }
      groups[jobId].applications.push(app);
      return groups;
    }, {});
  }, [applications]);
  const handleDownloadResume = (url) => {
    window.open(url, "_blank");
  };
  return (
    <DashboardLayout activeMenu="manage-jobs">
      {loading && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <button
                onClick={() => navigate("/manage-jobs")}
                className="group flex items-center space-x-2 px-3 py-2 font-medium text-sm text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-600 border border-gray-200 hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-gray-100 hover:shadow-xl cursor-pointer">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Quay lại</span>
              </button>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Tổng quan hồ sơ ứng tuyển
              </h1>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pb-8">
          {Object.keys(groupedApplications).length == 0 ? (
            <div className="text-center py-16">
              <Users className="mx-auto h-24 w-24 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Chưa có hồ sơ ứng tuyển nào.
              </h3>
              <p className="mt-2 text-gray-500">
                Hiện chưa tìm thấy hồ sơ ứng tuyển nào cho công việc này.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.values(groupedApplications).map(
                ({ job, applications }) => (
                  <div
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                    key={job._id}>
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-semibold text-white">
                            {job.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-4 text-primary-100 mt-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 " />
                              <span className="text-sm">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span className="text-sm"> {job.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{job.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                          <span className="text-sm text-white font-medium">
                            {applications.length} Hồ sơ ứng tuyển
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-4">
                        {applications.map((application) => (
                          <div
                            key={application._id}
                            className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4 ">
                              <div className="flex-shrink-0">
                                {application.applicant.avatar ? (
                                  <img
                                    src={application.applicant.avatar}
                                    alt={application.applicant.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                  />
                                ) : (
                                  <Avatar
                                    name={application.applicant.name}
                                    size={48}
                                  />
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900">
                                  {application.applicant.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {application.applicant.email}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    Ứng tuyển vào{" "}
                                    {formatDate(
                                      application.createdAt,
                                      "DD/MM/yyyy"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 mt-4 md:m-0">
                              <StatusBadge status={application.status} />
                              <button
                                onClick={() =>
                                  handleDownloadResume(
                                    application.applicant.resume
                                  )
                                }
                                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg px-3 py-2 transition-colors cursor-pointer
                                ">
                                <Download className="h-4 w-4" />
                                Tải CV
                              </button>
                              <button
                                onClick={() =>
                                  setSelectedApplicant(application)
                                }
                                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200  text-sm font-medium rounded-lg px-3 py-2 transition-colors cursor-pointer">
                                <Eye className="h-4 w-4" />
                                Xem chi tiết
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        {seletedApplicant && (
          <ApplicantProfileReview
            seletedApplicant={seletedApplicant}
            setSelectedApplicant={setSelectedApplicant}
            handleDownloadResume={handleDownloadResume}
            handleClose={() => {
              setSelectedApplicant(null);
              fetchApplications();
            }}></ApplicantProfileReview>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApplicationViewer;
