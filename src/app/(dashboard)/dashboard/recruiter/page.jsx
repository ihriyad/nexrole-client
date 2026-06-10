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
      <h3 className="text-md font-medium px-4 py-2 mb-4 md:text-2xl">
        Welcome, <span className="text-cyan-500">{user.name}</span>
      </h3>
      <div className="flex flex-col gap-8">
        <StatsRow />
        {/* rest of dashboard */}
      </div>
    </div>
  );
};

export default RecruiterPage;
