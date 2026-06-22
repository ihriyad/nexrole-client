"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { updateCompany } from "@/lib/actions/companies";
import Image from "next/image";

export const CompanyTable = ({ initialCompanies = [] }) => {
  const [companies, setCompanies] = useState(initialCompanies);

  const handleStatusUpdate = async (companyId, newStatus) => {
    try {
      const response = await updateCompany(companyId, { status: newStatus });

      if (!response.success) throw new Error("Update failed.");

      setCompanies((prev) =>
        prev.map((c) =>
          c._id === companyId ? { ...c, status: newStatus } : c,
        ),
      );
    } catch (error) {
      console.error("Action error:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-neutral-800/80 bg-neutral-900/30 text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none">
            <th className="py-4 px-5">Company Name</th>
            <th className="py-4 px-5">Recruiter Email</th>
            <th className="py-4 px-5">Industry</th>
            <th className="py-4 px-5 text-center">Jobs Added</th>
            <th className="py-4 px-5">Status</th>
            <th className="py-4 px-5">Date Submitted</th>
            <th className="py-4 px-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/40 text-xs">
          {companies.map((company) => {
            const {
              _id,
              companyName,
              logo,
              recruiterEmail,
              industry,
              jobsCount,
              status,
              createdAt,
            } = company;

            return (
              <tr
                key={_id}
                className="hover:bg-neutral-900/20 transition-colors group"
              >
                {/* Brand Identifier Element */}
                <td className="py-4 px-5 font-semibold text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] font-black text-neutral-400 uppercase shrink-0 overflow-hidden">
                      {logo ? (
                        <Image
                          height={32}
                          width={32}
                          src={logo}
                          alt="company logo"
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        companyName?.substring(0, 2)
                      )}
                    </div>
                    <span className="truncate max-w-[160px]">
                      {companyName}
                    </span>
                  </div>
                </td>

                {/* Email Address */}
                <td className="py-4 px-5 text-neutral-400 font-medium">
                  {recruiterEmail}
                </td>

                {/* Industry Tag Badge */}
                <td className="py-4 px-5">
                  <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-md text-[10px] font-medium tracking-wide">
                    {industry || "Technology"}
                  </span>
                </td>

                {/* Jobs Added Counter (New Requirement) */}
                <td className="py-4 px-5 text-center text-neutral-300 font-mono font-bold">
                  {jobsCount || 0}
                </td>

                {/* Current Status State indicator dot layout */}
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        status === "approved"
                          ? "bg-emerald-500"
                          : status === "pending"
                            ? "bg-amber-500"
                            : "bg-rose-500"
                      }`}
                    />
                    <span
                      className={`font-bold capitalize ${
                        status === "approved"
                          ? "text-emerald-500"
                          : status === "pending"
                            ? "text-amber-500"
                            : "text-rose-500"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </td>

                {/* Date Created Metadata */}
                <td className="py-4 px-5 text-neutral-500 font-medium">
                  {createdAt
                    ? new Date(createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Oct 12, 2023"}
                </td>

                {/* Control Action Triggers */}
                <td className="py-4 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {status !== "approved" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(_id, "approved")}
                        className="h-8 min-w-0 px-3 bg-emerald-950/40 border border-emerald-900/60 text-emerald-400 font-bold text-[11px] rounded-lg hover:bg-emerald-900 hover:text-white transition-all disabled:opacity-50"
                      >
                        Approve
                      </Button>
                    )}
                    {status !== "rejected" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(_id, "rejected")}
                        className="h-8 min-w-0 px-3 bg-rose-950/40 border border-rose-900/60 text-rose-400 font-bold text-[11px] rounded-lg hover:bg-rose-900 hover:text-white transition-all disabled:opacity-50"
                      >
                        Reject
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
