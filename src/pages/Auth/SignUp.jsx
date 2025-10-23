import { useState } from "react";
import { motion } from "framer-motion";
import { uploadImage } from "../../utils/upload";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
  Upload,
  User,
  UserCheck,
} from "lucide-react";
import {
  validateAvatar,
  validateEmail,
  validatePassword,
} from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import useAuth from "../../hooks/useAuth";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
const SignUp = () => {
  useDocumentTitle("Tạo tài khoản");
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
  });
  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    avatarPreview: null,
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
  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    if (formState.errors.role) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, role: "" },
      }));
    }
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateAvatar(file);
      if (error) {
        setFormState((prev) => ({
          ...prev,
          errors: { ...prev.errors, avatar: error },
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prev) => ({
          ...prev,
          avatarPreview: reader.result,
          errors: { ...prev.errors, avatar: "" },
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName.trim() ? "Vui lòng nhập tên đầy đủ" : "",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      role: !formData.role ? "Vui lòng chọn vai trò của bạn" : "",
      avatar: "",
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
    setFormState((prev) => ({ ...prev, loading: true }));
    try {
      let avatarUrl = "";
      if (formData.avatar) {
        const imgUploadResponse = await uploadImage(formData.avatar);
        avatarUrl = imgUploadResponse.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        avatar: avatarUrl || "",
      });
      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
      }));
      const { token, user: userData } = response.data;
      if (token) {
        login(userData, token);
        setTimeout(() => {
          window.location.href =
            userData.role === "employer" ? "/employer-dashboard" : "/find-jobs";
        }, 2000);
      }
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            err.response?.data?.message ||
            "Đăng ký thất bại. Vui lòng thử lại.",
        },
      }));
    }
  };
  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50  px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Tài khoản được tạo thành công!
          </h2>
          <p className="text-gray-600 mb-4">
            Chào mừng bạn đến với Cổng Thông Tin Việc Làm! Tài khoản của bạn đã
            được tạo thành công.
          </p>
          <div className="animate-spin w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-secondary-500 mt-2">
            Đang chuyển hướng sang Dashboard...
          </p>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50  px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Tạo tài khoản
          </h2>
          <p className="text-sm text-secondary-600">
            Tham gia cùng hàng ngàn chuyên gia đang tìm kiếm công việc mơ ước
            của họ
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Tên đầy đủ *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  formState.errors.fullName
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                placeholder="Nhập tên đầy đủ"
              />
            </div>
            {formState.errors.fullName && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.fullName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Địa chỉ Email *
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
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Mật khẩu *
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
                <AlertCircle className="w-4 h-4 mr-1 " />
                {formState.errors.password}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Ảnh đại diện (tùy chọn)
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-secondary-100 overflow-hidden flex items-center justify-center">
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="avatar"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-50 transition-colors flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Chọn ảnh</span>
                </label>
                <p className="text-xs text-secondary-300 mt-1">
                  JPG, JPEG, PNG (5MB)
                </p>
              </div>
            </div>
            {formState.errors.avatar && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.avatar}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">
              Bạn là một *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`
                p-4 rounded-lg border-2 transition-all ${
                  formData.role === "jobseeker"
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-secondary-200 hover:border-secondary-300"
                }`}>
                <UserCheck className="w-8 h-8 mx-auto mb-2 text-secondary-600" />
                <div className="font-medium text-secondary-500">
                  Người tìm việc
                </div>
                <div className="text-xs text-gray-400">Tìm kiếm công việc</div>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`
                p-4 rounded-lg border-2 transition-all ${
                  formData.role === "employer"
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-secondary-200 hover:border-secondary-300"
                }`}>
                <Building2 className="w-8 h-8 mx-auto mb-2 text-secondary-600" />
                <div className="font-medium text-secondary-500">
                  Nhà tuyển dụng
                </div>
                <div className="text-xs text-gray-400">Tìm kiếm ứng viên</div>
              </button>
            </div>
            {formState.errors.role && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.role}
              </p>
            )}
          </div>
          {formState.errors.submit && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
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
                <span>Đang tạo tài khoản...</span>
              </>
            ) : (
              <span>Đăng ký</span>
            )}
          </button>
          <div className="text-center">
            <p className="text-secondary-600">
              Đã có tài khoản?{" "}
              <a
                href="/login"
                className="text-primary-600 font-medium hover:text-primary-700">
                Đăng nhập
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
