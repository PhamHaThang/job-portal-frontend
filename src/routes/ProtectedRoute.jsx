import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (requiredRole && user?.role !== requiredRole) {
    const redirectPath =
      user?.role === "employer" ? "/employer-dashboard" : "/find-jobs";

    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
