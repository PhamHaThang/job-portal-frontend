import { Briefcase } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex justify-center items-center ">
      <div className="text-center">
        <div className=" relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <div className="absolute inset-0 flex justify-center items-center">
            <Briefcase className="h-6 w-6 text-primary-600" />
          </div>
        </div>
        <p className="text-gray-600 font-medium">
          Đang tải dữ liệu, vui lòng chờ...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
