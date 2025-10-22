import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TitlePage from "../../components/ui/TitlePage";
import { formatDate } from "../../utils/format";
import SummaryCard from "../../components/ui/SummaryCard";
import Modal from "../../components/ui/Modal";
import CreateSessionForm from "../../components/ui/CreateSessionForm";
import DeleteAlertContent from "../../components/ui/DeleteAlertContent";
import toast from "react-hot-toast";
const InterviewPrepDashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fetchAllSessions = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_MY_SESSIONS
      );
      if (response.status === 200) {
        setSessions(response.data.sessions);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteSession = async (sessionData) => {
    try {
      setIsDeleting(true);
      const response = await axiosInstance.delete(
        API_PATHS.SESSION.DELETE_SESSION(sessionData._id)
      );
      if (response.status === 200) {
        fetchAllSessions();
        setOpenDeleteAlert({ open: false, data: null });
        toast.success("Xóa buổi chuẩn bị phỏng vấn thành công.");
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Lỗi khi xóa buổi chuẩn bị phỏng vấn."
      );
    } finally {
      setIsDeleting(false);
    }
  };
  useEffect(() => {
    fetchAllSessions();
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="min-h-screen mt-16">
        <div className="conatainer mx-auto pt-4 pb-4">
          <TitlePage
            title="Chuẩn bị phỏng vấn cùng AI"
            description="Nâng cao kỹ năng phỏng vấn của bạn với các buổi mô phỏng phỏng
                  vấn do AI hỗ trợ."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
            {sessions?.map((data, index) => (
              <SummaryCard
                key={`session-card-${index}`}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || ""}
                questions={data?.questions.length || []}
                description={data?.description || ""}
                lastUpdated={formatDate(data?.updatedAt)}
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data: data })}
              />
            ))}
          </div>
          <button
            disabled={isLoading}
            className="
              h-12  flex items-center justify-center gap-3 px-7 py-2.5 bg-linear-to-r from-primary-500 to-primary-600 text-sm text-white font-semibold rounded-full shadow-md ransition-all duration-200 cursor-pointer mx-auto hover:shadow-xl hover:shadow-primary-300
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:bg-linear-to-br fixed bottom-8 md:bottom-10 right-8 md:right-10
              "
            onClick={() => setOpenCreateModal(true)}>
            <Plus size={24} />
            Thêm mới
          </button>
        </div>
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader>
        <CreateSessionForm />
      </Modal>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Xóa buổi chuẩn bị phỏng vấn">
        <div className="w-[80vw] md:w-[40vw] ">
          <DeleteAlertContent
            isLoading={isDeleting}
            content="Bạn có chắc chắn muốn xóa buổi chuẩn bị phỏng vấn này không?"
            onDelete={() => deleteSession(openDeleteAlert?.data)}
          />
        </div>
      </Modal>
    </>
  );
};

export default InterviewPrepDashboard;
