export const validateEmail = (email) => {
  if (!email.trim()) return "Vui lòng nhập email.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Địa chỉ email không hợp lệ.";
  return "";
};
export const validatePassword = (password) => {
  if (!password) return "Vui lòng nhập mật khẩu.";
  if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
  // if (!/[A-Z]/.test(password))
  //   return "Mật khẩu phải chứa ít nhất một chữ cái viết hoa.";
  // if (!/[a-z]/.test(password))
  //   return "Mật khẩu phải chứa ít nhất một chữ cái viết thường.";
  // if (!/[0-9]/.test(password)) return "Mật khẩu phải chứa ít nhất một chữ số.";
  return "";
};
export const validateAvatar = (file) => {
  if (!file) return "";
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.type))
    return "Chỉ chấp nhận các định dạng ảnh: .jpg, .jpeg, .png.";
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) return "Kích thước ảnh không được vượt quá 5MB.";
  return "";
};
