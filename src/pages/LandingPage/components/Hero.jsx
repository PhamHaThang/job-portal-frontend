import { ArrowRight, Building2, Search, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Hero = () => {
  const isAuthenticated = true;
  const user = { fullName: "John Doe", role: "employer" };
  const navigate = useNavigate();
  const stats = [
    { icon: Users, label: "Người dùng", value: "2.4M+" },
    { icon: Building2, label: "Doanh nghiệp", value: "800+" },
    { icon: TrendingUp, label: "Công việc", value: "5,000+" },
  ];
  return (
    <section className="pt-24 pb-16 bg-white min-h-screen flex items-center">
      <div className=" container mx-auto px-4">
        <div className="maxw4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-secondary-900 leading-tigh pt-10">
            Tìm kiếm việc làm mơ ước hoặc
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mt-2 pb-2">
              Tuyển dụng nhân tài
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-xl text-secondary-600 mb-12 max-w-2xl mx-auto leading-relaxed ">
            Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu. Tìm
            kiếm, ứng tuyển và phát triển sự nghiệp của bạn ngay hôm nay!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16 items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all font-semibold text-lg duration-300 shadow-lg hover:shadow-xl space-x-2 cursor-pointer"
              onClick={() => navigate("/find-jobs")}>
              <Search className="w-5 h-5" />
              <span>Tìm việc</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border-2 border-secondary-200 text-secondary-700 px-8 py-4 rounded-xl  font-semibold text-lg duration-300 shadow-sm hover:border-secondary-300  hover:bg-secondary-50 transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() =>
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                )
              }>
              Đăng tin
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + index * 0.1,
                }}
                className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-secondary-50 transition-color">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl mb-2 ">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-secondary-900">
                  {stat.value}
                </div>
                <div className="text-sm text-secondary-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full blur-3xl opacity-20" />
      </div>
    </section>
  );
};

export default Hero;
