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
import TEMPLATE_ONE_IMG from "../assets/resume-templates/template-01.png";
import TEMPLATE_TWO_IMG from "../assets/resume-templates/template-02.png";
import TEMPLATE_THREE_IMG from "../assets/resume-templates/template-03.png";
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
  { id: "employer-profile", title: "Hồ sơ công ty", icon: Building2 },
  { id: "employer-change-password", title: "Đổi mật khẩu", icon: Shield },
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
  { value: "Remote", label: "Remote" },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
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
export const RESUME_TEMPLATES = [
  { id: "01", thumbnailImg: TEMPLATE_ONE_IMG, colorPalette: "themeOne" },
  { id: "02", thumbnailImg: TEMPLATE_TWO_IMG, colorPalette: "themeTwo" },
  { id: "03", thumbnailImg: TEMPLATE_THREE_IMG, colorPalette: "themeThree" },
];
export const THEME_COLOR_PALETTES = {
  themeOne: [
    ["#FEF2F2", "#FEE2E2", "#FCA5A5", "#DC2626", "#374151"],
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#484B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],
    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C8DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A8", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#98CAF9", "#A8D2F4", "#1E88E5", "#0D47A1"],
  ],
};
export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profileImg: null,
    previewUrl: "",
    fullName: "Hà Thắng",
    designation: "Backend Developer",
    summary:
      "Là một chuyên viên phát triển phần mềm với hơn 5 năm kinh nghiệm trong việc xây dựng các ứng dụng web hiệu quả và thân thiện với người dùng.",
  },
  contactInfo: {
    email: "pht@gmail.com",
    phone: "0123456789",
    location: "Hà Nội, Việt Nam",
    linkedin: "https://linkedin.com/in/thanghapham",
    github: "https://github.com/thanghapham",
    website: "https://thanghapham.com",
  },
  workExperience: [
    {
      company: "Công ty ABC",
      role: "Chuyên viên phát triển phần mềm",
      startDate: "2020-01",
      endDate: "2023-06",
      description:
        "Phát triển và duy trì các ứng dụng web sử dụng React và Node.js. Hợp tác với nhóm thiết kế để tạo giao diện người dùng hấp dẫn.",
    },
    {
      company: "Công ty XYZ",
      role: "Thực tập sinh phát triển phần mềm",
      startDate: "2018-06",
      endDate: "2019-12",
      description:
        "Hỗ trợ phát triển các tính năng mới cho ứng dụng di động sử dụng React Native. Tham gia vào quá trình kiểm thử và sửa lỗi.",
    },
  ],
  education: [
    {
      degree: "Cử nhân Công nghệ Thông tin",
      institution: "Đại học Bách Khoa Hà Nội",
      startDate: "2014-09",
      endDate: "2018-06",
    },
  ],
  skills: [
    { name: "JavaScript", progress: 90 },
    { name: "React", progress: 85 },
    { name: "Node.js", progress: 80 },
    { name: "HTML & CSS", progress: 95 },
  ],
  projects: [
    {
      title: "Hệ thống quản lý công việc",
      description:
        "Phát triển một ứng dụng web giúp người dùng quản lý công việc hàng ngày với các tính năng như tạo, chỉnh sửa và xóa công việc.",
      github: "https://github.com/thanghapham/task-manager",
    },
    {
      title: "Ứng dụng ghi chú",
      description:
        "Xây dựng một ứng dụng ghi chú đơn giản với khả năng đồng bộ hóa dữ liệu trên nhiều thiết bị sử dụng React Native.",
      liveDemo: "https://thanghapham.github.io/note-app",
    },
  ],
  certifications: [
    {
      title: "Chứng chỉ Lập trình Web Toàn diện",
      issuer: "Udemy",
      year: "2021",
    },
  ],
  languages: [
    { name: "Tiếng Anh", progress: 90 },
    { name: "Tiếng Việt", progress: 100 },
  ],
  interest: "Công nghệ, Du lịch, Đọc sách",
};
