import logo from "../../assets/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary-50 text-secondary-900">
      <div className="container mx-auto px-6 py-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 ">
          <div className="max-w-xs space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
              <div className="leading-tight whitespace-nowrap">
                <p className="text-primary-500 font-bold text-sm">
                  Học viện Công nghệ Bưu chính Viễn thông
                </p>
                <p className="text-secondary-500 font-extrabold text-lg uppercase tracking-wide">
                  Cổng thông tin việc làm
                </p>
              </div>
            </div>
            <p className="text-sm text-secondary-600">
              Kết nối ứng viên tiềm năng với doanh nghiệp hàng đầu. Chúng tôi
              đồng hành cùng bạn trên con đường sự nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm md:gap-12 lg:gap-20">
            <div className="space-y-3">
              <h4 className="text-secondary-900 font-semibold uppercase text-xs">
                Về chúng tôi
              </h4>
              <ul className="space-y-2 text-secondary-400">
                <li>Giới thiệu</li>
                <li>Tầm nhìn</li>
                <li>Đối tác</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-secondary-900 font-semibold uppercase text-xs">
                Hỗ trợ
              </h4>
              <ul className="space-y-2 text-secondary-400">
                <li>Hỏi đáp</li>
                <li>Chính sách</li>
                <li>Liên hệ</li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 md:col-span-1">
              <h4 className="text-secondary-900 font-semibold uppercase text-xs">
                Kết nối
              </h4>
              <ul className="space-y-2 text-secondary-400">
                <li>Email: jobs@ptit.edu.vn</li>
                <li>Hotline: (024) 38.544.451</li>
                <li>
                  Địa chỉ: Số 96A Trần Phú, phường Hà Đông, thành phố Hà Nội.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 pt-6 text-xs text-secondary-400 flex flex-col md:flex-row md:justify-between gap-2">
          <span>&copy; {year} Học viện Công nghệ Bưu chính Viễn thông.</span>
          <span>Tạo bởi Phạm Hà Thắng</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
