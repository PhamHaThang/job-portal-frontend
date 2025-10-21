import ProfilePhotoSelector from "./ProfilePhotoSelector";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
const ContactInfoForm = ({ contactInfo, updateSection }) => {
  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Thông tin liên lạc
      </h2>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div className="col-span-1 lg:col-span-2">
          <InputField
            label="Địa chỉ"
            value={contactInfo?.location || ""}
            onChange={(e) => updateSection("location", e.target.value)}
            placeholder="Nhập địa chỉ của bạn"
          />
        </div>
        <InputField
          label="Email"
          value={contactInfo?.email || ""}
          onChange={(e) => updateSection("email", e.target.value)}
          placeholder="Nhập email của bạn"
        />
        <InputField
          label="Số điện thoại"
          value={contactInfo?.phone || ""}
          onChange={(e) => updateSection("phone", e.target.value)}
          placeholder="Nhập số điện thoại của bạn"
        />
        <InputField
          label="Linkedin"
          value={contactInfo?.linkedin || ""}
          onChange={(e) => updateSection("linkedin", e.target.value)}
          placeholder="Nhập đường dẫn Linkedin của bạn"
        />
        <InputField
          label="Github"
          value={contactInfo?.github || ""}
          onChange={(e) => updateSection("github", e.target.value)}
          placeholder="Nhập đường dẫn Github của bạn"
        />
        <div className="col-span-1 lg:col-span-2">
          <InputField
            label="Portfolio/Website"
            value={contactInfo?.website || ""}
            onChange={(e) => updateSection("website", e.target.value)}
            placeholder="Nhập đường dẫn Portfolio hoặc Website của bạn"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
