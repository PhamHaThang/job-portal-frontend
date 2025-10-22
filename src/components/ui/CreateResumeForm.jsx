import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InputField from "./InputField";
import { Loader } from "lucide-react";
const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Tiêu đề không được để trống");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        API_PATHS.RESUMES.CREATE_RESUME,
        {
          title: title.trim(),
        }
      );
      if (response.status === 201) {
        const newResumeId = response.data?.resume?._id;
        if (newResumeId) {
          navigate(`/resume-builder/${newResumeId}`);
        }
      }
    } catch (error) {
      console.error("Error creating resume:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        return;
      }
      setError("Đã xảy ra lỗi khi tạo CV. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Tạo CV mới</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Vui lòng nhập tiêu đề cho CV của bạn và nhấn "Tạo CV" để bắt đầu.
      </p>
      <form onSubmit={handleCreateResume}>
        <InputField
          label="Tiêu đề CV"
          id="resume-title"
          placeholder="Nhập tiêu đề cho CV của bạn"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          error={error}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="
          mt-4
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
          gap-2
        ">
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Đang tạo...</span>
            </>
          ) : (
            <span>Tạo CV</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
