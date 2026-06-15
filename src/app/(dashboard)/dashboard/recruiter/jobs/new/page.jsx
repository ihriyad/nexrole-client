import { auth } from "@/lib/auth";
import { AddJobForm } from "./components/AddJobForm";
import { headers } from "next/headers";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const NewJobPage = async () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });
  const company = await getLoggedInRecruiterCompany();
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <AddJobForm company={company}></AddJobForm>
    </div>
  );
};

export default NewJobPage;
