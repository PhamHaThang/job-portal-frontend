import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const response = await axiosInstance.post(
      API_PATHS.UPLOAD.IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi upload ảnh", error);
    throw error;
  }
};
const uploadPDF = async (pdfFile) => {
  const formData = new FormData();
  formData.append("pdf", pdfFile);
  try {
    const response = await axiosInstance.post(API_PATHS.UPLOAD.PDF, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi upload PDF", error);
    throw error;
  }
};
const deleteFile = async (fileUrl) => {
  try {
    const response = await axiosInstance.delete(API_PATHS.UPLOAD.DELETE_FILE, {
      data: { fileUrl },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi xóa file", error);
    throw error;
  }
};
export { uploadImage, uploadPDF, deleteFile };
