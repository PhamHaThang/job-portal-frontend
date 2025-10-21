import InputField from "./InputField";
import { Plus, Trash2 } from "lucide-react";
import TextareaField from "./TextareaField";

const ProjectsDetailsForm = ({
  projectsInfo,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Thông tin dự án</h2>
      <div className="mt-4 flex flex-col mb-3 gap-4">
        {projectsInfo.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="col-span-1 lg:col-span-2">
                <InputField
                  label="Tên dự án"
                  value={project.title || ""}
                  onChange={(e) =>
                    updateArrayItem(index, "title", e.target.value)
                  }
                  placeholder="Nhập tên dự án"
                />
              </div>
              <div className="col-span-1 lg:col-span-2">
                <TextareaField
                  label="Mô tả dự án"
                  value={project.description || ""}
                  onChange={(e) =>
                    updateArrayItem(index, "description", e.target.value)
                  }
                  placeholder="Mô tả dự án của bạn"
                />
              </div>
              <InputField
                label="Link GitHub"
                value={project.github || ""}
                onChange={(e) =>
                  updateArrayItem(index, "github", e.target.value)
                }
                placeholder="Nhập link GitHub của dự án"
                type="url"
              />
              <InputField
                label="Link Demo dự án"
                value={project.liveDemo || ""}
                onChange={(e) =>
                  updateArrayItem(index, "liveDemo", e.target.value)
                }
                placeholder="Nhập link demo trực tiếp của dự án"
                type="url"
              />
            </div>
            {projectsInfo.length > 1 && (
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
              description: "",
              github: "",
              liveDemo: "",
            })
          }
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-primary-100 text-primary-500 text-sm
          font-medium hover:bg-primary-200 cursor-pointer ">
          <Plus className="w-5 h-5" />
          Thêm dự án
        </button>
      </div>
    </div>
  );
};

export default ProjectsDetailsForm;
