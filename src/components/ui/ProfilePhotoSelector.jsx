import { Trash, Upload, User } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Kích thước file vượt quá 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Vui lòng chọn một file hình ảnh hợp lệ");
        return;
      }

      const newPreviewUrl = URL.createObjectURL(file);
      setImage(file);
      if (setPreview) {
        setPreview(newPreviewUrl);
      }
      setPreviewUrl(newPreviewUrl);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);

    if (setPreview) {
      setPreview(null);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const onChooseFile = () => {
    inputRef.current?.click();
  };
  const displayImage =
    preview || previewUrl || (typeof image === "string" ? image : null);
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
      {!displayImage ? (
        <div className="w-20 h-20 items-center justify-center flex bg-primary-50 rounded-full relative">
          <User className="w-10 h-10 text-primary-500" />
          <button
            className="w-8 h-8 items-center justify-center bg-linear-to-r from-primary-500/85 to-primary-700 text-white rounded-full absolute -bottom-1 -right-1 flex cursor-pointer hover:from-primary-600/90 hover:to-primary-800"
            type="button"
            onClick={onChooseFile}>
            <Upload className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={displayImage}
            alt="Ảnh hồ sơ"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 flex cursor-pointer hover:bg-red-600"
            onClick={handleRemoveImage}>
            <Trash className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
