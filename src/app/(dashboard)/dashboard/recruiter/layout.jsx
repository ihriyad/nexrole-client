import { requiredRole } from "@/lib/core/session";
import React from "react";

const RecruiterLayout = async ({ children }) => {
  await requiredRole("recruiter");
  return <div>{children}</div>;
};

export default RecruiterLayout;
