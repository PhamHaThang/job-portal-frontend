import ProfilePhotoSelector from "./ProfilePhotoSelector";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
const ProfileInfoForm = ({ profileData, updateSection }) => {
  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold text-gray-900">Thông tin cá nhân</h2>
      <div className="mt-4">
        <ProfilePhotoSelector
          image={
            profileData?.profileImg || profileData?.profilePreviewUrl || ""
          }
          setImage={(value) => updateSection("profileImg", value)}
          preview={profileData?.profilePreviewUrl || ""}
          setPreview={(url) => updateSection("profilePreviewUrl", url)}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          <InputField
            label="Họ và tên"
            value={profileData?.fullName || ""}
            onChange={(e) => updateSection("fullName", e.target.value)}
            placeholder="Nhập họ và tên của bạn"
          />
          <InputField
            label="Chuyên môn"
            value={profileData?.designation || ""}
            onChange={(e) => updateSection("designation", e.target.value)}
            placeholder="Nhập chuyên môn của bạn"
          />
          <div className="col-span-1 lg:col-span-2 mt-3">
            <TextareaField
              label="Tóm tắt bản thân"
              value={profileData?.summary || ""}
              onChange={(e) => updateSection("summary", e.target.value)}
              placeholder="Viết một đoạn tóm tắt ngắn về bản thân bạn"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
