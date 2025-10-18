const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div className="relative w-5 h-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer appearance-none w-5 h-5 border border-gray-300 rounded-md checked:bg-primary-600 transition-all duration-200"
        />
        <svg
          className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
};

export default CustomCheckbox;
