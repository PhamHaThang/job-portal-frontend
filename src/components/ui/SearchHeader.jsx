import { MapPin, Search } from "lucide-react";

const SearchHeader = ({ filters, handleFilterChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200 border border-white/20 p-4 lg:p-8 mb-6 lg:mb-8">
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl lg:text-2xl font-semibold text-gray-900 mb-2">
            Tìm kiếm việc làm
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            Tìm kiếm việc làm phù hợp với kỹ năng và sở thích của bạn.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-[1]" />
            <input
              type="text"
              placeholder="Tên công việc, công ty, từ khóa,..."
              className="w-full pl-12 pr-4 py-2 lg:py-2.5 border border-gray-200 rounded-xl outline-0 text-base bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
            />
          </div>
          <div className="relative min-w-0 lg:min-w-[200px]">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-[1] " />
            <input
              type="text"
              placeholder="Địa chỉ"
              className="w-full pl-12 pr-4 py-2 lg:py-2.5 border border-gray-200 rounded-xl outline-0 text-base bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>
          <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 lg:px-10 py-3 lg:py-2.5 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all w-full lg:w-auto text-base font-semibold shadow-lg hover:shadow-xl cursor-pointer duration-200 transform hover:-translate-y-0.5">
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
