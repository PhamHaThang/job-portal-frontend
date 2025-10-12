import { TrendingUp } from "lucide-react";
import { Card } from "./Card";

const StatCard = ({
  title,
  value,
  icon,
  trendValue,
  trend,
  color = "blue",
}) => {
  const Icon = icon;
  const colorClasses = {
    red: "from-red-500 to-red-600",
    amber: "from-amber-500 to-amber-600",
    teal: "from-teal-500 to-teal-600",
    sky: "from-sky-500 to-sky-600",
    slate: "from-slate-500 to-slate-600",
    indigo: "from-indigo-500 to-indigo-600",
    yellow: "from-yellow-500 to-yellow-600",
    blue: "from-blue-500 to-blue-600 ",
    green: "from-green-500 to-green-600",
    purple: "from-violet-500 to-violet-600",
    orange: "from-orange-500 to-orange-600",
  };
  return (
    <Card
      className={`bg-gradient-to-br ${colorClasses[color]} text-white border-0`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
