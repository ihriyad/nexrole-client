import { Sidebar } from "@/components/dashboard/Sidebar";
import Navbar from "@/components/nav/Navbar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar></Sidebar>
      <div className="flex-1 ">{children}</div>
    </div>
    </>
  );
};

export default DashboardLayout;
