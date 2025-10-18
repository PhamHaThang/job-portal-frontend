export const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GET_USER_INFO: "/auth/me",
    UPDATE_PROFILE: "/user/profile",
    GET_PUBLIC_PROFILE: (userId) => `/user/profile/${userId}`,
    DELETE_RESUME: "/user/resume", // JOBSEEKER
    CHANGE_PASSWORD: "/user/change-password",
    FORGET_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  DASHBOARD: {
    OVERVIEW: "/analytics/overview", // EMPLOYER
  },
  UPLOAD: {
    IMAGE: "/upload/image",
    PDF: "/upload/pdf",
    DELETE_FILE: "/upload/delete",
  },
  JOBS: {
    GET_ALL_JOBS: "/jobs",
    GET_JOB_BY_ID: (jobId) => `/jobs/${jobId}`,
    POST_JOB: "/jobs",
    GET_JOBS_EMPLOYER: "/jobs/employer", // EMPLOYER
    UPDATE_JOB: (jobId) => `/jobs/${jobId}`, // EMPLOYER
    DELETE_JOB: (jobId) => `/jobs/${jobId}`, // EMPLOYER
    TOGGLE_CLOSE: (jobId) => `/jobs/${jobId}/toggle-close`, // EMPLOYER

    SAVE_JOB: (jobId) => `/saved-jobs/${jobId}`, // JOBSEEKER
    UNSAVE_JOB: (jobId) => `/saved-jobs/${jobId}`, // JOBSEEKER
    GET_SAVED_JOBS: "/saved-jobs/my", // JOBSEEKER
  },
  APPLICATIONS: {
    APPLY_JOB: (jobId) => `/applications/${jobId}`,
    GET_MY_APPLICATIONS: "/applications/my", // JOBSEEKER
    GET_APPLICATIONS_FOR_JOB: (jobId) => `/applications/job/${jobId}`, // EMPLOYER
    GET_APPLICATION_BY_ID: (applicationId) => `/applications/${applicationId}`,
    UPDATE_APPLICATION_STATUS: (applicationId) =>
      `/applications/${applicationId}/status`, // EMPLOYER
  },
};
