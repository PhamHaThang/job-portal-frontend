# Cổng Thông Tin Việc Làm - Frontend

## Mô tả

Đây là frontend của website Cổng Thông Tin Việc Làm, được xây dựng bằng React và Vite. Ứng dụng cung cấp nền tảng để người tìm việc và nhà tuyển dụng tương tác, bao gồm đăng ký công việc, quản lý hồ sơ, và các tính năng AI.

## Tính năng

- **Trang chủ**: Giới thiệu về website
- **Xác thực**: Đăng nhập, đăng ký, quên mật khẩu, đặt lại mật khẩu
- **Người tìm việc (Jobseeker)**:
  - Tìm kiếm và xem công việc
  - Ứng tuyển công việc
  - Lưu công việc
  - Quản lý hồ sơ cá nhân
  - Phân tích CV bằng AI
  - Luyện phỏng vấn
- **Nhà tuyển dụng (Employer)**:
  - Đăng bài tuyển dụng
  - Quản lý ứng viên
  - Phân tích dữ liệu
- **Thông báo**: Hệ thống thông báo
- **Tải lên tệp**: Hỗ trợ tải lên CV và hình ảnh

## Công nghệ sử dụng

- **React**: Thư viện JavaScript cho giao diện người dùng
- **Vite**: Công cụ xây dựng nhanh
- **TailwindCSS**: Framework CSS
- **Framer Motion**: Thư viện hoạt hình
- **React Router**: Định tuyến
- **Axios**: HTTP client
- **React Hot Toast**: Thông báo
- **Lucide React**: Biểu tượng
- **PDF.js**: Xử lý PDF
- **React Markdown**: Hiển thị Markdown
- **Date-fns**: Xử lý ngày tháng
- **Moment.js**: Thư viện thời gian
- **React Hot Toast**: Thông báo
- **Lucide React**: Biểu tượng

## Cấu trúc thư mục

```
frontend/
├── public/            # Tài nguyên công khai
├── src/
│   ├── assets/        # Tài nguyên
│   ├── components/    # Component tái sử dụng
│   ├── context/       # React Context
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Trang
│   │   ├── Auth/      # Trang xác thực
│   │   ├── Employer/  # Trang nhà tuyển dụng
│   │   ├── JobSeeker/ # Trang người tìm việc
│   │   └── LandingPage/ # Trang đích
│   ├── routes/        # Định tuyến
│   ├── utils/         # Tiện ích
│   ├── App.jsx        # Component chính
│   ├── main.jsx       # Điểm vào
│   └── index.css      # CSS chính
├── .env               # Biến môi trường
├── .env.example       # Ví dụ biến môi trường
├── index.html         # HTML chính
├── package.json       # Quản lý gói
├── vite.config.js     # Cấu hình Vite
└── README.md          # Tài liệu này
```

## Cài đặt

1. Clone dự án `git clone https://github.com/PhamHaThang/job-portal-frontend.git`
2. Điều hướng đến thư mục frontend `cd frontend`
3. Chạy `npm install`
4. Tạo tệp .env với các biến sau (tham khảo .env.example):
   - VITE_BASE_URL (URL của backend API)
5. Chạy `npm run dev`

## Scripts

- `npm run dev`: Khởi động server phát triển
- `npm run build`: Xây dựng cho sản xuất
- `npm run preview`: Xem trước bản xây dựng
- `npm run lint`: Kiểm tra mã nguồn

## Triển khai

Ứng dụng được cấu hình để triển khai trên Vercel hoặc các nền tảng tương tự. Chạy `npm run build` để tạo bản xây dựng.
