import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Bookmark, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ProfileDropdown from "./ProfileDropdown";
import NotificationBell from "./NotificationBell";
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
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
  const isActiveRoute = (path) => {
    if (path === "/find-jobs") {
      return (
        location.pathname === "/find-jobs" ||
        location.pathname.startsWith("/jobs/")
      );
    }
    if (path === "/resume-builder") {
      return location.pathname.startsWith("/resume-builder");
    }
    if (path === "/interview-prep") {
      return location.pathname.startsWith("/interview-prep");
    }
    return location.pathname === path;
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to={"/"} className="flex items-center space-x-2 sm:space-x-3">
            <img src={logo} alt="logo" className="h-10 sm:h-12 w-auto" />
            <div className="hidden sm:flex flex-col md:leading-tight">
              <span className="text-primary-500 font-bold text-xs md:text-sm">
                Học viện Công nghệ Bưu chính Viễn thông
              </span>
              <span className="text-secondary-500 font-extrabold text-sm md:text-lg uppercase tracking-wide">
                Cổng thông tin việc làm
              </span>
            </div>
          </Link>
          <nav className="hidden xl:flex items-center space-x-8">
            <a
              onClick={() => navigate("/find-jobs")}
              className={`transition-colors cursor-pointer ${
                isActiveRoute("/find-jobs")
                  ? "text-primary-600 border-primary-600 font-semibold"
                  : "text-secondary-600 hover:text-secondary-900 font-medium "
              }`}
            >
              Tìm việc
            </a>

            <a
              onClick={() =>
                navigate(isAuthenticated ? "/resume-builder" : "/login")
              }
              className={`transition-colors cursor-pointer ${
                isActiveRoute("/resume-builder")
                  ? "text-primary-600 border-primary-600 font-semibold"
                  : "text-secondary-600 hover:text-secondary-900 font-medium  "
              }`}
            >
              Tạo CV
            </a>
            <a
              onClick={() =>
                navigate(isAuthenticated ? "/interview-prep" : "/login")
              }
              className={`transition-colors cursor-pointer ${
                isActiveRoute("/interview-prep")
                  ? "text-primary-600 border-primary-600 font-semibold"
                  : "text-secondary-600 hover:text-secondary-900 font-medium  "
              }`}
            >
              Luyện phỏng vấn
            </a>
            <a
              onClick={() =>
                navigate(isAuthenticated ? "/resume-analyzer" : "/login")
              }
              className={`transition-colors cursor-pointer ${
                isActiveRoute("/resume-analyzer")
                  ? "text-primary-600 border-primary-600 font-semibold"
                  : "text-secondary-600 hover:text-secondary-900 font-medium  "
              }`}
            >
              Đánh giá CV
            </a>
            {(!isAuthenticated ||
              (isAuthenticated && user && user.role === "employer")) && (
              <a
                onClick={() =>
                  navigate(isAuthenticated ? "/employer-dashboard" : "/login")
                }
                className={`transition-colors cursor-pointer ${
                  isActiveRoute("/employer-dashboard")
                    ? "text-primary-600 border-primary-600 font-semibold"
                    : "text-secondary-600 hover:text-secondary-900 font-medium  "
                }`}
              >
                Đăng tin
              </a>
            )}
          </nav>
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user && (
              <>
                <NotificationBell />
                {user.role === "jobseeker" && (
                  <button
                    className={`p-1.5 sm:p-2 rounded-xl transition-colors duration-200 relative cursor-pointer ${
                      location.pathname === "/saved-jobs"
                        ? " text-primary-600"
                        : "hover:bg-gray-100 text-gray-500"
                    }`}
                    onClick={() => navigate("/saved-jobs")}
                  >
                    <Bookmark className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </>
            )}
            {isAuthenticated ? (
              <ProfileDropdown
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
                  className="hidden sm:block text-gray-600 hover:text-gray-900 transition-colors font-medium px-3 md:px-4 py-2 rounded-lg hover:bg-gray-50 duration-200 text-sm"
                >
                  Đăng nhập
                </a>
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium px-3 md:px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 text-xs sm:text-sm"
                >
                  Đăng ký
                </a>
              </>
            )}
            <button
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden border-t border-gray-100 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                <a
                  onClick={() => {
                    navigate("/find-jobs");
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    isActiveRoute("/find-jobs")
                      ? "bg-primary-50 text-primary-600 font-semibold"
                      : "text-secondary-600 hover:bg-gray-50 font-medium"
                  }`}
                >
                  Tìm việc
                </a>
                <a
                  onClick={() => {
                    navigate(isAuthenticated ? "/resume-builder" : "/login");
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    isActiveRoute("/resume-builder")
                      ? "bg-primary-50 text-primary-600 font-semibold"
                      : "text-secondary-600 hover:bg-gray-50 font-medium"
                  }`}
                >
                  Tạo CV
                </a>
                <a
                  onClick={() => {
                    navigate(isAuthenticated ? "/interview-prep" : "/login");
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    isActiveRoute("/interview-prep")
                      ? "bg-primary-50 text-primary-600 font-semibold"
                      : "text-secondary-600 hover:bg-gray-50 font-medium"
                  }`}
                >
                  Luyện phỏng vấn
                </a>
                <a
                  onClick={() => {
                    navigate(isAuthenticated ? "/resume-analyzer" : "/login");
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    isActiveRoute("/resume-analyzer")
                      ? "bg-primary-50 text-primary-600 font-semibold"
                      : "text-secondary-600 hover:bg-gray-50 font-medium"
                  }`}
                >
                  Đánh giá CV
                </a>
                {(!isAuthenticated ||
                  (isAuthenticated && user && user.role === "employer")) && (
                  <a
                    onClick={() => {
                      navigate(
                        isAuthenticated ? "/employer-dashboard" : "/login"
                      );
                      setMobileMenuOpen(false);
                    }}
                    className={`block px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                      isActiveRoute("/employer-dashboard")
                        ? "bg-primary-50 text-primary-600 font-semibold"
                        : "text-secondary-600 hover:bg-gray-50 font-medium"
                    }`}
                  >
                    Đăng tin
                  </a>
                )}
                {!isAuthenticated && (
                  <a
                    href="/login"
                    className="block px-4 py-2 text-center bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Đăng nhập
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
