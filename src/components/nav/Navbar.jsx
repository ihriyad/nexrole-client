"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";

const links = [
  { label: "Home", href: "/" },
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company", isPrivate: true },
  { label: "Pricing", href: "/plans", isPrivate: true },
  { label: "Dashboard", href: "/dashboard/recruiter", isPrivate: true },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending, error, refetch } = authClient.useSession();
  const user = session?.user;
  // console.log(user, "user from navbar");

  // const isActive = (href) => pathname === href;
  const isActive = (href) => {
    if (href === "/dashboard/recruiter") {
      // Matches '/dashboard', '/dashboard/recruiter', '/dashboard/recruiter/jobs', etc.
      return pathname === href || pathname.startsWith(`${href}/`);
    }
    return pathname === href;
  };

  const visibleLinks = links.filter((link) => !link.isPrivate || user);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  const navContent = (
    <ul className="flex flex-col md:flex-row md:items-center text-sm gap-1 p-4 md:p-0">
      {visibleLinks.map((link) => {
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors
                    ${
                      isActive(link.href)
                        ? "underline"
                        : "text-zinc-400 hover:bg-zinc-800/30 hover:text-white"
                    }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1a1a1a] border-b border-zinc-800 text-white">
      <header className="flex items-center justify-between p-3 md:p-4">
        {/* Left: Logo & Mobile Menu Toggle Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-zinc-400 hover:text-white transition-colors p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <IoMdClose size={26} /> : <RiMenu2Fill size={26} />}
          </button>

          {/* Logo element styling */}
          <Link
            href="/"
            className="hidden md:flex text-xl font-bold tracking-tight items-center"
          >
            <span className="text-cyan-400">Nex</span>
            <span className="text-zinc-400 font-extrabold">Role</span>
          </Link>
        </div>

        {/* Right*/}
        <section className="flex items-center gap-3">
          <div className="hidden items-center gap-6 md:flex bg-default rounded-4xl">
            {navContent}
          </div>
          {/* Vertical Separator Line */}
          <div className="hidden md:flex h-5 w-px bg-gray-400 mx-1" />
          <div>
            {/* Action Auth Buttons */}
            {user ? (
              <div className="flex gap-2 items-center">
                <h1 className="text-sm">Welcome,{user.name}</h1>
                <Button
                  onClick={() => handleLogout()}
                  size="sm"
                  className={"rounded-sm"}
                  variant="danger-soft"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-[#4d3df7] to-[#703bf7] hover:from-[#5b4cf8] hover:to-[#7c4ffa] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </section>
      </header>

      {/* Mobile Menu Dropdown Panel */}
      {isMenuOpen && (
        <div className="border-t border-zinc-800 bg-[#1a1a1a] md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {navContent}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
