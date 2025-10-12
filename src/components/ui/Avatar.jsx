const Avatar = ({ name, size = 40 }) => {
  const getInitial = (fullName) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    return parts[parts.length - 1].charAt(0).toUpperCase();
  };

  return (
    <div
      className="h-8 w-8  bg-primary-500 flex items-center justify-center rounded-full  "
      style={{ width: size, height: size }}>
      <span className="text-white font-semibold text-lg">
        {getInitial(name)}
      </span>
    </div>
  );
};

export default Avatar;
