"use server";

import { serverFetch } from "../core/server";

const baseUrl = process.env.SERVER_URL;

// export const getJobs = async () => {
//   return serverFetch("/api/jobs");
// };
export const getJobs = async ({ category, isRemote, types } = {}) => {
  const params = new URLSearchParams();
  if (category && category !== "all") params.set("category", category);
  if (isRemote) params.set("isRemote", "true");
  if (types?.length) params.set("type", types.join(","));

  return serverFetch(`/api/jobs?${params.toString()}`);
};

export const getJobById = async (id) => {
  return serverFetch(`/api/jobs/${id}`);
};

export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`,
  );
  return await res.json();
};
