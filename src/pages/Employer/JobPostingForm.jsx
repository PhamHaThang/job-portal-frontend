import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Briefcase, DollarSign, Eye, MapPin, Send, Users } from "lucide-react";
import InputField from "../../components/ui/InputField";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import SelectField from "../../components/ui/SelectField";
import TextareaField from "../../components/ui/TextareaField";
import { AlertCircle } from "lucide-react";
import axiosIntance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import JobPostingPreview from "../../components/ui/JobPostingPreview";
const JobPostingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    const jobPayload = {
      title: formData.jobTitle,
      location: formData.location,
      category: formData.category,
      type: formData.jobType,
      description: formData.description,
      requirements: formData.requirements,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,
    };
    try {
      const response = jobId
        ? await axiosIntance.put(API_PATHS.JOBS.UPDATE_JOB(jobId), jobPayload)
        : await axiosIntance.post(API_PATHS.JOBS.POST_JOB, jobPayload);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          jobId
            ? "Cập nhật công việc thành công!"
            : "Đăng tin tuyển dụng thành công!"
        );
        setFormData({
          jobTitle: "",
          location: "",
          category: "",
          jobType: "",
          description: "",
          requirements: "",
          salaryMin: "",
          salaryMax: "",
        });
        navigate("/manage-jobs");
        return;
      }
      console.log("Lỗi khi gửi dữ liệu:", response);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    } catch (error) {
      if (error.response?.data?.message) {
        console.error("Lỗi từ server:", error.response.data.message);
        toast.error(error.response?.data?.message);
      } else {
        console.error("Lỗi khi gửi dữ liệu:", error);
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) return;
      try {
        const response = await axiosIntance.get(
          API_PATHS.JOBS.GET_JOB_BY_ID(jobId)
        );
        if (response.status === 200) {
          const jobData = response.data.job;
          if (jobData) {
            setFormData({
              jobTitle: jobData.title || "",
              location: jobData.location || "",
              category: jobData.category || "",
              jobType: jobData.type || "",
              description: jobData.description || "",
              requirements: jobData.requirements || "",
              salaryMin: jobData.salaryMin || "",
              salaryMax: jobData.salaryMax || "",
            });
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết công việc:", error);
        if (error.response) {
          console.error("Lỗi từ server:", error.response.data.message);
        }
      }
    };
    fetchJobDetails();
  }, [jobId]);
  const validateForm = (formData) => {
    const errors = {};
    if (!formData.jobTitle.trim()) {
      errors.jobTitle = "Tiêu đề công việc là bắt buộc.";
    }
    if (!formData.location.trim() && formData.jobType !== "Remote") {
      errors.location = "Địa điểm là bắt buộc.";
    }
    if (!formData.category) {
      errors.category = "Danh mục là bắt buộc.";
    }
    if (!formData.jobType) {
      errors.jobType = "Kiểu công việc là bắt buộc.";
    }
    if (!formData.description.trim()) {
      errors.description = "Mô tả công việc là bắt buộc.";
    }
    if (!formData.requirements.trim()) {
      errors.requirements = "Yêu cầu công việc là bắt buộc.";
    }
    if (!formData.salaryMin || !formData.salaryMax) {
      errors.salary = "Phạm vi lương là bắt buộc.";
    } else if (parseInt(formData.salaryMin) >= parseInt(formData.salaryMax)) {
      errors.salary = "Lương tối đa phải lớn hơn lương tối thiểu.";
    }

    return errors;
  };
  const isFormValid = () => {
    const validationErrors = validateForm(formData);
    return Object.keys(validationErrors).length === 0;
  };
  if (isPreview) {
    return (
      <>
        <JobPostingPreview formData={formData} setIsPreview={setIsPreview} />
      </>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Đăng tin tuyển dụng mới
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Điền vào biểu mẫu bên dưới để tạo một tin tuyển dụng mới.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPreview(true)}
                  disabled={!isFormValid}
                  className="group flex items-center space-x-2 px-6 py-3 text-sm font-medium  text-gray-600 hover:text-white bg-white/50 
                  hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-600
                  border border-gray-200 hover:border-transparent rounded-xl shadow-lg shadow-gray-100 cursor-pointer hover:shadow-xl  focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5">
                  <Eye className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Xem trước</span>
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <InputField
                label="Tiêu đề công việc"
                id="jobTitle"
                placeholder="Ví dụ: Kỹ sư phần mềm, Thiết kế UX/UI"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                error={errors.jobTitle}
                required
                icon={Briefcase}
              />
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4 sm:items-end space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <InputField
                      label="Địa điểm"
                      id="location"
                      placeholder="Ví dụ: Hà Nội, TP.HCM, Đà Nẵng"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      error={errors.location}
                      icon={MapPin}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Danh mục"
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  options={CATEGORIES}
                  placeholder="Chọn danh mục"
                  error={errors.category}
                  required
                  icon={Users}
                />
                <SelectField
                  label="Kiểu công việc"
                  id="jobType"
                  value={formData.jobType}
                  onChange={(e) => handleInputChange("jobType", e.target.value)}
                  options={JOB_TYPES}
                  placeholder="Chọn kiểu công việc"
                  error={errors.jobType}
                  required
                  icon={Briefcase}
                />
              </div>
              <TextareaField
                label="Mô tả công việc"
                id="description"
                placeholder="Mô tả chi tiết về công việc..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                error={errors.description}
                helperText="Bao gồm các nhiệm vụ, trách nhiệm và mục tiêu của công việc."
                required
              />
              <TextareaField
                label="Yêu cầu công việc"
                id="requirements"
                placeholder="Liệt kê các yêu cầu và kỹ năng cần thiết..."
                value={formData.requirements}
                onChange={(e) =>
                  handleInputChange("requirements", e.target.value)
                }
                error={errors.description}
                helperText="Bao gồm các kỹ năng, kinh nghiệm và trình độ học vấn cần thiết."
                required
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phạm vi lương <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      placeholder="Tối thiểu"
                      value={formData.salaryMin}
                      onChange={(e) =>
                        handleInputChange("salaryMin", e.target.value)
                      }
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-400
                      focus:ring-opacity-20 focus:border-primary-500 transition-colors duration-200"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      placeholder="Tối đa"
                      value={formData.salaryMax}
                      onChange={(e) =>
                        handleInputChange("salaryMax", e.target.value)
                      }
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-400
                      focus:ring-opacity-20 focus:border-primary-500 transition-colors duration-200"
                    />
                  </div>
                </div>
                {errors.salary && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span> {errors.salary}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center  px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white shadow-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-colors duration-200  disabled:opacity-50 disabled:cursor-not-allowed outline-none">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang tải...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      {jobId ? "Cập nhật công việc" : "Đăng tin tuyển dụng"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPostingForm;
