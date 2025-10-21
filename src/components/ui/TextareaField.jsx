import { AlertCircle } from "lucide-react";

const TextareaField = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disable = false,
  rows = 6,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disable}
        rows={rows}
        className={`
            w-full
            px-3 py-2.5 border rounded-lg text-base   transition-colors 
             duration-200
              resize-y disabled:bg-gray-50
                disabled:text-gray-500              disabled:cursor-not-allowed
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:border-ring-red-500"
                : "border-gray-300 focus:border-primary-500 focus:ring-primary-400"
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-20 `}
        style={{ minHeight: "150px" }}
        {...props}></textarea>
      {error && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span> {error}</span>
        </div>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default TextareaField;
