import {
  Award,
  BarChart3,
  Briefcase,
  Building2,
  Clock,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Search,
  Shield,
  Users,
} from "lucide-react";

export const jobSeekerFeatures = [
  {
    icon: Search,
    title: "Tìm kiếm việc làm dễ dàng",
    description:
      "Thuật toán tìm kiếm thông minh giúp bạn nhanh chóng tìm thấy công việc phù hợp với kỹ năng và sở thích của mình.",
  },
  {
    icon: FileText,
    title: "Tạo CV chuyên nghiệp",
    description:
      "Xây dựng hồ sơ cá nhân ấn tượng với mẫu CV tích hợp sẵn, giúp bạn nổi bật trước nhà tuyển dụng.",
  },
  {
    icon: MessageSquare,
    title: "Trực tiếp liên hệ",
    description:
      "Kết nối trực tiếp với nhà tuyển dụng qua hệ thống nhắn tin tích hợp. Đặt câu hỏi và nhận phản hồi nhanh chóng.",
  },
  {
    icon: Award,
    title: "Đánh giá kỹ năng",
    description:
      "Thể hiện năng lực của bạn với các bài kiểm tra kỹ năng và nhận huy hiệu được nhà tuyển dụng tin tưởng.",
  },
];
export const employerFeatures = [
  {
    icon: Users,
    title: "Tiếp cận ứng viên chất lượng",
    description:
      "Hệ thống lọc ứng viên thông minh giúp bạn nhanh chóng tìm thấy những ứng viên phù hợp với yêu cầu công việc.",
  },
  {
    icon: BarChart3,
    title: "Phân tích tuyển dụng",
    description:
      "Theo dõi hiệu quả tuyển dụng với các báo cáo chi tiết và thông tin chuyên sâu về mức độ tương tác của ứng viên.",
  },
  {
    icon: Shield,
    title: "Ứng viên đã xác minh",
    description:
      "Tất cả ứng viên đều được xác minh lý lịch để đảm bảo bạn tuyển được những chuyên gia đáng tin cậy.",
  },
  {
    icon: Clock,
    title: "Tuyển dụng nhanh chóng",
    description:
      "Tạo và đăng tin tuyển dụng chỉ trong vài phút với giao diện thân thiện và dễ sử dụng.",
  },
];
export const NAVIGATION_MENU = [
  { id: "employer-dashboard", title: "Dashboard", icon: LayoutDashboard },
  { id: "post-job", title: "Đăng tin việc làm", icon: Plus },
  { id: "manage-jobs", title: "Quản lý việc làm", icon: Briefcase },
  { id: "company-profile", title: "Hồ sơ công ty", icon: Building2 },
];
export const CATEGORIES = [
  { value: "Engineering", label: "Kỹ thuật" },
  { value: "Design", label: "Thiết kế" },
  { value: "Marketing", label: "Tiếp thị" },
  { value: "Sales", label: "Bán hàng" },
  { value: "IT & Software", label: "CNTT & Phần mềm" },
  { value: "Customer-service", label: "Chăm sóc khách hàng" },
  { value: "Product", label: "Sản phẩm" },
  { value: "Operations", label: "Vận hành" },
  { value: "Finance", label: "Tài chính" },
  { value: "HR", label: "Nhân sự" },
  { value: "Other", label: "Khác" },
];
export const JOB_TYPES = [
  { value: "Remote", label: "Làm việc từ xa" },
  { value: "Full-Time", label: "Toàn thời gian" },
  { value: "Part-Time", label: "Bán thời gian" },
  { value: "Contract", label: "Hợp đồng" },
  { value: "Internship", label: "Thực tập" },
];
export const SALARY_RANGES = [
  "Dưới 5 triệu VNĐ",
  "5 – 10 triệu VNĐ",
  "10 – 20 triệu VNĐ",
  "20 – 30 triệu VNĐ",
  "30 – 50 triệu VNĐ",
  "Trên 50 triệu VNĐ",
];
export const QUICK_ACTIONS = [
  {
    title: "Đăng việc làm mới",
    icon: Plus,
    color: "bg-blue-50 text-blue-700",
    path: "/post-job",
  },
  {
    title: "Quản lý việc làm",
    icon: Users,
    color: "bg-green-50 text-green-700",
    path: "/manage-jobs",
  },
  {
    title: "Hồ sơ công ty",
    icon: Building2,
    color: "bg-orange-50 text-orange-700",
    path: "/company-profile",
  },
];
