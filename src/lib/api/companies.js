import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getAllCompanies = async () => {
  return await serverFetch("/api/companies");
};

export const getRecruiterCompany = async (recruiterId) => {
  return await serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
};

export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return getRecruiterCompany(user?.id);
};
