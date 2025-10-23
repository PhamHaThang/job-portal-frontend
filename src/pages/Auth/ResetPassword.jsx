import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { motion } from "framer-motion";
import { AlertCircle, Loader, Eye, EyeOff, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
const ResetPassword = () => {
  useDocumentTitle("Đặt lại mật khẩu");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
    token: "",
  });
  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    success: false,
    showPassword: false,
    showConfirmPassword: false,
  });
  useEffect(() => {
    if (!token) {
      toast.error("Token không hợp lệ");
      navigate("/login");
      return;
    }
    setFormData((prev) => ({ ...prev, token }));
  }, [token, navigate]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: null },
      }));
    }
  };
  const validateForm = () => {
    const errors = {};

    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      errors.newPassword = passwordError;
    }
    if (!formData.confirmNewPassword) {
      errors.confirmNewPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      errors.confirmNewPassword = "Mật khẩu không khớp";
    }
    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormState((prev) => ({ ...prev, loading: true, errors: {} }));
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, {
        token: formData.token,
        newPassword: formData.newPassword,
      });
      if (response.status === 200) {
        setFormState((prev) => ({
          ...prev,
          loading: false,
          success: true,
          errors: {},
        }));

        toast.success(response?.data?.message || "Đặt lại mật khẩu thành công");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Đặt lại mật khẩu thất bại";

      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit: message,
        },
      }));

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Đặt lại mật khẩu
          </h2>
          <p className="text-secondary-600 text-sm">
            Nhập mật khẩu mới cho tài khoản của bạn
          </p>
        </div>

        {formState.success ? (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="text-green-700 text-center">
              Đặt lại mật khẩu thành công! Đang chuyển hướng...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Mật khẩu mới
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={formState.showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                    formState.errors.newPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                  placeholder="Nhập mật khẩu mới"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      showPassword: !prev.showPassword,
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {formState.showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formState.errors.newPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formState.errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={formState.showConfirmPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                    formState.errors.confirmNewPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                  placeholder="Xác nhận mật khẩu mới"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      showConfirmPassword: !prev.showConfirmPassword,
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {formState.showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formState.errors.confirmNewPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formState.errors.confirmNewPassword}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {formState.errors.submit && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <p className="text-red-700 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {formState.errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState.loading}
              className="w-full flex justify-center items-center bg-gradient-to-r space-x-2 from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold cursor-pointer hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {formState.loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <span>Xác nhận</span>
              )}
            </button>

            {/* Back to Login */}
            <p
              className="text-center text-sm text-gray-500 cursor-pointer hover:underline hover:text-gray-900"
              onClick={() => navigate("/login")}>
              Quay lại đăng nhập
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
