import useAuth from "../../hooks/useAuth";
import Navbar from "../ui/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../pages/LandingPage/components/Footer";
const UserLayout = () => {
  const { user } = useAuth();
  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-purple-50 min-h-screen">
      <Navbar />
      {user && (
        <div className="container mx-auto pt-4 pb-8">
          <Outlet />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserLayout;
