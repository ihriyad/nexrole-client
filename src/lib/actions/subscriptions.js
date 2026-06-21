'use server';
import { serverMutation } from "../core/server";

export const createSubscription = async (data) => {
  return serverMutation("/api/subscriptions", data);
}