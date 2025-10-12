import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import StatCard from "../../components/ui/StatCard";
import { Briefcase, Building2, CheckCircle2, Plus, Users } from "lucide-react";
import { Card } from "../../components/ui/Card";
import JobDashboardCard from "../../components/ui/JobDashboardCard";
import { timeFromNow } from "../../utils/date";
import ApplicantDashboardCard from "../../components/ui/ApplicantDashboardCard";
import { QUICK_ACTIONS } from "../../utils/data";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getDashboardOverview = async () => {
    try {
      setIsLoading(true);
      const response = await axiosIntance.get(API_PATHS.DASHBOARD.OVERVIEW);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDashboardOverview();
  }, []);
  return (
    <DashboardLayout activeMenu="employer-dashboard">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-7xl mx-auto space-y-8 mb-96">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <StatCard
              title="Tổng việc làm"
              value={dashboardData?.counts?.totalActiveJobs || 0}
              icon={Briefcase}
              trend={true}
              trendValue={`${dashboardData?.counts?.trend?.activeJobs || 0}%`}
              color="sky"
            />
            <StatCard
              title="Tổng ứng viên"
              value={dashboardData?.counts?.totalApplications || 0}
              icon={Users}
              trend={true}
              trendValue={`${
                dashboardData?.counts?.trend?.totalApplicants || 0
              }%`}
              color="green"
            />
            <StatCard
              title="Tổng tuyển dụng"
              value={dashboardData?.counts?.totalHired || 0}
              icon={CheckCircle2}
              trend={true}
              trendValue={`${dashboardData?.counts?.trend?.totlaHired || 0}%`}
              color="purple"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card
              title="Việc làm đăng gần đây"
              subtitle="Các việc làm bạn đã đăng gần đây"
              headerAction={
                <button
                  className="text-sm text-primary-500 hover:text-primary-600 font-medium cursor-pointer"
                  onClick={() => navigate("/manage-jobs")}>
                  Xem tất cả
                </button>
              }>
              <div className="space-y-3">
                {dashboardData?.counts?.data?.recentJobs
                  ?.slice(0, 3)
                  ?.map((job, index) => (
                    <JobDashboardCard key={index} job={job} />
                  ))}
              </div>
            </Card>
            <Card
              title="Ứng tuyển gần đây"
              subtitle="Các ứng viên đã ứng tuyển gần đây"
              headerAction={
                <button
                  className="text-sm text-primary-500 hover:text-primary-600 font-medium cursor-pointer"
                  onClick={() => navigate("/manage-jobs")}>
                  Xem tất cả
                </button>
              }>
              <div className="space-y-3">
                {dashboardData?.counts?.data?.recentApplications
                  ?.slice(0, 3)
                  ?.map((data, index) => (
                    <ApplicantDashboardCard
                      key={index}
                      applicant={data?.applicant || ""}
                      position={data?.job.title || ""}
                      time={timeFromNow(data?.updatedAt)}
                    />
                  ))}
              </div>
            </Card>
          </div>
          <Card
            title="Hành động nhanh"
            subtitle="Thực hiện các hành động nhanh">
            <div
              className="grid grid-cols-1 
              sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {QUICK_ACTIONS.map((action, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-xl border border-gray-100 hover:shadow-sm hover:border-gray-200 transition-all duration-200
                    text-left cursor-pointer "
                  onClick={() => navigate(action.path)}>
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerDashboard;
