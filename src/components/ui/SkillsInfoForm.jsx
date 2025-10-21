import { Plus, Trash2, X } from "lucide-react";
import InputField from "./InputField";
import RatingInput from "./RatingInput";
const SkillsInfoForm = ({
  skillsInfo,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Thông tin kỹ năng</h2>
      <div className="mt-4 flex flex-col mb-3 gap-4">
        {skillsInfo.map((skill, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InputField
                label="Tên kỹ năng"
                value={skill.name || ""}
                onChange={(e) => updateArrayItem(index, "name", e.target.value)}
                placeholder="Nhập tên kỹ năng"
              />
              <div className="flex flex-col">
                <label
                  className="text-sm font-medium text-gray-700 mb-1 flex
                items-center gap-1">
                  Độ thành thục:
                  {skill.progress > 0 && (
                    <button
                      type="button"
                      onClick={() => updateArrayItem(index, "progress", 0)}
                      className="text-red-400 hover:text-red-600 
                      transition-colors cursor-pointer ">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </label>
                <div className="mt-5">
                  <RatingInput
                    value={skill.progress || 0}
                    total={5}
                    onChange={(value) =>
                      updateArrayItem(index, "progress", value)
                    }
                  />
                </div>
              </div>
            </div>
            {skillsInfo.length > 1 && (
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
              name: "",
              progress: 0,
            })
          }
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-primary-100 text-primary-500 text-sm
          font-medium hover:bg-primary-200 cursor-pointer ">
          <Plus className="w-5 h-5" />
          Thêm kỹ năng
        </button>
      </div>
    </div>
  );
};

export default SkillsInfoForm;
