import { Sidebar } from "@/components/dashboard/Sidebar";
import Navbar from "@/components/nav/Navbar";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const DashboardLayout = async({ children }) => {
  const user = await getUserSession();
  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar user={user}></Sidebar>
      <div className="flex-1">{children}</div>
    </div>
    </>
  );
};

export default DashboardLayout;
