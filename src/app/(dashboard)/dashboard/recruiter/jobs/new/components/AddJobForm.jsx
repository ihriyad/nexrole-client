"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Switch,
  Label,
  Select,
  ListBox,
  TextArea,
  RadioGroup,
  Radio,
  TextField,
} from "@heroui/react";
import { toast } from "sonner";
import { addJobAction } from "@/lib/actions";

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

// ── Component ───────────────────────────────────────────────────────────────

export const AddJobForm = ({ recruiterName, recruiterEmail }) => {
  // const [isRemote, setIsRemote] = useState(false);
  const [workStructure, setWorkStructure] = useState("onsite");
  const isRemote = workStructure === "remote";
  // const handleReset = () => {
  //   setIsRemote(false);
  // };

  const formAction = async (formData) => {
    const data = await addJobAction(formData);
    // {todo}
    //  if (data.insertedId) {
    //   toast.success("Your Pet has been added Successfully");
    //   router.push("/dashboard/my_listing");
    // }
    if (data) {
      toast.success("job Added success");
    }
  };

  return (
    <form action={formAction} className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* Page Header */}
      <div className="mb-8 pb-6 border-b border-divider">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Create a New Job Listing
        </h1>
        <p className="mt-2 text-sm text-default-500">
          Publish an open vacancy on your company board to attract top talent.
        </p>
      </div>

      {/* Two-Column Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT SIDEBAR: Metadata & Context (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card: Primary Job Meta */}
          <div className="bg-content1 border border-divider rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-default-400">
              Job Demographics
            </h2>

            <Input
              required
              type="text"
              name="jobTitle"
              label="Job Title"
              placeholder="e.g., Senior Frontend Developer"
              variant="bordered"
              radius="md"
            />

            <Select
              name="jobCategory"
              label="Job Category"
              placeholder="Select category"
              aria-labelledby="category-label"
              className="w-full"
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

            <div className="grid grid-cols-2 gap-4">
              <Select
                name="jobType"
                label="Job Type"
                placeholder="Select type"
                aria-labelledby="job-type-label"
                className="w-full"
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
                        id={type.toLowerCase().replace(" ", "-")}
                        textValue={type}
                      >
                        {type}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              <Input
                required
                type="date"
                name="deadline"
                label="Application Deadline"
                variant="bordered"
                radius="md"
              />
            </div>
          </div>

          {/* Card: Compensation & Location */}
          <div className="bg-content1 border border-divider rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-default-400">
              Compensation & Location
            </h2>

            <div className="grid grid-cols-3 gap-2 items-end">
              <div className="col-span-1 flex flex-col gap-2">
                <Label
                  htmlFor="salaryMin"
                  className="text-sm font-medium text-foreground"
                >
                  Min Salary
                </Label>
                <Input
                  id="salaryMin"
                  type="number"
                  name="salaryMin"
                  placeholder="30k"
                  variant="bordered"
                  radius="md"
                  min={0}
                />
              </div>

              <div className="col-span-1 flex flex-col gap-2">
                <Label
                  htmlFor="salaryMax"
                  className="text-sm font-medium text-foreground"
                >
                  Max Salary
                </Label>
                <Input
                  id="salaryMax"
                  type="number"
                  name="salaryMax"
                  placeholder="60k"
                  variant="bordered"
                  radius="md"
                  min={0}
                />
              </div>

              <div className="col-span-1 flex flex-col gap-2">
                <Label
                  id="currency-label"
                  className="text-sm font-medium text-foreground"
                >
                  Currency
                </Label>
                <Select
                  name="currency"
                  placeholder="USD"
                  aria-labelledby="currency-label"
                  className="w-full"
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
            </div>

            <div className="pt-2 border-t border-divider flex flex-col gap-3">
              <Label
                id="work-structure-label"
                className="text-sm font-medium text-default-700"
              >
                Work Structure
              </Label>

              <RadioGroup
                name="workStructure"
                value={workStructure}
                onChange={setWorkStructure}
                orientation="horizontal"
                aria-labelledby="work-structure-label"
                className="gap-4"
              >
                <Radio value="onsite" className="max-w-[160px] flex-1">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>

                  <Radio.Content>
                    <Label className="text-xs font-semibold cursor-pointer">
                      On-site / Hybrid
                    </Label>
                  </Radio.Content>
                </Radio>

                <Radio value="remote" className="max-w-[160px] flex-1">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>

                  <Radio.Content>
                    <Label className="text-xs font-semibold cursor-pointer">
                      Remote
                    </Label>
                  </Radio.Content>
                </Radio>
              </RadioGroup>

              <div
                className={`grid grid-cols-2 gap-3 transition-all duration-300 mt-2 ${
                  isRemote ? "opacity-50 pointer-events-none" : "opacity-100"
                }`}
              >
                <TextField
                  type="text"
                  name="city"
                  disabled={isRemote}
                  required={!isRemote}
                >
                  <Label>City</Label>
                  <Input placeholder="e.g., Dhaka" />
                </TextField>
                <TextField
                  type="text"
                  name="country"
                  disabled={isRemote}
                  required={!isRemote}
                >
                  <Label>Country</Label>
                  <Input placeholder="e.g., Bangladesh" />
                </TextField>
              </div>
            </div>
          </div>

          {/* Card: Identity Context */}
          <div className="bg-default-50 border border-divider/60 rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-default-500 uppercase tracking-wider">
              Posting Identity
            </h3>

            <div className="flex flex-col gap-3">
              <Input
                type="text"
                name="recruiterName"
                label="Recruiter Name"
                readOnly
                defaultValue={recruiterName}
                variant="flat"
                radius="md"
                className="cursor-not-allowed"
              />

              <Input
                type="email"
                name="recruiterEmail"
                label="Contact Email"
                readOnly
                defaultValue={recruiterEmail}
                variant="flat"
                radius="md"
                className="cursor-not-allowed"
              />
            </div>

            <p className="text-[11px] text-default-400 leading-normal border-t border-divider/50 pt-2">
              This field is verified and locked to your active profile account
              session.
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR: Core Content Fields (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-content1 border border-divider rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Role Details & Content
              </h2>
              <p className="text-xs text-default-400 mt-0.5">
                Clearly describe the role details below to attract matching
                professional applications.
              </p>
            </div>

            {/* Responsibilities */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">
                Responsibilities <span className="text-danger">*</span>
              </Label>
              <TextArea
                required
                name="responsibilities"
                placeholder="Outline the day-to-day dynamic tasks and architecture milestones expected from this hire..."
                variant="secondary"
                radius="md"
                className={"md:min-h-20 "}
              />
              <p className="text-xs text-default-400 px-0.5">
                Describe the key duties and day-to-day tasks for this role.
              </p>
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">
                Requirements <span className="text-danger">*</span>
              </Label>
              <TextArea
                required
                name="requirements"
                placeholder="e.g., 3+ years of enterprise production React ecosystem experience, deep knowledge of underlying core engineering mechanics..."
                variant="secondary"
                radius="md"
                className={"md:min-h-20 "}
              />
              <p className="text-xs text-default-400 px-0.5">
                Skills, qualifications and experience the candidate must have.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">
                Benefits{" "}
                <span className="text-xs text-default-400 font-normal">
                  (optional)
                </span>
              </Label>
              <TextArea
                name="benefits"
                placeholder="Mention competitive advantages like comprehensive health protection coverage, flexible dynamic workspaces, or high performance equipment allowances..."
                variant="secondary"
                radius="md"
                className={"md:min-h-20 "}
              />
            </div>
          </div>

          {/* Action Footer Drawer */}
          <div className="flex items-center justify-end gap-3 bg-content1 border border-divider rounded-2xl p-4 shadow-sm">
            <Button
              type="reset"
              variant="flat"
              color="default"
              className="font-medium px-6"
              // onPress={handleReset}
            >
              Reset Form
            </Button>

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="px-10 font-medium shadow-md shadow-primary/20 transition-transform active:scale-[0.98]"
            >
              Post Job Listing
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
