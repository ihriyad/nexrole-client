import JobCard from "@/components/jobs/JobCard";
import JobFilter from "@/components/jobs/JobFilter";
import { getJobs } from "@/lib/api/jobs";
import React from "react";

export const AllJobsPage = async ({ searchParams }) => {
  // Next.js 15 requires awaiting searchParams before reading its properties
  const resolvedParams = await searchParams;

  const categoryFilter = resolvedParams?.category;
  const remoteFilter = resolvedParams?.isRemote === "true";
  const typeFilter = resolvedParams?.type
    ? resolvedParams.type.split(",").filter(Boolean)
    : [];

  // Push filtering into the DB query rather than fetching everything
  // and filtering in memory — scales properly as job count grows
  const filteredJobs = await getJobs({
    category: categoryFilter,
    isRemote: remoteFilter,
    types: typeFilter,
  });

  return (
    <>
      <aside className="w-full md:w-64 shrink-0">
        <JobFilter />
      </aside>

      <section className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-neutral-200">
            Available Positions ({filteredJobs.length})
          </h3>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="flex items-center justify-center border border-dashed border-neutral-800 rounded-2xl h-60 text-neutral-500 text-sm">
            No matching vacancies found. Try adjusting filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default AllJobsPage;