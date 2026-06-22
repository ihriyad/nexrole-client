"use server";

import { serverMutation } from "../core/server";

export const createNewCompany = async (data) => {
  return await serverMutation("/api/company", data);
};

  export const updateCompany = async (id, data) => {
    console.log("Updating company with ID:", id, "and data:", data);
    return await serverMutation(`/api/companies/${id}`, data, "PATCH");
  }