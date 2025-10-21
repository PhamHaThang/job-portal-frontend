const RatingInput = ({
  value = 0,
  total = 5,
  onChange = () => {},
  color = "#bc2626",
  bgColor = "#fde8e8",
}) => {
  const displayValue = Math.round((value / 100) * total);
  const handleClick = (index) => {
    const newValue = Math.round(((index + 1) / total) * 100);
    onChange(newValue);
  };
  return (
    <div className="flex gap-3 cursor-pointer">
      {[...Array(total)].map((_, index) => {
        const isActive = index < displayValue;
        return (
          <div
            className="w-4 h-4 rounded transition-all"
            key={index}
            onClick={() => handleClick(index)}
            style={{
              backgroundColor: isActive ? color : bgColor,
            }}></div>
        );
      })}
    </div>
  );
};

export default RatingInput;
