import { useState, useEffect, use } from "react";
import { Save, X, Trash2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { uploadImage, uploadPDF } from "../../utils/upload";
import { Link } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
const UserProfile = () => {
  useDocumentTitle("Hồ sơ cá nhân");
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    resume: user?.resume || "",
  });
  const [pendingFiles, setPendingFiles] = useState({
    avatar: null,
    resume: null,
  });
  const [pendingDelete, setPendingDelete] = useState({
    resume: false,
  });
  const [formData, setFormData] = useState({ ...profileData });
  const [saving, setSaving] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Kích thước ảnh không được vượt quá 5MB");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setPendingFiles((prev) => ({ ...prev, avatar: file }));
      handleInputChange("avatar", previewUrl);
    }
  };
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Kích thước file không được vượt quá 10MB");
        return;
      }
      if (file.type !== "application/pdf") {
        toast.error("Chỉ chấp nhận file PDF");
        return;
      }
      setPendingFiles((prev) => ({ ...prev, resume: file }));
      handleInputChange("resume", file.name);
      setPendingDelete((prev) => ({ ...prev, resume: false }));
    }
  };
  const markDeleteResume = () => {
    setPendingDelete((prev) => ({ ...prev, resume: true }));
    setPendingFiles((prev) => ({ ...prev, resume: null }));
    handleInputChange("resume", "");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let uploadedData = { ...formData };
      if (pendingFiles.avatar) {
        toast.loading("Đang tải ảnh đại diện...", { id: "avatar-upload" });
        try {
          const response = await uploadImage(pendingFiles.avatar);
          uploadedData.avatar = response?.imageUrl || "";
          toast.success("Tải ảnh thành công", { id: "avatar-upload" });
        } catch (error) {
          toast.error("Tải ảnh thất bại", { id: "avatar-upload" });
          throw error;
        }
      }
      if (pendingFiles.resume) {
        toast.loading("Đang tải CV...", { id: "resume-upload" });
        try {
          const response = await uploadPDF(pendingFiles.resume);
          uploadedData.resume = response?.fileUrl || "";
          toast.success("Tải CV thành công", { id: "resume-upload" });
        } catch (error) {
          toast.error("Tải CV thất bại", { id: "resume-upload" });
          throw error;
        }
      }
      if (pendingDelete.resume && profileData.resume) {
        toast.loading("Đang xóa CV...", { id: "resume-delete" });
        try {
          await axiosInstance.delete(API_PATHS.AUTH.DELETE_RESUME, {
            data: { resumeUrl: profileData.resume },
          });
          uploadedData.resume = "";
          toast.success("Xóa CV thành công", { id: "resume-delete" });
        } catch (error) {
          toast.error("Xóa CV thất bại", { id: "resume-delete" });
          throw error;
        }
      }
      toast.loading("Đang cập nhật hồ sơ...", { id: "profile-update" });
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        uploadedData
      );
      if (response.status === 200) {
        setProfileData(uploadedData);
        setFormData(uploadedData);
        setPendingFiles({ avatar: null, resume: null });
        setPendingDelete({ resume: false });
        updateUser(response.data.user);
        toast.success("Cập nhật hồ sơ thành công", { id: "profile-update" });
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(error?.response?.data?.message || "Cập nhật hồ sơ thất bại", {
        id: "profile-update",
      });
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    setFormData({ ...profileData });
    setPendingFiles({ avatar: null, resume: null });
    setPendingDelete({ resume: false });
  };

  useEffect(() => {
    const userData = {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      resume: user?.resume || "",
    };
    setProfileData(userData);
    setFormData(userData);
    setPendingFiles({ avatar: null, resume: null });
    setPendingDelete({ resume: false });
    return () => {};
  }, [user]);
  return (
    <div className="min-h-screen py-6 md:py-8 px-2 sm:px-4 pt-20 md:pt-24 lg:pt-28">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 md:px-8 py-4 md:py-6 flex justify-between">
            <h1 className="text-lg md:text-xl font-medium text-white">
              Hồ sơ cá nhân
            </h1>
          </div>
          <div className="p-4 md:p-8">
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-3 sm:space-y-0">
                <div className="relative flex-shrink-0">
                  {formData?.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Avatar"
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 md:border-4 border-gray-200"
                    />
                  ) : (
                    <Avatar
                      className="border-2 md:border-4 border-gray-200"
                      size={window.innerWidth < 768 ? 64 : 80}
                      name={formData?.name}
                    />
                  )}
                </div>
                <div className="w-full">
                  <label className="block">
                    <span className="sr-only">Chọn ảnh đại diện</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="block w-full file:mr-2 md:file:mr-4 file:py-1.5 md:file:py-2 file:px-3 md:file:px-4 text-xs md:text-sm text-gray-500
                            file:rounded-full file:border-0
                            file:text-xs md:file:text-sm file:font-semibold
                            file:bg-primary-50 file:text-primary-700
                            hover:file:bg-primary-100 transition-colors cursor-pointer file:cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Tên đầy đủ
                </label>
                <input
                  type="text"
                  value={formData?.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transiton-all"
                  placeholder="Nhập tên đầy đủ của bạn"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  value={formData?.email || ""}
                  className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
              {profileData.resume &&
              !pendingDelete.resume &&
              !pendingFiles.resume ? (
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    CV
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
                    <p className="text-xs md:text-sm text-gray-600 break-words">
                      Hồ sơ hiện tại:{" "}
                      <a
                        href={user?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline cursor-pointer">
                        Xem hồ sơ
                      </a>
                    </p>
                    <button
                      onClick={markDeleteResume}
                      disabled={saving}
                      className="cursor-pointer text-red-500 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0">
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="block">
                  <span className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Chọn hồ sơ (PDF):
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="block w-full file:mr-2 md:file:mr-4 file:py-1.5 md:file:py-2 file:px-3 md:file:px-4 text-xs md:text-sm text-gray-500
                            file:rounded-full file:border-0
                            file:text-xs md:file:text-sm file:font-semibold
                            file:bg-primary-50 file:text-primary-700
                            hover:file:bg-primary-100 transition-colors cursor-pointer file:cursor-pointer mt-1"
                    onChange={handleResumeChange}
                  />
                </label>
              )}
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3 md:space-x-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t">
              <Link
                onClick={handleCancel}
                to="/find-jobs"
                className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 text-sm md:text-base rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <X className="w-4 h-4" />
                <span>Hủy bỏ</span>
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-white bg-primary-600 rounded-lg hover:bg-primary-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2">
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{saving ? "Đang lưu..." : "Cập nhật"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
