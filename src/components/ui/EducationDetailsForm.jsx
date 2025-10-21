import InputField from "./InputField";
import { Plus, Trash2 } from "lucide-react";
import MonthYearPicker from "./MonthYearPicker";
const EducationDetailsForm = ({
  educationInfo,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Trình độ học vấn</h2>
      <div className="mt-4 flex flex-col mb-3 gap-4">
        {educationInfo.map((education, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InputField
                label="Bằng cấp"
                value={education.degree || ""}
                onChange={(e) =>
                  updateArrayItem(index, "degree", e.target.value)
                }
                placeholder="Nhập tên bằng cấp"
              />
              <InputField
                label="Cơ sở giáo dục"
                value={education.institution || ""}
                onChange={(e) =>
                  updateArrayItem(index, "institution", e.target.value)
                }
                placeholder="Nhập tên cơ sở giáo dục"
              />

              <MonthYearPicker
                label="Ngày bắt đầu"
                value={education.startDate || ""}
                onChange={(e) =>
                  updateArrayItem(index, "startDate", e.target.value)
                }
                placeholder="Chọn tháng/năm bắt đầu"
              />
              <MonthYearPicker
                label="Ngày kết thúc"
                value={education.endDate || ""}
                onChange={(e) =>
                  updateArrayItem(index, "endDate", e.target.value)
                }
                placeholder="Chọn tháng/năm kết thúc"
              />
            </div>
            {educationInfo.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index)}
                className="absolute top-3 right-3 text-sm text-red-600 hover:text-red-700 hover:underline 
                cursor-pointer ">
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayItem({
              degree: "",
              institution: "",
              startDate: "",
              endDate: "",
            })
          }
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-primary-100 text-primary-500 text-sm
          font-medium hover:bg-primary-200 cursor-pointer ">
          <Plus className="w-5 h-5" />
          Thêm bằng cấp
        </button>
      </div>
    </div>
  );
};

export default EducationDetailsForm;
