import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { StatsRow } from "./components/StatsRow";

const RecruiterPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user || null;

  return (
    <div>
      <h3 className="text-3xl font-medium">Welcome, {user.name}</h3>
      <div className="flex flex-col gap-8">
        <StatsRow />
        {/* rest of dashboard */}
      </div>
    </div>
  );
};

export default RecruiterPage;
