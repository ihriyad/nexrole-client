"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  ListBox,
  TextArea,
  RadioGroup,
  Radio,
  TextField,
} from "@heroui/react";
import { toast } from "sonner";
import { addJobAction, createNewJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";
import Image from "next/image";

// ── Static config data ──────────────────────────────────────────────────────

const JOB_CATEGORIES = [
  { id: "engineering", label: "Engineering & Tech" },
  { id: "design", label: "Design & Creative" },
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales & Business Dev" },
  { id: "finance", label: "Finance & Accounting" },
  { id: "hr", label: "Human Resources" },
  { id: "operations", label: "Operations" },
  { id: "customer", label: "Customer Support" },
  { id: "legal", label: "Legal & Compliance" },
  { id: "other", label: "Other" },
];

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];

const CURRENCIES = [
  { id: "usd", label: "USD — US Dollar" },
  { id: "eur", label: "EUR — Euro" },
  { id: "gbp", label: "GBP — British Pound" },
  { id: "bdt", label: "BDT — Bangladeshi Taka" },
  { id: "inr", label: "INR — Indian Rupee" },
  { id: "cad", label: "CAD — Canadian Dollar" },
  { id: "aud", label: "AUD — Australian Dollar" },
];

export const AddJobForm = ({ company }) => {
  const [workStructure, setWorkStructure] = useState("onsite");
  const isRemote = workStructure === "remote";

  // const formAction = async (formData) => {
  //   const data = await addJobAction(formData);
  //
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const isRemote = formData.get("workStructure") === "remote";
    const allData = {
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
      companyId: company._id,
      companyName: company.companyName,

      status: "active",
      createdAt: new Date(),
    };
    // console.log(data);

    const data = await createNewJob(allData);

    if (data.insertedId) {
      toast.success("Your Job has been added Successfully");
      redirect("/dashboard/recruiter/jobs");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-divider">
        <h1 className="text-3xl font-bold tracking-tight">
          Create a New Job Listing
        </h1>

        <p className="mt-2 text-sm text-default-500">
          Add job details and attract qualified candidates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Basic Info */}
          <section className="bg-content1 border border-divider rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-5">Job Information</h2>

            <div className="flex flex-col gap-5">
              <TextField name="jobTitle" isRequired variant="bordered">
                <Label>Job Title</Label>
                <Input placeholder="Senior Frontend Developer" />
              </TextField>

              <Select
                aria-labelledby="jobCategory"
                name="jobCategory"
                label="Job Category"
                placeholder="Select category"
              >
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {JOB_CATEGORIES.map(({ id, label }) => (
                      <ListBox.Item key={id} id={id} textValue={label}>
                        {label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              <Select
                aria-labelledby="jobType"
                name="jobType"
                label="Employment Type"
                placeholder="Select type"
              >
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {JOB_TYPES.map((type) => (
                      <ListBox.Item
                        key={type}
                        id={type.toLowerCase()}
                        textValue={type}
                      >
                        {type}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </section>

          {/* Salary */}
          <section className="bg-content1 border border-divider rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-5">Salary & Location</h2>

            <div className="grid grid-cols-2 gap-4">
              <TextField name="salaryMin" variant="bordered">
                <Label>Minimum Salary</Label>
                <Input type="number" placeholder="30000" />
              </TextField>

              <TextField name="salaryMax" variant="bordered">
                <Label>Maximum Salary</Label>
                <Input type="number" placeholder="60000" />
              </TextField>
            </div>

            <div className="mt-5">
              <Select
                aria-labelledby="currency"
                name="currency"
                label="Currency"
                placeholder="Select currency"
              >
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {CURRENCIES.map(({ id, label }) => (
                      <ListBox.Item key={id} id={id} textValue={label}>
                        {label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="mt-6 pt-5 border-t border-divider">
              <Label className="text-sm font-medium">Work Structure</Label>

              <RadioGroup
                name="workStructure"
                value={workStructure}
                onChange={setWorkStructure}
                orientation="horizontal"
                className="mt-3 gap-4"
              >
                <Radio value="onsite">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>

                  <Radio.Content>
                    <Label>On-site</Label>
                  </Radio.Content>
                </Radio>

                <Radio value="remote">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>

                  <Radio.Content>
                    <Label>Remote</Label>
                  </Radio.Content>
                </Radio>
              </RadioGroup>

              <div
                className={`grid grid-cols-2 gap-4 mt-5 ${
                  isRemote ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <TextField name="city" isRequired={!isRemote}>
                  <Label>City</Label>

                  <Input disabled={isRemote} placeholder="Dhaka" />
                </TextField>

                <TextField name="country" isRequired={!isRemote}>
                  <Label>Country</Label>

                  <Input disabled={isRemote} placeholder="Bangladesh" />
                </TextField>
              </div>
            </div>
          </section>

          {/* Company Profile */}
          <section className="bg-default-50 border border-divider rounded-2xl p-5">
            <h3 className="font-semibold mb-4">Publish As:</h3>

            <figure>
              <Image
                src={company?.logo}
                height={60}
                width={60}
                alt="Company Logo"
              ></Image>
            </figure>
            <div className="flex flex-col gap-2">
              <p>{company?.companyName}</p>
              <p className="text-muted">Website</p>
              <p>{company?.websiteUrl}</p>
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <section className="bg-content1 border border-divider rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Job Description</h2>

            <p className="text-sm text-default-500 mb-6">
              Describe responsibilities, requirements and benefits.
            </p>

            <div className="flex flex-col gap-6">
              <TextField name="responsibilities" isRequired>
                <Label>Responsibilities</Label>

                <TextArea
                  placeholder="Describe daily tasks..."
                  className="min-h-40"
                />
              </TextField>

              <TextField name="requirements" isRequired>
                <Label>Requirements</Label>

                <TextArea
                  placeholder="Skills and experience..."
                  className="min-h-40"
                />
              </TextField>

              <TextField name="benefits">
                <Label>Benefits (Optional)</Label>

                <TextArea
                  placeholder="Health insurance, bonuses..."
                  className="min-h-32"
                />
              </TextField>

              <TextField name="deadline" isRequired>
                <Label>Application Deadline</Label>

                <Input type="date" />
              </TextField>
            </div>
          </section>

          <div className="bg-content1 border border-divider rounded-2xl p-4 flex justify-end gap-3">
            <Button type="reset" variant="flat">
              Reset
            </Button>

            <Button type="submit" color="primary" size="lg">
              Publish Job
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
