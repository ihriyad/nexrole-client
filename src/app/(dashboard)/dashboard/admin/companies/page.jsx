import React from "react";
import { getAllCompanies, getRecruiterCompany } from "@/lib/api/companies";
import { CompanyTable } from "./CompanyTable";

export const AdminsCompanyPage = async () => {
  // Fetching fresh records from your DB collection
  const companies = await getAllCompanies();


  return (
    <main className="min-h-screen bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Metadata Section */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">Company Approvals</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Review structural company parameters, verification states, and active jobs.
            </p>
          </div>
          <div className="px-3 py-1.5 bg-[#121212] border border-neutral-800 rounded-xl text-xs font-semibold text-neutral-400 self-start sm:self-center">
            Total Registrations: <span className="text-white font-bold">{companies.length}</span>
          </div>
        </header>

        {/* Interactive Client Data Matrix Workspace */}
        <div className="bg-[#121212] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          <CompanyTable initialCompanies={companies} />
        </div>

      </div>
    </main>
  );
};

export default AdminsCompanyPage;