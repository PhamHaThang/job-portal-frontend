import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Bookmark } from "lucide-react";
import ProfileDropDown from "./ProfileDropDown";
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileDropdownOpen]);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/find-jobs" className="flex items-center space-x-3">
            <img src={logo} alt="logo" className="h-12 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="text-primary-500 font-bold text-sm">
                Học viện Công nghệ Bưu chính Viễn thông
              </span>
              <span className="text-secondary-500 font-extrabold text-lg uppercase tracking-wide">
                Cổng thông tin việc làm
              </span>
            </div>
          </Link>
          <div className="flex items-center space-x-3">
            {user && (
              <button
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 relative cursor-pointer"
                onClick={() => navigate("/saved-jobs")}>
                <Bookmark className="h-5 w-5 text-gray-500" />
              </button>
            )}
            {isAuthenticated ? (
              <ProfileDropDown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                userRole={user?.role || ""}
                onLogout={logout}
              />
            ) : (
              <>
                <a
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-50 duration-200">
                  Đăng nhập
                </a>
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:from-primary-700 hover:to-secondary-700 transition-all duration-300">
                  Đăng ký
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
