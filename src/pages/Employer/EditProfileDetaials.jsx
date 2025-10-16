import DashboardLayout from "../../components/layout/DashboardLayout";
import { Save, X } from "lucide-react";
const EditProfileDetaials = ({
  formData,
  handleInputChange,
  handleImageChange,
  uploading,
  handleSave,
  handleCancel,
  saving,
}) => {
  return (
    <DashboardLayout activeMenu="company-profile">
      {formData && (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-4xl mx-auto ">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
                <h1 className="text-lg md:text-xl font-medium text-white">
                  Chỉnh sửa thông tin
                </h1>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-800 border-b pb-2">
                      Thông tin cá nhân
                    </h2>

                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={formData?.avatar}
                          alt="Avatar"
                          className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                        />
                        {uploading?.avatar && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block">
                          <span className="sr-only">Chọn ảnh đại diện</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "avatar")}
                            className="block w-full file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary-50 file:text-primary-700
                            hover:file:bg-primary-100 transition-colors cursor-pointer file:cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên đầy đủ
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transiton-all"
                        placeholder="Nhập tên đầy đủ"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 ">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-800 border-b pb-2">
                      Thông tin công ty
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={formData?.companyLogo}
                          alt="Company Logo"
                          className="w-20 h-20 rounded-lg object-cover border-4 border-gray-200"
                        />
                        {uploading?.logo && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block">
                          <span className="sr-only">Chọn logo công ty</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "logo")}
                            className="block w-full file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary-50 file:text-primary-700
                            hover:file:bg-primary-100 transition-colors cursor-pointer file:cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên công ty
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transiton-all"
                        placeholder="Nhập tên công ty"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả công ty
                      </label>
                      <textarea
                        value={formData.companyDescription}
                        onChange={(e) =>
                          handleInputChange(
                            "companyDescription",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transiton-all resize-none"
                        placeholder="Nhập mô tả công ty"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transtion-colors flex items-center space-x-2 cursor-pointer">
                    <X className="w-4 h-4" />
                    <span>Hủy</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transtion-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    disabled={saving || uploading.avatar || uploading.logo}>
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{saving ? "Đang lưu..." : "Lưu"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EditProfileDetaials;
