import { useState } from "react";
import { Building2, Mail, Edit3 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { uploadImage } from "../../utils/upload";
import Avatar from "../../components/ui/Avatar";
import EditProfileDetails from "./EditProfileDetails";
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
  const [pendingFiles, setPendingFiles] = useState({
    avatar: null,
    logo: null,
  });
  const [saving, setSaving] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Kích thước ảnh không được vượt quá 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Chỉ chấp nhận file ảnh");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      const field = type === "avatar" ? "avatar" : "companyLogo";
      setPendingFiles((prev) => ({ ...prev, [type]: file }));
      handleInputChange(field, previewUrl);
    }
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
          toast.success("Tải ảnh đại diện thành công", { id: "avatar-upload" });
        } catch (error) {
          toast.error("Tải ảnh đại diện thất bại", { id: "avatar-upload" });
          throw error;
        }
      }
      if (pendingFiles.logo) {
        toast.loading("Đang tải logo công ty...", { id: "logo-upload" });
        try {
          const response = await uploadImage(pendingFiles.logo);
          uploadedData.companyLogo = response?.imageUrl || "";
          toast.success("Tải logo công ty thành công", { id: "logo-upload" });
        } catch (error) {
          toast.error("Tải logo công ty thất bại", { id: "logo-upload" });
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
        setPendingFiles({ avatar: null, logo: null });
        updateUser(response.data.user);
        setEditMode(false);
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
    setPendingFiles({ avatar: null, logo: null });
    setEditMode(false);
  };
  if (editMode) {
    return (
      <EditProfileDetails
        formData={formData}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        pendingFiles={pendingFiles}
        handleSave={handleSave}
        handleCancel={handleCancel}
        saving={saving}
      />
    );
  }
  return (
    <>
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
    </>
  );
};

export default EmployerProfile;
