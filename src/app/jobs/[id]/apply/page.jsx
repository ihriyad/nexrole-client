import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ApplyJobPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  //   console.log("User session in apply page:", user);
  if (!user) {
    redirect(`/login?redirect=/jobs/${id}/apply`);
  }
  if (user.role !== "Job Seeker") {
    return (
      <div className="min-h-[60vh] mx-auto flex flex-col items-center justify-center text-neutral-400 gap-4">
        <p className="text-sm">Only seekers can apply for jobs.</p>
        <Link href="/jobs" className="text-xs text-white underline">
          Return to listings
        </Link>
      </div>
    );
  }
  const job = await getJobById(id);
  return (
    <div>
      <h3>
        Apply for{" "}
        <span className="text-primary font-semibold">{job.jobTitle}</span>{" "}
      </h3>
    </div>
  );
};

export default ApplyJobPage;
