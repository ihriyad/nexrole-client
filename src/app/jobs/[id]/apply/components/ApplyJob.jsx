"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FiLink, FiFileText, FiMessageSquare } from "react-icons/fi";
import { addNewApplication } from "@/lib/actions/applications";
import { toast } from "sonner";

export const ApplyJob = ({ job, applicant }) => {
  const { companyName, jobTitle, _id: jobId } = job;
  // Fallbacks support safe rendering if applicant context loads asynchronously
  const applicantEmail = applicant?.email || "";

  const [formData, setFormData] = useState({
    portfolioUrl: "",
    cvUrl: "",
    coverLetter: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    // Payload packaging all candidate records alongside strict operational details
    const applicationPayload = {
      jobId,
      jobTitle,
      companyName,
      applicantEmail,
      portfolioUrl: formData.portfolioUrl,
      cvUrl: formData.cvUrl,
      coverLetter: formData.coverLetter,
      appliedAt: new Date().toISOString(),
    };

    try {
      const data = await addNewApplication(applicationPayload);

      if (data.insertedId) {
        toast.success("Application submitted successfully!");
      }
      setFormData({ portfolioUrl: "", cvUrl: "", coverLetter: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Submission failed. Please check parameters and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#121212] border border-neutral-800 rounded-2xl p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Apply for this Position
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Submitting credentials directly to{" "}
          <span className="text-white font-semibold">{companyName}</span> for{" "}
          <span className="text-white font-semibold">{jobTitle}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Portfolio link input */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="portfolioUrl"
            className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <FiLink className="w-3.5 h-3.5 text-purple-400" />
            Portfolio Link
          </label>
          <input
            id="portfolioUrl"
            type="url"
            name="portfolioUrl"
            required
            placeholder="https://yourportfolio.com"
            value={formData.portfolioUrl}
            onChange={handleChange}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors"
          />
        </div>

        {/* CV / Resume link input */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cvUrl"
            className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <FiFileText className="w-3.5 h-3.5 text-pink-400" />
            CV / Resume Link
          </label>
          <input
            id="cvUrl"
            type="url"
            name="cvUrl"
            required
            placeholder="https://drive.google.com/... / Hosted link"
            value={formData.cvUrl}
            onChange={handleChange}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors"
          />
        </div>

        {/* Cover letter text block component field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="coverLetter"
            className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <FiMessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            Message to Recruiter
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            required
            rows={5}
            placeholder="Introduce yourself briefly and outline why your background aligns perfectly with this opportunity..."
            value={formData.coverLetter}
            onChange={handleChange}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Submission notification logs alerts box updates */}
        {status.message && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-medium leading-relaxed ${
              status.type === "success"
                ? "bg-emerald-950/30 border-emerald-900 text-emerald-400"
                : "bg-red-950/30 border-red-900 text-red-400"
            }`}
          >
            {status.message}
          </div>
        )}

        {/* Dynamic dispatch controller handling system loops execution patterns state */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-bold text-sm h-11 rounded-xl hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:pointer-events-none mt-2"
        >
          {loading ? "Transmitting Profile..." : "Submit Application Form"}
        </Button>
      </form>
    </div>
  );
};

export default ApplyJob;
