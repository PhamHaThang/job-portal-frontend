import { Bookmark, Building, Building2, Calendar, MapPin } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import StatusBadge from "./StatusBadge";
import { formatDate, formatSalary } from "../../utils/format";
const JobCard = ({ job, onClick, onToggleSave, onApply, saved, hideApply }) => {
  const { user } = useAuth();

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:shadow-gray-200 cursor-pointer transition-all duration-300 group relative overflow-hidden gap-4 w-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {job?.company?.companyLogo ? (
            <img
              src={job?.company?.companyLogo}
              alt="Company Logo"
              className="w-14 h-14 object-cover rounded-2xl border-4   border-white/20 shadow-lg"
            />
          ) : (
            <div className="w-14 h-14 object-cover rounded-2xl border-2   border-gray-200 shadow-lg bg-gray-50 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-base group-hover:text-primary-600 transition-colors leading-snug">
              {job?.title}
            </h3>
            <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
              <Building className="w-3.5 h-3.5" /> {job?.company?.companyName}
            </p>
          </div>
        </div>
        {user && (
          <button
            className="cursor-pointer p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}>
            <Bookmark
              className={`w-5 h-5 hover:text-primary-600 ${
                job?.isSaved || saved ? "text-primary-600" : "text-gray-400"
              }`}
            />
          </button>
        )}
      </div>
      <div className="mb-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
            <MapPin className="w-3 h-3" /> {job?.location}
          </span>
          <span
            className={`
            px-3 py-1 rounded-full font-medium ${
              job?.type === "Full-time"
                ? "bg-green-100 text-green-800"
                : job?.type === "Part-time"
                ? "bg-yellow-100 text-yellow-800"
                : job?.type === "Contract"
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            }
            `}>
            {job?.type}
          </span>
          <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
            {job?.category}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {job?.createdAt
              ? formatDate(job?.createdAt, "DD/MM/YYYY")
              : "Chưa xác định"}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div
          className="text-primary-600 font-semibold
        text-lg">
          {formatSalary(job?.salaryMin, job?.salaryMax)}
        </div>
        {!saved && (
          <>
            {job?.applicationStatus ? (
              <StatusBadge status={job?.applicationStatus} />
            ) : (
              !hideApply && (
                <button
                  className="bg-gradient-to-r from-primary-50 to-primary-50 text-sm text-primary-500 hover:text-white hover:from-primary-500 hover:to-primary-600 font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-all duration-200 cursor-pointer tranform hover:-translate-y-0.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply();
                  }}>
                  Ứng tuyển
                </button>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
