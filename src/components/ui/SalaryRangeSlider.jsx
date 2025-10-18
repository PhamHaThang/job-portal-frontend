import { useState } from "react";
import { formatNumber } from "../../utils/format";
const SalaryRangeSlider = ({ filters, handleFilterChange }) => {
  const [minSalary, setMinSalary] = useState(filters?.minSalary || 0);
  const [maxSalary, setMaxSalary] = useState(filters?.maxSalary || 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lương tối thiểu
          </label>
          <input
            type="number"
            placeholder="0"
            min="0"
            step="1000"
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-md focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:border-primary-300"
            value={minSalary || ""}
            onChange={({ target }) => setMinSalary(target.value)}
            onBlur={() =>
              handleFilterChange(
                "minSalary",
                minSalary ? parseInt(minSalary) : 0
              )
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lương tối đa
          </label>
          <input
            type="number"
            placeholder="∞"
            min="0"
            step="1000"
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-md focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:border-primary-300"
            value={maxSalary || ""}
            onChange={({ target }) => setMaxSalary(target.value)}
            onBlur={() =>
              handleFilterChange(
                "maxSalary",
                maxSalary ? parseInt(maxSalary) : 0
              )
            }
          />
        </div>
      </div>
      {minSalary || maxSalary ? (
        <div className="text-sm text-gray-600 bg-gray-50 py-2 px-3 rounded">
          Khoảng: {minSalary ? `${formatNumber(minSalary)} VND` : "0 VND"} -{" "}
          {maxSalary ? `${formatNumber(maxSalary)} VND` : "∞"}
        </div>
      ) : null}
    </div>
  );
};

export default SalaryRangeSlider;
