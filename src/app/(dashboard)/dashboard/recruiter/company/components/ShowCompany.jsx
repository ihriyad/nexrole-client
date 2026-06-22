import React from "react";
import { FiGlobe, FiMapPin, FiUsers } from "react-icons/fi";
import EditCompanyModal from "./EditCompanyModal";
import Image from "next/image";
const ShowCompany = ({ company }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 bg-content1 border border-divider rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-divider pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-divider bg-default-50 flex items-center justify-center text-default-400 text-lg sm:text-xl font-bold shrink-0">
              <Image
                height={60}
                width={60}
                src={company.logo}
                alt="Company Logo"
              ></Image>
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {company.companyName}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-default-400 mt-1 capitalize">
                {company.industry}
              </p>
            </div>
          </div>

          <EditCompanyModal company={company}></EditCompanyModal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-default-50/50 border border-divider">
            <FiGlobe className="w-5 h-5 text-primary shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] sm:text-xs text-default-400 font-medium">
                Website
              </span>
              <a
                href={company.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-sm font-semibold text-foreground hover:underline truncate"
              >
                {company.websiteUrl || "N/A"}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-default-50/50 border border-divider">
            <FiMapPin className="w-5 h-5 text-success shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] sm:text-xs text-default-400 font-medium">
                Location
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {company.location || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-default-50/50 border border-divider">
            <FiUsers className="w-5 h-5 text-warning shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] sm:text-xs text-default-400 font-medium">
                Headcount
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {company.employeeRange || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm sm:text-base text-foreground">
            Company Mission & Culture
          </h3>
          <p className="text-xs sm:text-sm text-default-600 leading-relaxed whitespace-pre-line">
            {company.description ||
              "No corporate description summary bio configured yet."}
          </p>
        </div>
      </div>

      <div className="lg:col-span-4 bg-default-50 border border-divider rounded-2xl p-5 flex flex-col gap-3">
        <h3 className="font-semibold text-sm text-foreground">
          Verification Notice
        </h3>
        <span
          className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-colors select-none ${
            company.status === "approved"
              ? "bg-success-500/10 border-success-500/20 text-success"
              : company.status === "pending"
                ? "bg-warning-500/10 border-warning-500/20 text-warning"
                : "bg-danger-500/10 border-danger-500/20 text-danger-500" 
          }`}
        >
          {company.status}
        </span>
      </div>
    </div>
  );
};

export default ShowCompany;
