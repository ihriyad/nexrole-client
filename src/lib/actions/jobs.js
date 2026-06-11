"use server";

import { serverMutation } from "../core/server";

export const createNewJob = async (data) => {
  console.log(data)
  return serverMutation("/api/jobs", data);
};
