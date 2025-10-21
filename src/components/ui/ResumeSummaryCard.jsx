import { getLightColorFromImage } from "../../utils/helper";
import { useState, useEffect } from "react";
const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch(() => {
          setBgColor("#ffffff");
        });
    }
  }, [imgUrl]);
  return (
    <div
      className="h-[300px] flex flex-col justify-between items-center   border  border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50/5 overflow-hidden"
      style={{ backgroundColor: bgColor }}
      onClick={onSelect}>
      <div className="p-4">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt="Resume Thumbnail"
            className="w-[100%] h-[200px] rounded object-center"
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className="w-full bg-white px-4 py-3">
        <h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap ">
          {title}
        </h5>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          Cập nhật lần cuối: {lastUpdated || "Chưa xác định"}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
