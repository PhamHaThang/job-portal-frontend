import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { CirclePlus } from "lucide-react";
import ResumeSummaryCard from "../../components/ui/ResumeSummaryCard";
import { formatDate } from "../../utils/format";
import Modal from "../../components/ui/Modal";
import CreateResumeForm from "../../components/ui/CreateResumeForm";
const ResumeDashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);
  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUMES.GET_MY_RESUMES
      );
      if (response.status === 200) {
        setAllResumes(response.data.resumes);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };
  useEffect(() => {
    fetchAllResumes();
  }, []);
  return (
    <div className="pt-24 min-h-screen">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200 border border-white/20 p-4 lg:p-8 mb-6 lg:mb-8">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="text-center ">
            <h1 className="text-2xl lg:text-2xl font-semibold text-gray-900 mb-2">
              Tạo mới CV của bạn
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              Tạo CV chuyên nghiệp theo cách của bạn để ứng tuyển vào các vị trí
              mơ ước.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-6 px-4 md:px-0 md:gap-7">
        <div
          className="h-[300px] flex flex-col justify-center items-center gap-5 bg-white border  border-primary-100 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50/5"
          onClick={() => setOpenCreateModal(true)}>
          <div className="w-12 h-12 flex items-center justify-center bg-primary-200/60 rounded-2xl">
            <CirclePlus className="text-xl text-primary-500" />
          </div>
          <h3 className="font-medium text-gray-800">Thêm mới</h3>
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
