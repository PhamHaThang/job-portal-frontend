import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { motion } from "framer-motion";
import { AlertCircle, Loader, Mail } from "lucide-react";
import toast from "react-hot-toast";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
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
  };
  const validateForm = () => {
    const errors = {
      email: validateEmail(formData.email),
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
      const response = await axiosInstance.post(
        API_PATHS.AUTH.FORGET_PASSWORD,
        {
          email: formData.email,
        }
      );
      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
      }));
      if (response.status === 200) {
        toast.success(
          response?.message || "Đã gửi liên kết đặt lại mật khẩu đến email"
        );
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Không thể gửi email đặt lại";
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
    <div className="min-h-screen flex items-center justify-center bg-secondary-50  px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Quên mật khẩu
          </h2>
          <p className="text-secondary-600 text-sm">
            Nhập email để nhận liên kết đặt lại mật khẩu
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            disabled={formState.loading}
            className="w-full flex justify-center items-center bg-gradient-to-r space-x-2 from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold cursor-pointer hover:from-primary-700 hover:to-secondary-700 transition-all  duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Đang gửi...</span>
              </>
            ) : (
              <span>Gửi liên kết đặt lại mật khẩu</span>
            )}
          </button>
          <p
            className="text-center text-sm text-gray-500 cursor-pointer hover:underline hover:text-gray-900"
            onClick={() => navigate(-1)}>
            Quay lại đăng nhập
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
