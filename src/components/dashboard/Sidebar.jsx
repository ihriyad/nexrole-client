"use client";
import { LayoutSideContentLeft } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGear } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import {
  MdAddCircleOutline,
  MdOutlineAppRegistration,
  MdOutlineDashboard,
} from "react-icons/md";
import { PiBuildingOfficeBold } from "react-icons/pi";

export function Sidebar() {
  const pathname = usePathname();
  const navItems = [
    {
      icon: <MdOutlineDashboard />,
      href: "/dashboard/recruiter",
      label: "Dashboard",
    },
    {
      icon: <PiBuildingOfficeBold />,
      href: "/dashboard/recruiter/company",
      label: "My Company",
    },

    {
      icon: <IoBagOutline />,
      href: "/dashboard/recruiter/jobs",
      label: "Manage Jobs",
    },
    {
      icon: <MdAddCircleOutline />,
      href: "/dashboard/recruiter/jobs/new",
      label: "New Job",
    },

    { icon: <MdOutlineAppRegistration />, href: "#", label: "Applications" },
    { icon: <FaGear />, href: "#", label: "Settings" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={`${pathname == item.href ? "bg-default rounded-xl text-white" : "hover:text-white"} text-muted text-sm flex items-center gap-2 px-2 py-2.5 `}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </nav>
  );
  return (
    <>
      <aside className="hidden md:block w-64 shrink-0 border-r border-default p-4">
        {navContent}
      </aside>
      <Drawer>
        <Button className={"md:hidden"} variant="">
          <LayoutSideContentLeft />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>NexRole</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
