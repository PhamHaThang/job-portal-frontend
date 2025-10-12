import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";
import { formatName } from "../../../utils/formatName";
import useAuth from "../../../hooks/useAuth";
const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50  bg-white/95 backdrop-blur-sm border-b border-secondary-100">
      <div className="container mx-auto px-4">
        <div className=" flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
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

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              onClick={() => navigate("/find-jobs")}
              className=" text-secondary-600 hover:text-secondary-900 transition-colors font-medium cursor-pointer">
              Tìm việc
            </a>

            <a
              onClick={() =>
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                )
              }
              className="text-secondary-600 hover:text-secondary-900 transition-colors font-medium cursor-pointer">
              Đăng tin
            </a>
          </nav>
          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-secondary-700">
                  Xin chào, {formatName(user?.name)}
                </span>
                <a
                  href={
                    user?.role === "employer"
                      ? "/employer-dashboard"
                      : "/find-jobs"
                  }
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all font-medium duration-300 shadow-sm hover:shadow-md">
                  Dashboard
                </a>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-secondary-600 hover:text-secondary-900 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-secondary-50">
                  Đăng nhập
                </a>
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 transition-all  duration-300 shadow-sm hover:shadow-md">
                  Đăng ký
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
