"use server";

import { serverMutation } from "../core/server";

export const createNewCompany = async (data) => {
  return serverMutation("/api/company", data);
};
