import { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
} from "lucide-react";
import { validateEmail, validatePassword } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
const Login = () => {
  useDocumentTitle("Đăng nhập");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: null },
      }));
    }
    setFormState((prev) => ({
      ...prev,
      errors: { ...prev.errors, submit: null },
    }));
  };
  const validateForm = () => {
    const errors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });
    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormState((prev) => ({ ...prev, loading: true, errors: {} }));
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
      });
      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
      }));
      const { token, user } = response.data;
      if (!token || !user) {
        throw new Error("Lỗi phản hồi từ server. Vui lòng thử lại.");
      }
      login(user, token);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const redirectPath =
        user.role === "employer"
          ? "/employer-dashboard"
          : user.role === "jobseeker"
          ? "/find-jobs"
          : "/";
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            err.response?.data?.message ||
            "Đăng nhập thất bại. Vui lòng thử lại.",
        },
      }));
    }
  };
  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50  px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Chào mừng bạn quay trở lại!
          </h2>
          <p className="text-gray-600 mb-4">Bạn đã đăng nhập thành công.</p>
          <div className="animate-spin w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-secondary-500 mt-2">
            Đang chuyển hướng sang Dashboard...
          </p>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50  px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Chào mừng quay trở lại
          </h2>
          <p className="text-secondary-600 text-sm">
            Đăng nhập vào tài khoản của bạn{" "}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Địa chỉ Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  formState.errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                placeholder="Nhập địa chỉ email"
              />
            </div>
            {formState.errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.email}
              </p>
            )}
          </div>
          <div className="mb-0">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                  formState.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                placeholder="Nhập mật khẩu"
              />
              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ">
                {formState.showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {formState.errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1 " />{" "}
                {formState.errors.password}
              </p>
            )}
          </div>
          <div className="text-right my-3">
            <a
              href="/forget-password"
              className=" text-primary-600 text-sm hover:text-primary-700">
              Quên mật khẩu?
            </a>
          </div>
          {formState.errors.submit && (
            <div className="my-2 bg-red-50 border border-red-200 p-3 rounded-lg">
              <p className="text-red-700 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {formState.errors.submit}
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full flex justify-center items-center bg-gradient-to-r space-x-2 from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold cursor-pointer hover:from-primary-700 hover:to-secondary-700 transition-all  duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Đang đăng nhập...</span>
              </>
            ) : (
              <span>Đăng nhập</span>
            )}
          </button>

          <div className="text-center">
            <p className="text-secondary-600">
              Chưa có tài khoản?{" "}
              <a
                href="/signup"
                className="text-primary-600 font-medium hover:text-primary-700">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
