const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div
      className={`h-auto md:h-[400px] flex flex-col items-center justify-between
      bg-white rounded-lg  
      overflow-hidden cursor-pointer shadow-sm border-2
      ${
        isSelected
          ? " border-primary-500"
          : " border-gray-200 hover:border-primary-300"
      }
      `}
      onClick={onSelect}>
      {thumbnailImg ? (
        <img
          src={thumbnailImg}
          alt="Ảnh Mẫu"
          className="w-[100%] rounded object-cover"
        />
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default TemplateCard;
