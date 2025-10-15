import { ChevronDown } from "lucide-react";

const SelectField = ({
  label,
  id,
  value,
  onChange,
  options = [],
  placeholder,
  error,
  required = false,
  disabled = false,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full ${
              Icon ? "pl-10" : "pl-3"
            } pr-10 py-2.5 border rounded-lg text-base transition-colors
                duration-200
                disabled:bg-gray-50 
                disabled:text-gray-500              disabled:cursor-not-allowed
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:border-ring-red-500"
                : "border-gray-300 focus:border-primary-500 focus:ring-primary-400"
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-20 appearance-none bg-white
          `}
          {...props}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
          <ChevronDown className="h-5 text-gray-400 w-5" />
        </div>
      </div>
      {error && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span> {error}</span>
        </div>
      )}
    </div>
  );
};

export default SelectField;
