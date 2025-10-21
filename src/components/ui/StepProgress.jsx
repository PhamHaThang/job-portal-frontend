const StepProgress = ({ progress }) => {
  return (
    <div className="w-full bg-primary-50 h-1 overflow-hidden rounded-[2px]">
      <div
        className="h-1 bg-gradient-to-r from-primary-500/85 to-primary-700 transition-all rounded"
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default StepProgress;
