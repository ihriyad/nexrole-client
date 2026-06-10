"use server";

const baseUrl = process.env.SERVER_URL
export const addJobAction = async (formData) => {
  const isRemote = formData.get("workStructure") === "remote";
  const companyId = 'my_company'
  const data = {
    jobTitle: formData.get("jobTitle"),
    jobCategory: formData.get("jobCategory"),
    jobType: formData.get("jobType"),
    salaryMin: Number(formData.get("salaryMin")) || null,
    salaryMax: Number(formData.get("salaryMax")) || null,
    currency: formData.get("currency"),
    isRemote,
    city: isRemote ? null : formData.get("city"),
    country: isRemote ? null : formData.get("country"),
    deadline: formData.get("deadline"),
    responsibilities: formData.get("responsibilities"),
    requirements: formData.get("requirements"),
    benefits: formData.get("benefits") || null,
    recruiterName: formData.get("recruiterName"),
    recruiterEmail: formData.get("recruiterEmail"),
    companyId,
    status: "active",
    createdAt: new Date(),
  };

  const res = await fetch(`${baseUrl}/api/jobs`,{
    method: "POST",
    headers: {
      'Content-type' : "application/json"
    },
    body: JSON.stringify(data)
  })
  return res.json();
};
