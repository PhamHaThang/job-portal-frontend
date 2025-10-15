import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.png";
import { NAVIGATION_MENU } from "../../utils/data";
import { NavigationItem } from "../ui/NavigationItem";
import { formatName } from "../../utils/format";
import ProfileDropdown from "../ui/ProfileDropdown";
const DashboardLayout = ({ activeMenu, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(activeMenu || "dashboard");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);
  const handleNavigate = (itemId) => {
    setActiveNavItem(itemId);
    navigate(`/${itemId}`);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const sidebarCollapsed = !isMobile && false;
  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }  ${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-white border-r border-gray-200`}>
        <div className="flex items-center h-16 border-b border-gray-200 pl-6">
          {!sidebarCollapsed ? (
            <Link className="flex items-center space-x-3" to="/">
              <img src={logo} alt="logo" className="h-12 w-auto" />
              <div className="flex flex-col leading-tight">
                <span className="text-secondary-500 font-extrabold text-md uppercase tracking-wide">
                  Cổng thông tin việc làm
                  <span className="text-primary-500  "> PTIT</span>
                </span>
              </div>
            </Link>
          ) : (
            <img src={logo} alt="logo" className="h-12 w-auto" />
          )}
        </div>
        <nav className="p-4 space-y-2">
          {NAVIGATION_MENU.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={activeNavItem === item.id}
              onClick={handleNavigate}
              isCollapsed={sidebarCollapsed}
            />
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 cur ">
          <button
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50
            hover:text-gray-900 transition-all duration-200"
            onClick={logout}>
            <LogOut className="h-5 w-5 flex-shrink-0 text-gray-500" />
            {!sidebarCollapsed && <span className="ml-3">Đăng xuất</span>}
          </button>
        </div>
      </div>
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        }`}>
        <header
          className="bg-white/80 backdrop-blur-sm border-b border-gray-200 h-16 flex items-center justify-between px-6
        sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                {sidebarOpen ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-600" />
                )}
              </button>
            )}
            <div>
              <p className="text-sm text-gray-500 text-gray-900">
                Chào mừng quay trở lại!
              </p>
              <h1 className=" text-base font-semibold text-gray-900hidden sm:block">
                {formatName(user.name)}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ProfileDropdown
              isOpen={profileDropdownOpen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdownOpen(!profileDropdownOpen);
              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              email={user?.email || ""}
              onLogout={logout}
              userRole={user?.role || ""}
            />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
