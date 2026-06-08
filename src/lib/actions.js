"use server";

export const addJobAction = async (formData) => {
  // If the switch was checked, it sends "true". If unchecked, it is null/undefined.
  const isRemote = formData.get("workStructure") === "remote";

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
    status: "active",
    createdAt: new Date(),
  };

  console.log(data);
};