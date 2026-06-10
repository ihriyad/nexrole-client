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
      

      <AddJobForm
        recruiterName={session?.user?.name ?? ""}
        recruiterEmail={session?.user?.email ?? ""}
      />
    </div>
  );
};

export default NewJobPage;
