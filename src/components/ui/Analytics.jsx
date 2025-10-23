import { Briefcase, Target, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
const Analytics = () => {
  const stats = [
    {
      icon: Users,
      title: "Người dùng",
      value: "2.4M+",
      growth: "+15%",
      color: "blue",
    },
    {
      icon: Briefcase,
      title: "Công việc",
      value: "150K+",
      growth: "+20%",
      color: "purple",
    },
    {
      icon: Target,
      title: "Tuyển dụng thành công",
      value: "89K+",
      growth: "+18%",
      color: "green",
    },
    {
      icon: TrendingUp,
      title: "Tỷ lệ phù hợp",
      value: "94%",
      growth: "+8%",
      color: "orange",
    },
  ];
  const statColors = {
    blue: {
      icon: "text-blue-600",
      bg: "bg-blue-100",
    },
    purple: {
      icon: "text-purple-600",
      bg: "bg-purple-100",
    },
    green: {
      icon: "text-green-600",
      bg: "bg-green-100",
    },
    orange: {
      icon: "text-orange-600",
      bg: "bg-orange-100",
    },
  };
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary-900">
            Phân tích{" "}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Nền tảng
            </span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Thông tin chi tiết theo thời gian thực về người dùng, công việc và
            xu hướng
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-secondary-100 hover:shadow-xl transition-all  duration-300">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                    statColors[stat.color].bg
                  }`}>
                  <stat.icon
                    className={`w-6 h-6 ${statColors[stat.color]?.icon}`}
                  />
                </div>
                <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
                  {stat.growth}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-secondary-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-secondary-600">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
