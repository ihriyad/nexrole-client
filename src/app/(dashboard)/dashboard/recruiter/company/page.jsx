import React from "react";

import { FiBriefcase } from "react-icons/fi";
import AddCompanyModal from "./components/AddCompanyModal";
import { getUserSession } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companies";
import ShowCompany from "./components/ShowCompany";

export const RecruiterCompanyPage = async () => {
  const user = await getUserSession();
  const company = await getRecruiterCompany(user?.id);
  // console.log(company, "company page");

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-divider pb-6">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Company Workspace
          </h1>
          <p className="text-xs sm:text-sm text-default-500 mt-1">
            Configure your corporate identity profiles to show up verified
            across public listings.
          </p>
        </div>
      </div>
      {company?._id ? (
        <ShowCompany company={company}></ShowCompany>
      ) : (
        <div className="bg-content1 border border-divider rounded-2xl p-6 sm:p-12 text-center flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto mt-4 sm:mt-8 shadow-sm">
          <div className="p-4 bg-default-100 rounded-full text-default-400">
            <FiBriefcase className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              No Company Registered
            </h2>
            <p className="text-xs sm:text-sm text-default-400 max-w-md">
              You need to register your corporate identity profile information
              framework before initializing open job listing postings.
            </p>
          </div>
          <AddCompanyModal company={company} recruiter={user}></AddCompanyModal>
        </div>
      )}
    </div>
  );
};

export default RecruiterCompanyPage;
