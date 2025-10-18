import { useNavigate } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { ChevronDown } from "lucide-react";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
  userRole,
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="h-9 w-9 object-cover rounded-full"
          />
        ) : (
          <Avatar name={companyName} size={36} />
        )}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-900">{companyName}</p>
          <p className="text-xs text-gray-500">
            {userRole === "employer" ? "Nhà tuyển dụng" : "Người tìm việc"}
          </p>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100 ">
            <p className="text-sm font-medium text-gray-900">{companyName}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
          <a
            onClick={() =>
              navigate(
                userRole === "jobseeker" ? "/profile" : "/company-profile"
              )
            }
            className="block px-4 py-2 mt-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            Hồ sơ của tôi
          </a>
          <a
            onClick={() =>
              navigate(
                userRole === "jobseeker"
                  ? "/change-password"
                  : "/company-change-password"
              )
            }
            className="block px-4 py-2 mt-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            Đổi mật khẩu
          </a>
          <div className="border-t border-gray-100 mt-2 pt-2">
            <a
              href="#"
              onClick={onLogout}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-200">
              Đăng xuất
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
