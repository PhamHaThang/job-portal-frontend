import { Check, FilePen, Pencil } from "lucide-react";
import { useState } from "react";
const TitleInput = ({ title, setTitle }) => {
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="">
      {showInput ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-md bg-transparent outline-none text-gray-900 font-medium border-b border-gray-300 cursor-pointer"
            placeholder="Nhập tiêu đề CV"
          />
          <button
            className="cursor-pointer text-gray-400 hover:text-gray-500 "
            onClick={() => setShowInput((prev) => !prev)}>
            <Check className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <h2 className="text-md font-semibold text-gray-700 ">{title}</h2>
          <button className="cursor-pointer text-primary-500 hover:text-primary-600">
            <FilePen
              className="w-5 h-5"
              onClick={() => setShowInput((prev) => !prev)}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default TitleInput;
