import { StatsCard } from "./StatsCard";

// Stats config — swap in real API data via props
const STATS = [
  { label: "Total Job Posts", value: 48, statKey: "totalJobs" },
  { label: "Total Applicants", value: 1284, statKey: "totalApplicants" },
  { label: "Active Jobs", value: 18, statKey: "activeJobs" },
  { label: "Jobs Closed", value: 32, statKey: "closedJobs" },
];

export const StatsRow = ({ stats = STATS }) => {
  return (
    <section className="flex flex-col gap-5">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <StatsCard key={stat.statKey} {...stat} />
        ))}
      </div>
    </section>
  );
};
