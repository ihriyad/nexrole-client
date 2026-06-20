import Navbar from "@/components/nav/Navbar";
import React from "react";

export const BrowseJobsLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Responsive Layout Shell Wrapper */}
        <div className="flex flex-col md:flex-row gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BrowseJobsLayout;