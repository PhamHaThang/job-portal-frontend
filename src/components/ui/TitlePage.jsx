const TitlePage = ({ title, description }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200 border border-white/20 p-4 lg:p-8 mb-6 lg:mb-8">
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl lg:text-2xl font-semibold text-gray-900 mb-2">
            {title}
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TitlePage;
