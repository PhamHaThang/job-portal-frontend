import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InputField from "../../components/ui/InputField";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
    numberOfQuestions: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus, description } = formData;
    if (!role || !experience || !topicsToFocus) {
      setError("Vui lòng điền tất cả các trường bắt buộc.");
      return;
    }
    setIsLoading(true);
    setError("");
    const loadingToastId = "creating-session";
    try {
      toast.loading("Đang tạo buổi luyện tập...", { id: loadingToastId });
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 5,
        }
      );
      if (aiResponse.status === 201) {
        const questions = aiResponse.data.questions;
        const response = await axiosInstance.post(
          API_PATHS.SESSION.CREATE_SESSION,
          {
            role,
            experience,
            topicsToFocus,
            description,
            questions,
          }
        );
        if (response.status === 201 && response.data?.session?._id) {
          toast.success("Tạo buổi luyện tập thành công!", {
            id: loadingToastId,
          });
          navigate(`/interview-prep/${response.data?.session?._id}`);
        }
      }
    } catch (err) {
      console.error("Error creating session:", err);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.", {
        id: loadingToastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[80vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Tạo buổi luyện tập phỏng vấn mới
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Điền thông tin dưới đây để tạo buổi luyện tập phỏng vấn do AI hỗ trợ.
      </p>
      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <InputField
          label="Vị trí ứng tuyển"
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          placeholder="Nhập vị trí bạn đang ứng tuyển"
          required
        />
        <InputField
          label="Kinh nghiệm làm việc"
          value={formData.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          placeholder="Nhập số năm kinh nghiệm của bạn"
          required
          type="number"
        />
        <InputField
          label="Chủ đề trọng tâm"
          value={formData.topicsToFocus}
          onChange={(e) => handleChange("topicsToFocus", e.target.value)}
          placeholder="Nhập các chủ đề bạn muốn tập trung"
          required
        />
        <InputField
          label="Mô tả buổi luyện tập"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Thêm mô tả cho buổi luyện tập (tùy chọn)"
        />
        <InputField
          label="Số câu hỏi"
          value={formData.numberOfQuestions}
          onChange={(e) => handleChange("numberOfQuestions", e.target.value)}
          placeholder="Nhập số câu hỏi bạn muốn (mặc định là 5)"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="
          mt-2
          w-full
          bg-primary-600
          hover:bg-primary-700
          text-white
          font-medium
          py-2.5
          rounded-lg
          transition-colors
          duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-primary-400
          focus:ring-opacity-50
          cursor-pointer
          disabled:opacity-50
          disabled:cursor-not-allowed
          flex
          justify-center
          items-center
          gap-2"
          disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Đang tạo...</span>
            </>
          ) : (
            <span>Tạo buổi luyện tập</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
