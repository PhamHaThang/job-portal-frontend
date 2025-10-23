import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { CirclePlus } from "lucide-react";
import ResumeSummaryCard from "../../components/ui/ResumeSummaryCard";
import { formatDate } from "../../utils/format";
import Modal from "../../components/ui/Modal";
import CreateResumeForm from "../../components/ui/CreateResumeForm";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import TitlePage from "../../components/ui/TitlePage";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
const ResumeDashboard = () => {
  useDocumentTitle("Tạo CV");
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAllResumes = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.RESUMES.GET_MY_RESUMES
      );
      if (response.status === 200) {
        setAllResumes(response.data.resumes);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllResumes();
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="pt-20 md:pt-24 min-h-screen px-2 sm:px-4 pb-8">
      <TitlePage
        title="Tạo mới CV của bạn"
        description="Tạo CV chuyên nghiệp theo cách của bạn để ứng tuyển vào các vị trí mơ ước."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 pb-4 md:pb-6">
        <div
          className="h-[250px] md:h-[300px] flex flex-col justify-center items-center gap-4 md:gap-5 bg-white border border-primary-100 rounded-lg md:rounded-xl cursor-pointer hover:border-primary-300 hover:bg-primary-50/5 transition-all"
          onClick={() => setOpenCreateModal(true)}>
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary-200/60 rounded-xl md:rounded-2xl">
            <CirclePlus className="text-lg md:text-xl text-primary-500" />
          </div>
          <h3 className="font-medium text-sm md:text-base text-gray-800">
            Thêm mới
          </h3>
        </div>
        {allResumes?.map((resume) => (
          <ResumeSummaryCard
            key={resume?._id}
            imgUrl={resume.thumbnailLink || null}
            title={resume.title || "CV không tiêu đề"}
            lastUpdated={resume?.updatedAt ? formatDate(resume.updatedAt) : ""}
            onSelect={() => navigate(`/resume-builder/${resume?._id}`)}
          />
        ))}
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader>
        <div>
          <CreateResumeForm />
        </div>
      </Modal>
    </div>
  );
};

export default ResumeDashboard;
