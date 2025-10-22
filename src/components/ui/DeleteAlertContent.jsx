import { Loader } from "lucide-react";

const DeleteAlertContent = ({ content, onDelete, isLoading }) => {
  return (
    <div className="p-5">
      <p className="text-sm font-medium">{content}</p>
      <button
        type="button"
        disabled={isLoading}
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
          gap-2"
        onClick={onDelete}>
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Đang xóa...</span>
          </>
        ) : (
          <span>Xóa</span>
        )}
      </button>
    </div>
  );
};

export default DeleteAlertContent;
