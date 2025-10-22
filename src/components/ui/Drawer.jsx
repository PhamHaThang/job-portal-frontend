import { X } from "lucide-react";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`
        fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)]
        p-4 overflow-y-auto w-full md:w-[40vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out shadow-primary-800/10 border-r border-l-gray-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }
    `}
      tabIndex="-1"
      aria-labelledby="drawer-right-label">
      <div className="flex items-center justify-between mb-4">
        <h5
          id="drawer-right-label"
          className="
        flex items-center text-base font-semibold text-gray-900">
          {title}
        </h5>
        <button
          type="button"
          onClick={onClose}
          className="text-sm w-8 h-8 inline-flex items-center justify-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 cursor-pointer">
          <X size={18} />
        </button>
      </div>
      <div className="text-sm mx-3 mb-6">{children}</div>
    </div>
  );
};

export default Drawer;
