import moment from "moment";

export const formatName = (name) => {
  if (!name) return "bạn";
  const firstName = name.split(" ").slice(-1)[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
};
export const formatCurrency = (amount) => {
  if (amount == null || isNaN(amount)) return "0 ₫";
  const number = Number(amount);
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(number);
};
export const formatNumber = (amount) => {
  if (amount == null || isNaN(amount)) return "0";
  const number = Number(amount);
  return new Intl.NumberFormat("vi-VN").format(number);
};
export const formatDate = (date, format = "DD/MM/YYYY") => {
  if (!date) return "";
  return moment(date).format(format);
};
export const timeFromNow = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "vừa xong";
  if (diffMin < 60) return `${diffMin} phút trước`;
  if (diffHour < 24) return `${diffHour} giờ trước`;
  if (diffDay < 7) return `${diffDay} ngày trước`;

  return date.toLocaleDateString("vi-VN");
};
