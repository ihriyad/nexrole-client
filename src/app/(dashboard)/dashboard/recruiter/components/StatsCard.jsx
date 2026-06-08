import { LuFileText, LuUsers, LuZap, LuCircleCheck } from "react-icons/lu";

const ICON_MAP = {
  totalJobs:        LuFileText,
  totalApplicants:  LuUsers,
  activeJobs:       LuZap,
  closedJobs:       LuCircleCheck,  // ← updated key
};

export const StatsCard = ({ label, value, statKey }) => {
  const Icon = ICON_MAP[statKey] ?? LuFileText;

  return (
    <div className="flex flex-col gap-6 bg-content1 rounded-xl p-5 border border-divider">
      {/* Icon */}
      <div className="w-9 h-9 rounded-lg bg-content2 flex items-center justify-center">
        <Icon className="text-foreground-500 text-lg" />
      </div>

      {/* Label + Value */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-foreground-400">{label}</p>
        <p className="text-3xl font-medium text-foreground">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </div>
    </div>
  );
};
