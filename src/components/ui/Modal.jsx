import { X } from "lucide-react";
import { useEffect } from "react";
const Modal = ({
  isOpen,
  onClose,
  hideHeader,
  title,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionBtnClick,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 ${
        isOpen ? "block" : "hidden"
      }`}>
      <div
        className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}>
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
            {showActionBtn && (
              <button
                onClick={() => onActionBtnClick()}
                className=" mr-12 px-4 text-sm py-2 bg-primary-600 text-white rounded-md flex items-center gap-2 cursor-pointer hover:bg-primary-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
          onClick={onClose}>
          <X className="w-4 h-" />
        </button>
        <div className="flex-1 overflow-y-auto custom-scollbar">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
