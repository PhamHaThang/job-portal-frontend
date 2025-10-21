import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const MonthYearPicker = ({ label, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const dropdownRef = useRef(null);

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const parseValue = (val) => {
    if (!val) return { month: null, year: null };

    if (val.includes("-")) {
      const [year, month] = val.split("-");
      return { month: parseInt(month), year: parseInt(year) };
    }

    if (val.includes("/")) {
      const [month, year] = val.split("/");
      return { month: parseInt(month), year: parseInt(year) };
    }

    return { month: null, year: null };
  };

  const { month: currentMonth, year: currentYear } = parseValue(value);

  const displayValue =
    currentMonth && currentYear ? `Tháng ${currentMonth}/${currentYear}` : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && currentYear) {
      setSelectedYear(currentYear);
    }
  }, [isOpen, currentYear]);

  const handleMonthSelect = (monthIndex) => {
    const formattedValue = `${selectedYear}-${String(monthIndex + 1).padStart(
      2,
      "0"
    )}`;
    onChange({ target: { value: formattedValue } });
    setIsOpen(false);
  };

  const handleYearChange = (delta) => {
    setSelectedYear((prev) => prev + delta);
  };

  return (
    <div className={`relative ${isOpen ? "z-50" : "z-10"}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 border rounded-lg cursor-pointer transition-all bg-white flex items-center justify-between ${
          isOpen
            ? "border-primary-500 ring-2 ring-primary-500 ring-opacity-20"
            : "border-gray-300 hover:border-primary-500"
        }`}>
        <span className={displayValue ? "text-gray-900" : "text-gray-400"}>
          {displayValue || placeholder || "Chọn tháng/năm"}
        </span>
        <Calendar
          className={`w-4 h-4 transition-colors ${
            isOpen ? "text-primary-500" : "text-gray-400"
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-[100] mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-2xl p-4 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => handleYearChange(-1)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="font-semibold text-gray-900">{selectedYear}</span>
            <button
              type="button"
              onClick={() => handleYearChange(1)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => {
              const isSelected =
                currentMonth === index + 1 && currentYear === selectedYear;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleMonthSelect(index)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                  }`}>
                  {month}
                </button>
              );
            })}
          </div>

          {displayValue && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  onChange({ target: { value: "" } });
                  setIsOpen(false);
                }}
                className="cursor-pointer px-3 mt-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
                Xóa
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MonthYearPicker;
