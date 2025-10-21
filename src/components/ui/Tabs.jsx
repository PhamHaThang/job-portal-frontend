const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative px-3 md:px-4 py-2 text-sm font-medium focus:outline-none transition-colors cursor-pointer ${
              activeTab === tab.label
                ? "text-primary-600"
                : "text-gray-500 hover:text-gray-700 hover:bg-primary-50"
            }`}
            onClick={() => setActiveTab(tab.label)}>
            <div className="flex items-center gap-2 justify-center">
              <span
                className="text-lg
                font-semibold text-primary-700
              ">
                {tab.label}
              </span>
            </div>
            {activeTab === tab.label && (
              <div
                className="absolute bottom-0 left-0 w-full h-0.5
              bg-linear-to-r from-primary-500/85 to-primary-700 
              "></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
