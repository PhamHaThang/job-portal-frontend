import InputField from "./InputField";
import { Plus, Trash2 } from "lucide-react";
const CertificationInfoForm = ({
  certificationsInfo,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Chứng chỉ</h2>
      <div className="mt-4 flex flex-col mb-3 gap-4">
        {certificationsInfo.map((certification, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative">
            <div className="grid grid-cols-1  gap-4">
              <InputField
                label="Tên chứng chỉ"
                value={certification.title || ""}
                onChange={(e) =>
                  updateArrayItem(index, "title", e.target.value)
                }
                placeholder="Nhập tên chứng chỉ"
              />
              <InputField
                label="Người/Tổ chức phát hành"
                value={certification.issuer || ""}
                onChange={(e) =>
                  updateArrayItem(index, "issuer", e.target.value)
                }
                placeholder="Nhập người hoặc tổ chức phát hành chứng chỉ"
              />
              <InputField
                label="Năm nhận chứng chỉ"
                value={certification.year || ""}
                onChange={(e) => updateArrayItem(index, "year", e.target.value)}
                placeholder="Nhập năm nhận chứng chỉ (VD: 2025)"
              />
            </div>

            {certificationsInfo.length > 1 && (
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
              title: "",
              issuer: "",
              year: "",
            })
          }
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-primary-100 text-primary-500 text-sm
            font-medium hover:bg-primary-200 cursor-pointer ">
          <Plus className="w-5 h-5" />
          Thêm chứng chỉ
        </button>
      </div>
    </div>
  );
};

export default CertificationInfoForm;
