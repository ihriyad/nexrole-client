// app/(dashboard)/recruiter/jobs/new/page.js
import { auth } from "@/lib/auth";
import { AddJobForm } from "./components/AddJobForm";
import { headers } from "next/headers";

const NewJobPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Post a New Job
        </h1>
        <p className="text-sm text-foreground-400 mt-1">
          Fill in the details below to publish your job listing.
        </p>
      </div>

      <AddJobForm
        recruiterName={session?.user?.name ?? ""}
        recruiterEmail={session?.user?.email ?? ""}
      />
    </div>
  );
};

export default NewJobPage;
