import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CircleAlert,
  Download,
  Palette,
  Save,
  Trash2,
} from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TitleInput from "../../components/ui/TitleInput";
import StepProgress from "../../components/ui/StepProgress";
import ProfileInfoForm from "../../components/ui/ProfileInfoForm";
import ContactInfoForm from "../../components/ui/ContactInfoForm";
import WorkExperienceForm from "../../components/ui/WorkExperienceForm";
import EducationDetailsForm from "../../components/ui/EducationDetailsForm";
import SkillsInfoForm from "../../components/ui/SkillsInfoForm";
import ProjectsDetailsForm from "../../components/ui/ProjectsDetailsForm";
import CertificationInfoForm from "../../components/ui/CertificationInfoForm";
import AdditionalInfoForm from "../../components/ui/AdditionalInfoForm";
import RenderResume from "../../components/ui/RenderResume";
import { uploadImage } from "../../utils/upload";
import {
  captureElementAsImage,
  dataUrltoFile,
  fixTailwindColors,
} from "../../utils/helper";
import { RESUME_TEMPLATES, THEME_COLOR_PALETTES } from "../../utils/data";
import Modal from "../../components/ui/Modal";
import ThemeSelector from "../../components/ui/ThemeSelector";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
const defaultTemplate = {
  theme: RESUME_TEMPLATES[0].id,
  colorPalette: THEME_COLOR_PALETTES.themeOne[0],
};
const STEP_FLOW = [
  { value: "profile-info", label: "Hồ sơ cá nhân" },
  { value: "contact-info", label: "Liên hệ" },
  { value: "work-experience", label: "Kinh nghiệm" },
  { value: "education", label: "Học vấn" },
  { value: "skills", label: "Kỹ năng" },
  { value: "projects", label: "Dự án" },
  { value: "certifications", label: "Chứng chỉ" },
  { value: "additionalInfo", label: "Thông tin thêm" },
];
const EditResume = () => {
  useDocumentTitle("Chỉnh sửa CV");
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [previewWidth, setPreviewWidth] = useState(800);
  const [initialTemplate, setInitialTemplate] = useState(defaultTemplate);
  const handleSelectStep = (event) => {
    const nextPage = event.target.value;
    setCurrentPage(nextPage);
    const stepIndex = STEP_FLOW.findIndex((step) => step.value === nextPage);
    if (stepIndex >= 0) {
      const percent = Math.round((stepIndex / (STEP_FLOW.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const updatePreviewWidth = () => {
    if (resumeDownloadRef.current) {
      setPreviewWidth(resumeDownloadRef.current.clientWidth);
    }
  };
  useEffect(() => {
    if (openPreviewModal) {
      setTimeout(updatePreviewWidth, 0);
      window.addEventListener("resize", updatePreviewWidth);
      return () => {
        window.removeEventListener("resize", updatePreviewWidth);
      };
    }
  }, [openPreviewModal]);
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: "",
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    interest: "",
    templates: defaultTemplate,
  });
  const [errorMsg, setErrorMsg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpenThemeSelector = () => {
    setInitialTemplate(resumeData.template ?? defaultTemplate);
    setOpenThemeSelector(true);
  };

  const handleCloseThemeSelector = () => {
    setResumeData((prev) => ({ ...prev, template: initialTemplate }));
    setOpenThemeSelector(false);
  };

  const handleApplyTheme = (nextTemplate) => {
    setResumeData((prev) => ({ ...prev, template: nextTemplate }));
    setOpenThemeSelector(false);
  };
  const validateAndNext = () => {
    const errors = [];
    switch (currentPage) {
      case "profile-info": {
        const { fullName, designation, summary } = resumeData.profileInfo;
        if (!fullName.trim()) errors.push("Vui lòng nhập họ và tên.");
        if (!designation.trim()) errors.push("Vui lòng nhập chuyên môn.");
        if (!summary.trim()) errors.push("Vui lòng nhập tóm tắt bản thân.");
        break;
      }
      case "contact-info": {
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          errors.push("Vui lòng nhập email hợp lệ.");
        if (!phone.trim()) errors.push("Vui lòng nhập số điện thoại hợp lệ.");
        break;
      }
      case "work-experience":
        resumeData.workExperience.forEach(
          ({ company, role, startDate, endDate, description }, index) => {
            if (!company.trim())
              errors.push(
                `Vui lòng nhập tên công ty cho kinh nghiệm làm việc #${
                  index + 1
                }.`
              );
            if (!role.trim())
              errors.push(
                `Vui lòng nhập vị trí cho kinh nghiệm làm việc #${index + 1}.`
              );
            if (!startDate.trim() || !endDate.trim())
              errors.push(
                `Vui lòng nhập ngày bắt đầu và kết thúc cho kinh nghiệm làm việc #${
                  index + 1
                }.`
              );
            if (!description.trim())
              errors.push(
                `Vui lòng nhập mô tả cho kinh nghiệm làm việc #${index + 1}.`
              );
          }
        );
        break;
      case "education-info":
        resumeData.education.forEach(
          ({ institution, degree, startDate, endDate }, index) => {
            if (!degree.trim())
              errors.push(
                `Vui lòng nhập loại bằng cấp cho mục học vấn #${index + 1}.`
              );
            if (!institution.trim())
              errors.push(
                `Vui lòng nhập cơ sở giáo dục cho mục học vấn #${index + 1}.`
              );
            if (!startDate.trim() || !endDate.trim())
              errors.push(
                `Vui lòng nhập ngày bắt đầu và kết thúc cho mục học vấn #${
                  index + 1
                }.`
              );
          }
        );
        break;
      case "skills":
        resumeData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim())
            errors.push(`Vui lòng nhập tên kỹ năng cho kỹ năng #${index + 1}.`);
          if (progress < 0 || progress > 100)
            errors.push(
              `Vui lòng chọn mức độ thành thạo cho kỹ năng #${index + 1}.`
            );
        });
        break;
      case "projects":
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim())
            errors.push(`Vui lòng nhập tên cho dự án #${index + 1}.`);
          if (!description.trim())
            errors.push(`Vui lòng nhập mô tả cho dự án #${index + 1}.`);
        });
        break;
      case "certifications":
        resumeData.certifications.forEach(({ title, issuer, year }, index) => {
          if (!title.trim())
            errors.push(`Vui lòng nhập tiêu đề cho chứng chỉ #${index + 1}.`);
          if (!issuer.trim())
            errors.push(
              `Vui lòng nhập người/tổ chức cấp cho chứng chỉ #${index + 1}.`
            );
          if (!year.trim())
            errors.push(`Vui lòng nhập năm cho chứng chỉ #${index + 1}.`);
        });
        break;
      case "additionalInfo":
        if (
          resumeData.languages.length === 0 ||
          resumeData.languages[0].name?.trim() === ""
        ) {
          errors.push("Vui lòng thêm ít nhất một ngôn ngữ.");
        }
        if (resumeData.interest?.trim() === "") {
          errors.push("Vui lòng mô tả sở thích.");
        }
        break;
      default:
        break;
    }
    if (errors.length > 0) {
      setErrorMsg(errors);
      return;
    }
    setErrorMsg([]);
    goToNextStep();
  };
  const goToNextStep = () => {
    const currentIndex = STEP_FLOW.findIndex(
      (step) => step.value === currentPage
    );
    if (currentPage === "additionalInfo") {
      setOpenPreviewModal(true);
    }
    if (currentIndex !== -1 && currentIndex < STEP_FLOW.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(STEP_FLOW[nextIndex].value);
      const percent = Math.round((nextIndex / (STEP_FLOW.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const goBack = () => {
    const currentIndex = STEP_FLOW.findIndex(
      (step) => step.value === currentPage
    );
    if (currentPage === "profile-info") {
      navigate(-1);
      return;
    }
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(STEP_FLOW[prevIndex].value);
      const percent = Math.round((prevIndex / (STEP_FLOW.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) =>
              updateSection("profileInfo", key, value)
            }
          />
        );
      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) =>
              updateSection("contactInfo", key, value)
            }
          />
        );
      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("workExperience", index)
            }
            updateArrayItem={(index, key, value) =>
              updateArrayItem("workExperience", index, key, value)
            }
          />
        );
      case "education":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("education", index, key, value)
            }
          />
        );
      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("skills", index, key, value)
            }
          />
        );
      case "projects":
        return (
          <ProjectsDetailsForm
            projectsInfo={resumeData?.projects}
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("projects", index, key, value)
            }
          />
        );
      case "certifications":
        return (
          <CertificationInfoForm
            certificationsInfo={resumeData?.certifications}
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("certifications", index)
            }
            updateArrayItem={(index, key, value) =>
              updateArrayItem("certifications", index, key, value)
            }
          />
        );
      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData?.languages}
            interest={resumeData?.interest}
            updateArrayItem={(section, index, key, value) =>
              updateArrayItem(section, index, key, value)
            }
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) =>
              removeArrayItem(section, index)
            }
            setInterest={(value) =>
              setResumeData((prevData) => ({
                ...prevData,
                interest: value,
              }))
            }
          />
        );
      default:
        return null;
    }
  };
  const updateSection = (section, key, value) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: value,
      },
    }));
  };
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prevData) => {
      const updatedArray = [...prevData[section]];
      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        };
      }
      return {
        ...prevData,
        [section]: updatedArray,
      };
    });
  };
  const addArrayItem = (section, newItem) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], newItem],
    }));
  };
  const removeArrayItem = (section, index) => {
    setResumeData((prevData) => {
      const updatedArray = [...prevData[section]];
      updatedArray.splice(index, 1);
      return {
        ...prevData,
        [section]: updatedArray,
      };
    });
  };
  const fetchResumeDetailsById = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.RESUMES.GET_RESUME_BY_ID(resumeId)
      );
      if (
        response.status === 200 &&
        response.data &&
        response.data?.resume?.profileInfo
      ) {
        const resumeInfo = response.data.resume;
        const fetchedTemplate = resumeInfo?.template || {};
        const safeTemplate = {
          theme: fetchedTemplate.theme || defaultTemplate.theme,
          colorPalette:
            Array.isArray(fetchedTemplate.colorPalette) &&
            fetchedTemplate.colorPalette.length > 0
              ? fetchedTemplate.colorPalette
              : defaultTemplate.colorPalette,
        };
        setResumeData((prevData) => ({
          ...prevData,
          title: resumeInfo?.title || "Untitled",
          template: safeTemplate,
          profileInfo: resumeInfo?.profileInfo || prevData?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevData?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevData?.workExperience,
          education: resumeInfo?.education || prevData?.education,
          skills: resumeInfo?.skills || prevData?.skills,
          projects: resumeInfo?.projects || prevData?.projects,
          certifications:
            resumeInfo?.certifications || prevData?.certifications,
          languages: resumeInfo?.languages || prevData?.languages,
          interest: resumeInfo?.interest || prevData?.interest,
        }));
      }
    } catch (error) {
      console.error("Error fetching resume details:", error);
      toast.error("Đã có lỗi xảy ra khi tải chi tiết CV.");
    } finally {
      setIsLoading(false);
    }
  };
  const uploadResumeImages = async () => {
    const loadingToast = toast.loading("Đang lưu CV...");
    try {
      setIsLoading(true);
      let thumbnailUrl = "";
      if (resumeRef.current) {
        fixTailwindColors(resumeRef.current);
        const imageDataUrl = await captureElementAsImage(resumeRef.current);
        const thumbnailFile = dataUrltoFile(
          imageDataUrl,
          `resume-${resumeId}-${Date.now()}.png`
        );
        try {
          toast.loading("Đang tải ảnh xem trước...", { id: loadingToast });
          const res = await uploadImage(thumbnailFile);

          if (!res?.imageUrl) {
            throw new Error("Upload thumbnail thất bại");
          }

          thumbnailUrl = res.imageUrl;
        } catch (error) {
          console.error("Error uploading thumbnail:", error);
          toast.error("Không thể tải ảnh xem trước", { id: loadingToast });
          setIsLoading(false);
          return;
        }
      }
      let profileImageUrl = resumeData?.profileInfo?.profilePreviewUrl || "";
      const profileImageFile = resumeData?.profileInfo?.profileImg;
      const isNewProfileImage = profileImageFile instanceof File;
      if (isNewProfileImage) {
        try {
          toast.loading("Đang tải ảnh đại diện...", { id: loadingToast });
          const res = await uploadImage(profileImageFile);

          if (!res?.imageUrl) {
            throw new Error("Upload ảnh đại diện thất bại");
          }

          profileImageUrl = res.imageUrl;
        } catch (error) {
          console.error("Error uploading profile image:", error);
          toast.error("Không thể tải ảnh đại diện", { id: loadingToast });
          setIsLoading(false);
          return;
        }
      } else if (
        typeof resumeData?.profileInfo?.profilePreviewUrl === "string" &&
        resumeData?.profileInfo?.profilePreviewUrl.startsWith("http")
      ) {
        profileImageUrl = resumeData.profileInfo.profilePreviewUrl;
      }

      toast.loading("Đang lưu CV...", { id: loadingToast });
      await updateResumeDetails({
        thumbnailUrl,
        profileImageUrl,
      });

      toast.success("Lưu CV thành công!", { id: loadingToast });
    } catch (error) {
      console.error("Error in uploadResumeImages:", error);
      toast.error(error.message || "Đã có lỗi xảy ra khi lưu CV", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const updateResumeDetails = async ({ thumbnailUrl, profileImageUrl }) => {
    try {
      const updateData = {
        ...resumeData,
        thumbnailLink: thumbnailUrl || resumeData.thumbnailLink || "",
        profileInfo: {
          ...resumeData.profileInfo,
          profilePreviewUrl:
            profileImageUrl || resumeData.profileInfo.profilePreviewUrl || "",
        },
      };

      const response = await axiosInstance.put(
        API_PATHS.RESUMES.UPDATE_RESUME(resumeId),
        updateData
      );

      if (response.status === 200) {
        setResumeData((prev) => ({
          ...prev,
          thumbnailLink: thumbnailUrl || prev.thumbnailLink,
          profileInfo: {
            ...prev.profileInfo,
            profilePreviewUrl:
              profileImageUrl || prev.profileInfo.profilePreviewUrl,
            profileImg: null,
          },
        }));
        return response.data;
      } else {
        throw new Error("Cập nhật CV thất bại");
      }
    } catch (error) {
      console.error("Error updating resume details:", error);
      throw new Error(error.response?.data?.message || "Không thể cập nhật CV");
    }
  };
  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.delete(
        API_PATHS.RESUMES.DELETE_RESUME(resumeId)
      );
      if (response.status === 200) {
        toast.success("Xóa CV thành công!");
        navigate("/resume-builder");
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Đã có lỗi xảy ra khi xóa CV.");
    } finally {
      setIsLoading(false);
    }
  };
  const reactToPrintFn = useReactToPrint({
    contentRef: resumeDownloadRef,
  });
  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    if (resumeId) {
      fetchResumeDetailsById(resumeId);
    }
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="min-h-screen pb-20">
        <div className="container mx-auto pt-20 md:pt-24 px-2 sm:px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-5 bg-white rounded-lg border border-primary-100 py-3 px-3 md:px-4 mb-4">
            <TitleInput
              title={resumeData.title}
              setTitle={(value) =>
                setResumeData({ ...resumeData, title: value })
              }
            />

            <div className="flex items-center gap-2 md:gap-4 flex-wrap w-full md:w-auto">
              <button
                className="px-2 md:px-3 py-2 cursor-pointer flex items-center gap-1 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 font-medium text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={handleOpenThemeSelector}>
                <Palette className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:block">Theme</span>
              </button>
              <button
                className="px-2 md:px-3 py-2 cursor-pointer flex items-center gap-1 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 font-medium text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={handleDeleteResume}>
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:block">Xóa</span>
              </button>
              <button
                className="px-2 md:px-3 py-2 cursor-pointer flex items-center gap-1 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 font-medium text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={() => setOpenPreviewModal(true)}>
                <Download className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:block">Tải</span>
              </button>
              <button
                className="px-2 md:px-3 py-2 cursor-pointer flex items-center gap-1 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 font-medium text-xs md:text-sm whitespace-nowrap"
                onClick={uploadResumeImages}
                disabled={isLoading}>
                <Save className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">
                  {isLoading ? "Đang lưu..." : "Lưu"}
                </span>
              </button>
              <button
                className="px-2 md:px-3 py-2 cursor-pointer flex items-center gap-1 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 font-medium text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:block">Thoát</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-5 pb-10">
            <div className="bg-white rounded-lg border border-primary-100 p-3 md:p-4">
              <div className="flex flex-col gap-3">
                <StepProgress progress={progress} />
                <select
                  value={currentPage}
                  onChange={handleSelectStep}
                  className="w-full rounded-md border border-primary-100 px-3 py-2 text-xs md:text-sm outline-none focus:border-primary-500 cursor-pointer">
                  {STEP_FLOW.map((step) => (
                    <option key={step.value} value={step.value}>
                      {step.label}
                    </option>
                  ))}
                </select>
              </div>
              {renderForm()}
              <div className="mx-5 ">
                {errorMsg.length > 0 && (
                  <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
                    <ul className="space-y-1 text-sm font-medium text-amber-700 ">
                      {errorMsg.map((msg, index) => (
                        <li key={index} className="flex items-center ">
                          <CircleAlert className="w-4 h-4 mr-2" /> {msg}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-end gap-2 sm:gap-3 mt-5 mb-5">
                  <button
                    className="px-3 py-2 cursor-pointer flex items-center justify-center gap-1 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 font-medium text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={goBack}
                    disabled={isLoading}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    className="px-3 py-2 cursor-pointer flex items-center justify-center gap-1 bg-linear-to-r from-primary-500 via-primary-600 to-primary-700 text-white rounded-md hover:bg-gradient-to-br font-medium text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={validateAndNext}
                    disabled={isLoading}>
                    {currentPage === "additionalInfo" && (
                      <Download className="w-4 h-4" />
                    )}
                    <span>
                      {currentPage === "additionalInfo"
                        ? "Xem trước & Tải"
                        : "Tiếp tục"}
                    </span>
                    {currentPage !== "additionalInfo" && (
                      <ArrowLeft className="rotate-180 w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div
              ref={resumeRef}
              className="bg-white rounded-lg border border-primary-100 shadow-sm overflow-hidden">
              <RenderResume
                templateId={resumeData?.template?.theme || ""}
                resumeData={resumeData}
                colorPalette={resumeData?.template?.colorPalette || []}
                containerWidth={baseWidth}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openThemeSelector}
        onClose={handleCloseThemeSelector}
        title="Chọn Theme CV">
        <div className="w-[95vw] sm:w-[90vw] h-[85vh] sm:h-[80vh]">
          <ThemeSelector
            key={
              openThemeSelector
                ? `${initialTemplate.theme}-${initialTemplate.colorPalette.join(
                    "-"
                  )}`
                : "theme-selector"
            }
            selectedTheme={resumeData?.template || initialTemplate}
            onApply={handleApplyTheme}
            resumeData={null}
          />
        </div>
      </Modal>
      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData?.title || "Xem trước CV"}
        showActionBtn
        actionBtnText="Tải"
        onActionBtnClick={() => reactToPrintFn()}
        actionBtnIcon={<Download size={18} />}>
        <div
          className="w-auto h-[85vh] sm:h-[90vh] flex justify-center"
          ref={resumeDownloadRef}>
          <RenderResume
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette || []}
            containerWidth={previewWidth}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditResume;
