import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { getJobById } from "@/lib/api/jobs";
import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiArrowLeft,
  FiLayers,
  FiCheckCircle,
  FiGift,
} from "react-icons/fi";
import Image from "next/image";

const CURRENCY_SYMBOLS = { usd: "$", bdt: "৳", eur: "€", gbp: "£" };

export const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-neutral-400 gap-4">
        <p className="text-sm">Position context could not be loaded.</p>
        <Link href="/jobs" className="text-xs text-white underline">
          Return to listings
        </Link>
      </div>
    );
  }

  const {
    jobTitle,
    jobCategory,
    jobType,
    salaryMin,
    salaryMax,
    currency,
    isRemote,
    city,
    country,
    deadline,
    responsibilities,
    requirements,
    benefits,
    companyName,
    companyLogo,
  } = job;

  const formatSalary = () => {
    const symbol = CURRENCY_SYMBOLS[currency?.toLowerCase()] || "$";
    const minStr =
      salaryMin >= 1000 ? `${(salaryMin / 1000).toFixed(0)}k` : salaryMin;
    const maxStr =
      salaryMax >= 1000 ? `${(salaryMax / 1000).toFixed(0)}k` : salaryMax;
    return `${symbol}${minStr} – ${symbol}${maxStr} / year`;
  };

  return (
    <main className="min-h-screen bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Action */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-xs font-semibold mb-8 transition-colors group"
        >
          <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Browse
        </Link>

        {/* Header Hero Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-neutral-800 pb-8 mb-8 w-full">
          <div className="flex items-center gap-4 min-w-0">
            {companyLogo && (
              <Image
                height={100}
                width={100}
                src={companyLogo}
                alt={`${companyName} profile`}
                className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 p-2 object-contain shrink-0"
              />
            )}
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white line-clamp-2 leading-tight">
                {jobTitle}
              </h1>
              <p className="text-sm font-semibold text-neutral-400 mt-1">
                {companyName}
              </p>
            </div>
          </div>
        </header>

        {/* Master Details Content Matrix Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Core Job Requirements Description */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Responsibilities block */}
            <section className="bg-[#121212] border border-neutral-800 rounded-2xl p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
                <FiLayers className="text-purple-400 w-4 h-4" />
                Core Responsibilities
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal whitespace-pre-line">
                {responsibilities}
              </p>
            </section>

            {/* Requirements block */}
            <section className="bg-[#121212] border border-neutral-800 rounded-2xl p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
                <FiCheckCircle className="text-pink-400 w-4 h-4" />
                Role Requirements
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal whitespace-pre-line">
                {requirements}
              </p>
            </section>

            {/* Benefits block */}
            <section className="bg-[#121212] border border-neutral-800 rounded-2xl p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
                <FiGift className="text-emerald-400 w-4 h-4" />
                Perks & Benefits
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal whitespace-pre-line">
                {benefits}
              </p>
            </section>
          </div>

          {/* Right Column: Context Sticky Metadata Dashboard Control Panel */}
          <aside className="lg:sticky lg:top-6 flex flex-col gap-4 w-full">
            <div className="bg-[#121212] border border-neutral-800 rounded-2xl p-5 flex flex-col gap-5">
              {/* Metadata Indicators Grid */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs text-neutral-500 font-semibold uppercase">
                      Location
                    </h4>
                    <p className="text-sm font-medium text-neutral-200 mt-0.5">
                      {isRemote ? "Remote / Worldwide" : `${city}, ${country}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiBriefcase className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs text-neutral-500 font-semibold uppercase">
                      Employment Type
                    </h4>
                    <p className="text-sm font-medium text-neutral-200 mt-0.5 capitalize">
                      {jobType} ({jobCategory})
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiDollarSign className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs text-neutral-500 font-semibold uppercase">
                      Compensation Range
                    </h4>
                    <p className="text-sm font-medium text-neutral-200 mt-0.5">
                      {formatSalary()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiCalendar className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs text-neutral-500 font-semibold uppercase">
                      Application Deadline
                    </h4>
                    <p className="text-sm font-medium text-neutral-200 mt-0.5">
                      {new Date(deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-neutral-800" />

              {/* Instant Call-to-Action Primary Action Button */}
             <Link
              href={`/jobs/${id}/apply`}>
              <Button className="w-full bg-white text-black font-bold text-sm h-11 rounded-xl hover:bg-neutral-200 transition-all shadow-lg">
                Apply for this position
              </Button>
             </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default JobDetailsPage;
