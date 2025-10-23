import { useState } from "react";
import { Lock, Eye, EyeOff, AlertCircle, Check } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validatePassword } from "../../utils/helper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
const UserChangePassword = () => {
  useDocumentTitle("Đổi mật khẩu");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
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

  const togglePasswordVisibility = (field) => {
    setFormState((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.currentPassword) {
      errors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      errors.newPassword = passwordError;
    }

    if (formData.newPassword === formData.currentPassword) {
      errors.newPassword = "Mật khẩu mới phải khác mật khẩu hiện tại";
    }

    if (!formData.confirmNewPassword) {
      errors.confirmNewPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      errors.confirmNewPassword = "Mật khẩu xác nhận không khớp";
    }

    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormState((prev) => ({ ...prev, loading: true, errors: {} }));
    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.CHANGE_PASSWORD, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.status === 200) {
        toast.success("Đổi mật khẩu thành công!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setFormState((prev) => ({
          ...prev,
          success: true,
          errors: {},
        }));
      }
    } catch (error) {
      const message = error.response?.data?.message || "Đổi mật khẩu thất bại";
      setFormState((prev) => ({
        ...prev,
        errors: { submit: message },
      }));
      toast.error(message);
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  const renderPasswordInput = (name, label, showPassword, placeholder) => (
    <div key={name}>
      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full pl-8 md:pl-10 pr-10 md:pr-12 py-2 md:py-3 text-sm md:text-base rounded-lg border ${
            formState.errors[name] ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() =>
            togglePasswordVisibility(
              name === "currentPassword"
                ? "showCurrentPassword"
                : name === "newPassword"
                ? "showNewPassword"
                : "showConfirmPassword"
            )
          }
          className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {showPassword ? (
            <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <Eye className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>
      </div>
      {formState.errors[name] && (
        <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center">
          <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
          {formState.errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-6 md:py-8 px-2 sm:px-4 pt-20 md:pt-24 lg:pt-28">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 md:px-8 py-4 md:py-6">
            <h1 className="text-lg md:text-xl font-medium text-white">
              Đổi mật khẩu
            </h1>
            <p className="text-primary-100 text-xs md:text-sm mt-1">
              Cập nhật mật khẩu để bảo mật tài khoản
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-8">
            <div className="space-y-4 md:space-y-6">
              {renderPasswordInput(
                "currentPassword",
                "Mật khẩu hiện tại",
                formState.showCurrentPassword,
                "Nhập mật khẩu hiện tại"
              )}

              {renderPasswordInput(
                "newPassword",
                "Mật khẩu mới",
                formState.showNewPassword,
                "Nhập mật khẩu mới"
              )}

              {renderPasswordInput(
                "confirmNewPassword",
                "Xác nhận mật khẩu mới",
                formState.showConfirmPassword,
                "Nhập lại mật khẩu mới"
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm font-medium text-blue-900 mb-2">
                  Yêu cầu mật khẩu:
                </p>
                <ul className="space-y-1 text-xs md:text-sm text-blue-700">
                  <li className="flex items-center">
                    <Check className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    Ít nhất 8 ký tự
                  </li>
                </ul>
              </div>

              {formState.errors.submit && (
                <div className="bg-red-50 border border-red-200 p-3 md:p-4 rounded-lg">
                  <p className="text-red-700 text-xs md:text-sm flex items-center">
                    <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    {formState.errors.submit}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3 md:space-x-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate("/find-jobs")}
                className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 text-sm md:text-base rounded-lg hover:bg-gray-50 transition-colors">
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={formState.loading}
                className="px-4 md:px-6 py-2 md:py-3 bg-primary-600 text-white text-sm md:text-base rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2">
                {formState.loading ? (
                  <>
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <span>Đổi mật khẩu</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserChangePassword;
