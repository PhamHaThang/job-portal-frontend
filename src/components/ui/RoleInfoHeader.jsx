import { CalendarDays, FileQuestion, Target, UserRound } from "lucide-react";
import { motion } from "framer-motion";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastedUpdated,
}) => {
  const questionCount = Array.isArray(questions)
    ? questions.length
    : Number(questions || 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="rounded-2xl border border-primary-100 bg-white px-6 py-5 shadow-sm"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>
      <motion.header
        className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-primary-500">
            Phiên luyện tập
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-gray-900">
            {role || "Chưa xác định vị trí"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {description || "Chưa có mô tả cho phiên luyện tập này."}
          </p>
        </div>
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-xs font-medium text-primary-600"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}>
          <CalendarDays size={14} />
          Cập nhật: {lastedUpdated || "Chưa rõ"}
        </motion.span>
      </motion.header>

      <motion.div
        className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <InfoChip
          icon={UserRound}
          label="Kinh nghiệm"
          value={`${experience || "0"} năm`}
          variants={itemVariants}
        />
        <InfoChip
          icon={Target}
          label="Chủ đề trọng tâm"
          value={topicsToFocus || "Không có"}
          variants={itemVariants}
        />
        <InfoChip
          icon={FileQuestion}
          label="Số câu hỏi"
          value={`${questionCount}`}
          variants={itemVariants}
        />
      </motion.div>
    </motion.section>
  );
};

export default RoleInfoHeader;

const InfoChip = ({ icon: Icon, label, value, variants }) => (
  <motion.div
    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
    variants={variants}>
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-600 shadow">
      <Icon size={18} />
    </span>
    <div className="flex-1">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  </motion.div>
);
