'use server';
import { serverMutation } from "../core/server";

export const addNewApplication = async (data) => {
  return serverMutation("/api/applications", data);
}