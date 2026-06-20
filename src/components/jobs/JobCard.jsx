"use client";

import { Card, Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiArrowUpRight,
} from "react-icons/fi";

const CURRENCY_SYMBOLS = { usd: "$", bdt: "৳", eur: "€", gbp: "£" };

export const JobCard = ({ job }) => {
  const {
    _id,
    jobTitle,
    jobType,
    salaryMin,
    salaryMax,
    currency,
    isRemote,
    city,
    country,
    responsibilities,
    companyName,
    companyLogo,
  } = job;

  const formatSalary = () => {
    const symbol = CURRENCY_SYMBOLS[currency?.toLowerCase()] || "$";
    const minStr =
      salaryMin >= 1000 ? `${(salaryMin / 1000).toFixed(0)}k` : salaryMin;
    const maxStr =
      salaryMax >= 1000 ? `${(salaryMax / 1000).toFixed(0)}k` : salaryMax;
    const isHourly = salaryMax < 1000;
    return `${symbol}${isHourly ? salaryMin : minStr}–${symbol}${isHourly ? salaryMax : maxStr}${isHourly ? "/hr" : ""}`;
  };

  return (
    <Card className="w-full bg-[#121212] border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all flex flex-col justify-between">
      {/* Header section managing brand layout */}
      <Card.Header className="flex flex-col gap-2 p-0 items-start w-full">
        <div className="flex items-center gap-3 w-full">
          {/* Company Profile Logo image branding */}
          {companyLogo && (
            <img
              src={companyLogo}
              alt={`${companyName} logo`}
              className="w-10 h-10 rounded-lg object-contain bg-neutral-900 border border-neutral-800 p-1 shrink-0"
              onError={(e) => {
                e.target.style.display = "none";
              }} // Safe fallback check if link breaks
            />
          )}
          <div className="min-w-0 flex-1">
            <Card.Title className="text-base font-bold text-white tracking-tight line-clamp-1 leading-snug">
              {jobTitle}
            </Card.Title>
            <p className="text-xs font-medium text-neutral-400 mt-0.5 truncate">
              {companyName}
            </p>
          </div>
        </div>

        <Card.Description className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
          {responsibilities}
        </Card.Description>
      </Card.Header>

      {/* Badges Container */}
      <Card.Content className="flex flex-wrap gap-1.5 mt-3.5 p-0">
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-300 text-[11px] border border-neutral-800">
          <FiMapPin className="w-3 h-3 text-purple-400" />
          <span>{isRemote ? "Remote" : `${city || country || "On-Site"}`}</span>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-300 text-[11px] border border-neutral-800">
          <FiBriefcase className="w-3 h-3 text-pink-400" />
          <span className="capitalize">{jobType}</span>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-300 text-[11px] border border-neutral-800">
          <FiDollarSign className="w-3 h-3 text-emerald-400" />
          <span>{formatSalary()}</span>
        </div>
      </Card.Content>

      {/* Footer Nav Action */}
      <Card.Footer className="flex justify-start mt-4 p-0">
        <Link href={`/jobs/${_id}`}>
          <Button
            variant="light"
            className="text-white hover:text-neutral-300 font-bold p-0 min-w-0 bg-transparent flex items-center gap-1.5 text-xs group"
          >
            Apply Now
            <FiArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default JobCard;
