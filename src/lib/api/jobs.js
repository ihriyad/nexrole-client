"use server";

const baseUrl = process.env.SERVER_URL;
export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`,
  );
  return await res.json();
};
