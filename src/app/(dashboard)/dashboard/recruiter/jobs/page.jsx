import { getCompanyJobs } from "@/lib/api/jobs";
import { JobsTable } from "./components/JobsTable";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";


const RecruiterJobsPage = async () => {

  const company = await getLoggedInRecruiterCompany();
  const jobs = await getCompanyJobs(company._id);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Jobs</h1>

        <p className="text-default-500 mt-1">
          Manage your company job postings.
        </p>
      </div>

      <JobsTable jobs={jobs}></JobsTable>
    </div>
  );
};

export default RecruiterJobsPage;
