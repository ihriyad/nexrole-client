"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "technology", label: "Technology" },
  { id: "operations", label: "Operations" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
];

const JOB_TYPES = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contract", label: "Contract" },
];

export const JobFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") || "all";
  const activeRemote = searchParams.get("isRemote") === "true";
  const activeTypes = searchParams.get("type")?.split(",").filter(Boolean) || [];

  // Single source of truth for pushing URL state — wrapped in a transition
  // so navigation doesn't block the UI thread while the server refetches
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleTypeChange = (typeId, isChecked) => {
    const updatedTypes = isChecked
      ? [...activeTypes, typeId]
      : activeTypes.filter((t) => t !== typeId);
    updateFilter("type", updatedTypes.join(","));
  };

  return (
    <div
      className={`flex flex-col gap-6 p-5 bg-[#121212] border border-neutral-800 rounded-2xl h-fit w-full transition-opacity ${
        isPending ? "opacity-60" : "opacity-100"
      }`}
    >
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
        Filters
      </h4>

      {/* Category — native select, fully controllable */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="category-filter"
          className="text-xs font-semibold text-neutral-400"
        >
          Job Category
        </label>
        <select
          id="category-filter"
          value={activeCategory}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-md text-white text-sm px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <hr className="border-neutral-800" />

      {/* Job Type — native checkboxes */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold text-neutral-400">Job Type</span>
        <div className="flex flex-col gap-2.5">
          {JOB_TYPES.map((type) => (
            <label
              key={type.id}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={activeTypes.includes(type.id)}
                onChange={(e) => handleTypeChange(type.id, e.target.checked)}
                className="w-4 h-4 rounded border-neutral-700 bg-[#1a1a1a] text-primary accent-primary cursor-pointer"
              />
              <span className="text-sm text-neutral-300">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-neutral-800" />

      {/* Remote Only — native checkbox, box and label same line */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={activeRemote}
          onChange={(e) =>
            updateFilter("isRemote", e.target.checked ? "true" : "")
          }
          className="w-4 h-4 rounded border-neutral-700 bg-[#1a1a1a] text-primary accent-primary cursor-pointer"
        />
        <span className="text-sm text-neutral-300">Remote Only</span>
      </label>
    </div>
  );
};

export default JobFilter;