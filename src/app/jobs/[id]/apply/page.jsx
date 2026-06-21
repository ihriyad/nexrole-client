import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ApplyJob from "./components/ApplyJob";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import {
  FiArrowLeft,
  FiAlertTriangle,
  FiCheckCircle,
  FiZap,
} from "react-icons/fi";
import Image from "next/image";

export const ApplyJobPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/login?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "Job Seeker") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-neutral-400 gap-3 bg-black">
        <FiAlertTriangle className="w-8 h-8 text-amber-500" />
        <p className="text-sm font-medium">
          Only Job Seekers can submit applications.
        </p>
        <Link
          href="/jobs"
          className="text-xs text-white underline mt-2 hover:text-neutral-300"
        >
          Return to listings
        </Link>
      </div>
    );
  }

  const job = await getJobById(id);

  // Safe validation check if job context doesn't exist
  if (!job) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-neutral-400 gap-2 bg-black">
        <p className="text-sm">Job position context could not be located.</p>
        <Link href="/jobs" className="text-xs text-white underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  const plan = {
    name: "Free Tier",
    maxApplications: 3,
  };

  const applications = await getApplicationsByApplicant(user.email);
  const count = applications.length;
  const isLimitReached = count >= plan.maxApplications;

  // Math calculation for progress utility layout indicators
  const usagePercentage = Math.min((count / plan.maxApplications) * 100, 100);

  return (
    <main className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Navigation Action link back to job contextual view */}
        <Link
          href={`/jobs/${id}`}
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-xs font-semibold mb-8 transition-colors group"
        >
          <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Job Details
        </Link>

        {/* Top Segment: Interactive Visual Usage Widget metrics tracker */}
        <section className="bg-[#121212] border border-neutral-800 rounded-2xl p-5 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Usage Track Monitor
              </h4>
              <p className="text-sm text-neutral-200 font-medium mt-0.5">
                You used <span className="text-white font-bold">{count}</span>{" "}
                of{" "}
                <span className="text-white font-bold">
                  {plan.maxApplications}
                </span>{" "}
                monthly applications.
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-full self-start sm:self-center">
              {plan.name}
            </span>
          </div>

          {/* Progress track framework */}
          <div className="w-full bg-neutral-900 h-2 border border-neutral-800/60 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isLimitReached
                  ? "bg-red-500"
                  : usagePercentage > 66
                    ? "bg-amber-400"
                    : "bg-purple-500"
              }`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
        </section>

        {/* Conditional Layout Switching Logic block based on system parameters */}
        {isLimitReached ? (
          <section className="bg-[#121212] border border-red-900/40 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-900 flex items-center justify-center text-red-400">
              <FiZap className="w-5 h-5 fill-current" />
            </div>
            <div className="max-w-sm">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Application Limit Reached
              </h3>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                You have completely consumed the 3 free monthly slots matching
                your current profile tier configuration blueprints. Upgrade now
                for limitless updates.
              </p>
            </div>
            <Link
              href="/plans"
              className="mt-2 inline-flex items-center justify-center px-5 py-2 text-xs font-bold bg-white text-black rounded-xl hover:bg-neutral-200 transition-all shadow-md"
            >
              Upgrade Your Plan
            </Link>
          </section>
        ) : (
          /* Application Form Wrap container card layout pattern elements mapping injection point */
          <section className="bg-[#121212] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-6 pt-6 pb-2 border-b border-neutral-800/40 flex items-center gap-3.5">
              {job.companyLogo && (
                <Image
                  height={36}
                  weight={36}
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-9 h-9 rounded-lg border border-neutral-800 bg-black p-1.5 object-contain"
                />
              )}
              <div>
                <h2 className="text-sm text-neutral-400 font-semibold uppercase tracking-wider">
                  Position Context
                </h2>
                <h3 className="text-base font-bold text-white mt-0.5 tracking-tight line-clamp-1">
                  {job.jobTitle}
                </h3>
              </div>
            </div>
            <div className="p-1 sm:p-2">
              <ApplyJob job={job} applicant={user} />
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ApplyJobPage;
