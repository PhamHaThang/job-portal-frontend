import { Plus, Trash2, X } from "lucide-react";
import InputField from "./InputField";
import RatingInput from "./RatingInput";
import TextareaField from "./TextareaField";
const AdditionalInfoForm = ({
  languages,
  interest,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  setInterest,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Thông tin khác</h2>
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Ngôn ngữ</h3>
        <div className="flex flex-col gap-4">
          {languages.map((language, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                <InputField
                  label="Tên ngôn ngữ"
                  value={language.name || ""}
                  onChange={(e) =>
                    updateArrayItem("languages", index, "name", e.target.value)
                  }
                  placeholder="Nhập tên ngôn ngữ"
                />
                <div className="flex flex-col">
                  <label
                    className="text-sm font-medium text-gray-700 mb-1 flex
                  items-center gap-1">
                    Độ thành thục:
                    {language.progress > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          updateArrayItem("languages", index, "progress", 0)
                        }
                        className="text-red-400 hover:text-red-600 
                        transition-colors cursor-pointer ">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </label>
                  <div className="mt-5">
                    <RatingInput
                      value={language.progress || 0}
                      total={5}
                      onChange={(value) =>
                        updateArrayItem("languages", index, "progress", value)
                      }
                    />
                  </div>
                </div>
              </div>
              {languages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("languages", index)}
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
              addArrayItem("languages", {
                name: "",
                progress: 0,
              })
            }
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-primary-100 text-primary-500 text-sm
            font-medium hover:bg-primary-200 cursor-pointer ">
            <Plus className="w-5 h-5" />
            Thêm ngôn ngữ
          </button>
        </div>
      </div>
      <div className="mt-8 mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Sở thích</h3>
        <div className="mt-3">
          <TextareaField
            value={interest || ""}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="Viết một đoạn mô tả sở thích của bạn"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
