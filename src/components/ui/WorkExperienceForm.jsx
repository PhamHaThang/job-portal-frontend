import InputField from "./InputField";
import { Plus, Trash2 } from "lucide-react";
import MonthYearPicker from "./MonthYearPicker";
import TextareaField from "./TextareaField";
const WorkExperienceForm = ({
  workExperience,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Kinh nghiệm làm việc
      </h2>
      <div className="mt-4 flex flex-col mb-3 gap-4">
        {workExperience.map((experience, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InputField
                label="Công ty"
                value={experience.company || ""}
                onChange={(e) =>
                  updateArrayItem(index, "company", e.target.value)
                }
                placeholder="Nhập tên công ty"
              />
              <InputField
                label="Vị trí"
                value={experience.role || ""}
                onChange={(e) => updateArrayItem(index, "role", e.target.value)}
                placeholder="Nhập tên vị trí"
              />

              <MonthYearPicker
                label="Ngày bắt đầu"
                value={experience.startDate || ""}
                onChange={(e) =>
                  updateArrayItem(index, "startDate", e.target.value)
                }
                placeholder="Chọn tháng/năm bắt đầu"
              />
              <MonthYearPicker
                label="Ngày kết thúc"
                value={experience.endDate || ""}
                onChange={(e) =>
                  updateArrayItem(index, "endDate", e.target.value)
                }
                placeholder="Chọn tháng/năm kết thúc"
              />
            </div>
            <div className="mt-4">
              <TextareaField
                label="Mô tả công việc"
                value={experience.description || ""}
                onChange={(e) =>
                  updateArrayItem(index, "description", e.target.value)
                }
                placeholder="Mô tả công việc bạn đã làm"
              />
            </div>
            {workExperience.length > 1 && (
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
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-primary-100 text-primary-500 text-sm
          font-medium hover:bg-primary-200 cursor-pointer ">
          <Plus className="w-5 h-5" />
          Thêm kinh nghiệm làm việc
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
