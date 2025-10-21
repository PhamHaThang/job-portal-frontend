import Progress from "./Progress";

const LanguageInfo = ({ language, progress, accentColor, bgColor }) => {
  return (
    <div className="flex items-center justify-between">
      <p className={`text-[12px] font-semibold text-gray-900`}>{language}</p>
      {progress > 0 && (
        <Progress
          progress={(progress / 100) * 5}
          total={5}
          color={accentColor}
          bgColor={bgColor}
        />
      )}
    </div>
  );
};
const LanguageSection = ({
  languages,
  accentColor,
  bgColor,
  viewMode = "flex",
}) => {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-2 gap-x-5 gap-y-1 mb-5  "
          : "flex flex-col gap-2"
      }>
      {languages.map((lang, index) => (
        <LanguageInfo
          key={`slanguage-${index}`}
          language={lang.name}
          progress={lang.progress}
          accentColor={accentColor}
          bgColor={bgColor}
        />
      ))}
    </div>
  );
};

export default LanguageSection;
