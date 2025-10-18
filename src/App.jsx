import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import { Navigate } from "react-router-dom";
import JobSeekerDashboard from "./pages/JobSeeker/JobSeekerDashboard";
import JobDetail from "./pages/JobSeeker/JobDetail";
import SavedJobs from "./pages/JobSeeker/SavedJobs";
import UserProfile from "./pages/JobSeeker/UserProfile";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import JobPostingForm from "./pages/Employer/JobPostingForm";
import ManageJobs from "./pages/Employer/ManageJobs";
import ApplicationViewer from "./pages/Employer/ApplicationViewer";
import EmployerProfile from "./pages/Employer/EmployerProfile";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import EmployerChangePassword from "./pages/Employer/EmployerChangePassword";
import UserChangePassword from "./pages/JobSeeker/UserChangePassword";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="/find-jobs" element={<JobSeekerDashboard />} />
          <Route element={<ProtectedRoute requireRole="jobseeker" />}>
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/change-password" element={<UserChangePassword />} />
          </Route>

          <Route element={<ProtectedRoute requireRole="employer" />}>
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/post-job" element={<JobPostingForm />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/applicants" element={<ApplicationViewer />} />
            <Route path="/company-profile" element={<EmployerProfile />} />
            <Route
              path="/company-change-password"
              element={<EmployerChangePassword />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
};

export default App;
