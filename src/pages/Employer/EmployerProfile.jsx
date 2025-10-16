import DashboardLayout from "../../components/layout/DashboardLayout";
import { useState } from "react";
import { Building2, Mail, Edit3 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { uploadImage } from "../../utils/upload";
import Avatar from "../../components/ui/Avatar";
import EditProfileDetaials from "./EditProfileDetaials";
const EmployerProfile = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    companyName: user?.companyName || "",
    companyDescription: user?.companyDescription || "",
    companyLogo: user?.companyLogo || "",
  });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, logo: false });
  const [saving, setSaving] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleImageUpload = async (file, type) => {
    if (!file) return;
    setUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const response = await uploadImage(file);
      const imageUrl = response?.imageUrl || "";
      const field = type === "avatar" ? "avatar" : "companyLogo";
      handleInputChange(field, imageUrl);
      toast.success("Ảnh đã được tải lên thành công");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Tải ảnh thất bại. Vui lòng thử lại.");
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const field = type === "avatar" ? "avatar" : "companyLogo";
      handleInputChange(field, previewUrl);
      handleImageUpload(file, type);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );
      if (response.status === 200) {
        setProfileData({ ...response.data.user });
        updateUser(response.data.user);
        setEditMode(false);
        toast.success("Cập nhật hồ sơ thành công");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Cập nhật hồ sơ thất bại. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    setFormData({ ...profileData });
    setEditMode(false);
  };
  if (editMode) {
    return (
      <EditProfileDetaials
        formData={formData}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        uploading={uploading}
        handleSave={handleSave}
        handleCancel={handleCancel}
        saving={saving}
      />
    );
  }
  return (
    <DashboardLayout activeMenu="company-profile">
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6 flex items-center justify-between">
              <h1 className="text-xl font-medium text-white">
                Hồ sơ nhà tuyển dụng
              </h1>
              <button
                onClick={() => setEditMode(true)}
                className="bg-white/10 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 cursor-pointer">
                <Edit3 className="h-4 w-4" />
                <span>Chỉnh sửa</span>
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Thông tin cá nhân
                  </h2>
                  <div className="flex items-center space-x-4">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover border-4 border-primary-50"
                      />
                    ) : (
                      <Avatar
                        name={profileData.name}
                        size={80}
                        className="border-4 border-primary-50"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{profileData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Thông tin công ty
                  </h2>
                  <div className="flex items-center space-x-4">
                    {profileData.companyLogo ? (
                      <img
                        src={profileData.companyLogo}
                        alt="Company Logo"
                        className="w-20 h-20 rounded-lg object-cover border-4 border-primary-50"
                      />
                    ) : (
                      <Avatar
                        name={profileData.companyName}
                        size={80}
                        className="border-4 border-primary-50 rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.companyName}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Building2 className="w-4 h-4 mr-2" />
                        <span>Công ty</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">
                  Mô tả công ty
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg">
                  {profileData.companyDescription ||
                    "Chưa có mô tả về công ty."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfile;
