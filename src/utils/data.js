import {
  Award,
  BarChart3,
  Briefcase,
  Building2,
  ChartColumnIncreasing,
  CheckCheck,
  Clock,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Palette,
  Plus,
  ScrollText,
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

export const ANALYZE_RESUME_PROMPT = `Đầu tiên, hãy xác định xem tài liệu này có thực sự là một sơ yếu lý lịch (resume) hay không. Tìm kiếm:
- Kinh nghiệm chuyên môn, lịch sử làm việc, hoặc thông tin tuyển dụng
- Nền tảng học vấn, bằng cấp, hoặc thông tin học thuật
- Kỹ năng, bằng cấp chuyên môn, hoặc năng lực chuyên môn
- Thông tin liên hệ và chi tiết cá nhân

Nếu đây KHÔNG phải là sơ yếu lý lịch (ví dụ: hóa đơn, biên nhận, hợp đồng, bài báo, sách hướng dẫn, v.v.), hãy phản hồi bằng:
{
  "error": "Tài liệu này không giống một sơ yếu lý lịch. Vui lòng tải lên một sơ yếu lý lịch phù hợp có chứa các phần kinh nghiệm chuyên môn, học vấn và kỹ năng."
}

Nếu đây LÀ một sơ yếu lý lịch, hãy phân tích kỹ lưỡng và cung cấp phản hồi toàn diện ở định dạng JSON này:
{
  "overallScore": "X/10",
  "strengths": [
    "điểm mạnh 1",
    "điểm mạnh 2",
    "điểm mạnh 3"
  ],
  "improvements": [
    "điểm cần cải thiện 1",
    "điểm cần cải thiện 2",
    "điểm cần cải thiện 3"
  ],
  "keywords": [
    "từ khóa 1",
    "từ khóa 2",
    "từ khóa 3"
  ],
  "summary": "Đánh giá tổng quan ngắn gọn",
  "performanceMetrics": {
    "formatting": X,
    "contentQuality": X,
    "keywordUsage": X,
    "atsCompatibility": X,
    "quantifiableAchievements": X
  },
  "actionItems": [
    "mục hành động cụ thể 1",
    "mục hành động cụ thể 2",
    "mục hành động cụ thể 3"
  ],
  "proTips": [
    "mẹo chuyên nghiệp 1",
    "mẹo chuyên nghiệp 2",
    "mẹo chuyên nghiệp 3"
  ],
  "atsChecklist": [
    "yêu cầu ats 1",
    "yêu cầu ats 2",
    "yêu cầu ats 3"
  ]
}

Đối với performanceMetrics, hãy xếp hạng mỗi lĩnh vực từ 1-10 dựa trên:

- formatting: Bố cục, cấu trúc, sự hấp dẫn về mặt hình ảnh, tính nhất quán, khả năng đọc. Tìm kiếm các phần rõ ràng, khoảng cách phù hợp, phông chữ nhất quán, vẻ ngoài chuyên nghiệp
- contentQuality: Mức độ liên quan, thành tích, tác động, sự rõ ràng, tính đầy đủ. Đánh giá xem nội dung có liên quan đến vai trò mục tiêu hay không, thành tích có được mô tả tốt hay không và thông tin có đầy đủ hay không
- keywordUsage: Thuật ngữ ngành, tối ưu hóa ATS, từ khóa kỹ năng, mức độ liên quan đến công việc. Kiểm tra thuật ngữ dành riêng cho ngành, kỹ năng kỹ thuật, tên phần mềm, phương pháp luận và các từ khóa liên quan
- atsCompatibility: Định dạng thân thiện với ATS, cấu trúc dễ quét, tiêu đề phù hợp. Đánh giá xem sơ yếu lý lịch có sử dụng các tiêu đề phần tiêu chuẩn (Kinh nghiệm, Học vấn, Kỹ năng) hay không, có tránh đồ họa/hình ảnh hay không, có định dạng rõ ràng hay không và có dễ dàng được phân tích cú pháp bởi các hệ thống ATS hay không
- quantifiableAchievements: Sử dụng các con số, tỷ lệ phần trăm, số liệu trong các thành tích. Tìm kiếm các con số cụ thể, tỷ lệ phần trăm, số tiền, khung thời gian, quy mô nhóm, phạm vi dự án và các kết quả có thể đo lường được

Đối với atsCompatibility, hãy đặc biệt nghiêm ngặt và tìm kiếm:
- Tiêu đề phần tiêu chuẩn (Kinh nghiệm, Học vấn, Kỹ năng, Tóm tắt, v.v.)
- Định dạng rõ ràng, đơn giản, không có đồ họa, hình ảnh hoặc bố cục phức tạp
- Sử dụng đúng các từ khóa liên quan đến ngành/vai trò
- Thành tích được lượng hóa bằng các con số và số liệu cụ thể
- Động từ hành động ở đầu mỗi gạch đầu dòng
- Định dạng nhất quán trong toàn bộ tài liệu
- Thông tin liên hệ hiển thị rõ ràng
- Không có bảng, biểu đồ hoặc định dạng phức tạp có thể gây nhầm lẫn cho hệ thống ATS

Đối với atsChecklist, hãy cung cấp các yêu cầu và cải tiến cụ thể để đảm bảo sơ yếu lý lịch vượt qua các hệ thống ATS thành công.

Đối với actionItems, hãy cung cấp các bước cụ thể, có thể hành động mà người dùng có thể thực hiện ngay lập tức để cải thiện sơ yếu lý lịch của họ.

Đối với proTips, hãy đưa ra lời khuyên chuyên nghiệp có thể giúp họ trong việc tìm kiếm việc làm và tối ưu hóa sơ yếu lý lịch.

Nội dung tài liệu:
{{DOCUMENT_TEXT}}`;

export const METRIC_CONFIG = [
  {
    key: "formatting",
    label: "Định dạng",
    defaultValue: 7,
    colorClass: "from-emerald-400 to-emerald-500",
    shadowClass: "group-hover/item:shadow-emerald-500/30",
    icon: Palette,
  },
  {
    key: "contentQuality",
    label: "Chất lượng nội dung",
    defaultValue: 6,
    colorClass: "from-blue-400 to-blue-500",
    shadowClass: "group-hover/item:shadow-blue-500/30",
    icon: ScrollText,
  },
  {
    key: "atsCompatibility",
    label: "Tương thích ATS",
    defaultValue: 6,
    colorClass: "from-violet-400 to-violet-500",
    shadowClass: "group-hover/item:shadow-violet-500/30",
    icon: CheckCheck,
  },
  {
    key: "keywordUsage",
    label: "Sử dụng từ khóa",
    defaultValue: 5,
    colorClass: "from-purple-400 to-purple-500",
    shadowClass: "group-hover/item:shadow-purple-500/30",
    icon: Search,
  },
  {
    key: "quantifiableAchievements",
    label: "Kết quả định lượng",
    defaultValue: 4,
    colorClass: "from-orange-400 to-orange-500",
    shadowClass: "group-hover/item:shadow-orange-500/30",
    icon: ChartColumnIncreasing,
  },
];

export const buildPresenceChecklist = (text) => {
  const hay = (text || "").toLowerCase();
  return [
    {
      label: "Tiêu đề tiêu chuẩn",
      present:
        /experience|education|skills|summary|objective|work history|professional experience|employment/.test(
          hay
        ),
    },
    {
      label: "Thông tin liên hệ",
      present: /email|phone|linkedin|github|portfolio|@|\.com|\.net|\.org/.test(
        hay
      ),
    },
    {
      label: "Từ khóa & Kỹ năng",
      present:
        /skills|technologies|tech skills|competencies|programming|software|tools|javascript|python|java|react|node|sql|html|css|aws|docker|kubernetes|agile|scrum|git|api|database|framework|library|language|technology|stack/.test(
          hay
        ),
    },
    {
      label: "Thành tích",
      present:
        /\d+%|\d+ percent|\d+ people|\d+ team|\d+ project|\d+ year|\d+ month|\d+ dollar|\$\d+|\d+ users|\d+ customers|\d+ revenue|\d+ growth|\d+ improvement|\d+ reduction|\d+ increase|\d+ decrease/.test(
          hay
        ),
    },
    {
      label: "Động từ hành động",
      present:
        /developed|created|implemented|managed|led|designed|built|improved|increased|decreased|achieved|delivered|launched|optimized|streamlined|enhanced|established|coordinated|facilitated|orchestrated|spearheaded|pioneered|architected|engineered|deployed|maintained|supported|troubleshot|resolved|analyzed|researched|evaluated|assessed|planned|organized|executed|completed|finished|accomplished|generated|produced|created|developed|built|constructed|assembled|fabricated|manufactured|produced|yielded|resulted|caused|brought|about|led|to|contributed|to|helped|assisted|aided|supported|enabled|empowered|facilitated|promoted|encouraged|fostered|nurtured|cultivated|developed|grew|expanded|scaled|increased|boosted|enhanced|improved|upgraded|refined|polished|perfected|optimized|streamlined|simplified|clarified|organized|structured|arranged|systematized|standardized|formalized|institutionalized|established|founded|created|initiated|started|began|commenced|launched|introduced|unveiled|revealed|disclosed|announced|declared|proclaimed|stated|expressed|communicated|conveyed|transmitted|delivered|presented|demonstrated|exhibited|displayed|showcased|highlighted|emphasized|stressed|underscored|accentuated|featured|spotlighted|focused|centered|concentrated|targeted|aimed|directed|guided|steered|navigated|piloted|drove|propelled|pushed|advanced|progressed|moved|forward|accelerated|expedited|hastened|rushed|hurried|sped|up|quickened|fastened|accelerated|boosted|enhanced|amplified|magnified|multiplied|doubled|tripled|quadrupled|quintupled|sextupled|septupled|octupled|nonupled|decupled/.test(
          hay
        ),
    },
    {
      label: "Kinh nghiệm chuyên môn",
      present:
        /experience|employment|work history|professional experience|job|position|role|career|occupation|employment|work|job|position|role|title|responsibilities|duties|tasks|projects|initiatives|achievements|accomplishments|contributions|impact|results|outcomes|deliverables|outputs|work|employment|job|position|role|title|company|organization|employer|client|customer|stakeholder|team|department|division|unit|group|section|branch|office|location|site|facility|premises|workplace|workstation|desk|office|cubicle|workspace|environment|setting|context|situation|circumstance|condition|state|status|level|grade|rank|tier|category|class|type|kind|sort|variety|form|style|manner|way|method|approach|technique|strategy|tactic|procedure|process|system|framework|model|paradigm|theory|concept|idea|notion|thought|belief|opinion|view|perspective|standpoint|position|stance|attitude|mindset|outlook|approach|methodology|philosophy|principle|value|standard|criterion|benchmark|measure|metric|indicator|signal|sign|mark|token|symbol|emblem|badge|insignia|logo|brand|label|tag|stamp|seal|signature|autograph|mark|trace|track|trail|path|route|way|road|street|avenue|boulevard|highway|freeway|expressway|turnpike|parkway|drive|lane|alley|path|trail|track|route|way|road|street|avenue|boulevard|highway|freeway|expressway|turnpike|parkway|drive|lane|alley/.test(
          hay
        ),
    },
    {
      label: "Học vấn",
      present:
        /education|bachelor|master|phd|university|degree|college|school|academic|academy|institute|institution|faculty|department|program|course|curriculum|syllabus|textbook|lecture|seminar|workshop|tutorial|training|certification|certificate|diploma|transcript|gpa|grade|score|mark|result|outcome|achievement|accomplishment|success|performance|progress|development|growth|improvement|enhancement|advancement|promotion|elevation|upgrade|boost|lift|raise|increase|improvement|enhancement|betterment|refinement|polishing|perfection|optimization|streamlining|simplification|clarification|organization|structuring|arrangement|systematization|standardization|formalization|institutionalization|establishment|foundation|creation|initiation|start|beginning|commencement|launch|introduction|unveiling|revelation|disclosure|announcement|declaration|proclamation|statement|expression|communication|conveyance|transmission|delivery|presentation|demonstration|exhibition|display|showcase|highlighting|emphasis|stress|underscoring|accentuation|featuring|spotlighting|focusing|centering|concentration|targeting|aiming|directing|guiding|steering|navigating|piloting|driving|propelling|pushing|advancing|progressing|moving|forward|accelerating|expediting|hastening|rushing|hurrying|speeding|up|quickening|fastening|accelerating|boosting|enhancing|amplifying|magnifying|multiplying|doubling|tripling|quadrupling|quintupling|sextupling|septupling|octupling|nonupling|decupling/.test(
          hay
        ),
    },
  ];
};
