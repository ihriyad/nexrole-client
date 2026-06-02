"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { label: "Browse Jobs", href: "/browse-jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing", isPrivate: true },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, isPending, error, refetch } = authClient.useSession();
  const user = session?.user;
  console.log(user, "user from navbar");

  const isActive = (href) => pathname === href;

  const visibleLinks = links.filter((link) => !link.isPrivate || user);
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1a1a1a] border-b border-zinc-800 text-white">
      <header className="flex h-20 items-center justify-between px-6 md:px-8 max-w-7xl mx-auto">
        {/* Left: Logo & Mobile Menu Toggle Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-zinc-400 hover:text-white transition-colors p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>

          {/* Logo element styling */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight flex items-center"
          >
            <span className="text-cyan-400">Nex</span>
            <span className="text-zinc-400 font-extrabold">Role</span>
          </Link>
        </div>

        {/* Right Desktop Links & Actions Layout Container */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-1">
            {visibleLinks.map((link) => {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2  text-sm font-medium transition-all duration-200 block
                    ${
                      isActive(link.href)
                        ? "underline"
                        : "text-zinc-400 hover:bg-zinc-800/30 hover:text-cyan-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Vertical Separator Line */}
          <div className="h-5 w-[1px] bg-gray-400 mx-1" />

          {/* Action Auth Buttons */}
          {user ? (
            <>
              <h1>Welcome,{user.name}</h1>
            </>
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
      </header>

      {/* Mobile Menu Dropdown Panel */}
      {isMenuOpen && (
        <div className="border-t border-zinc-800 bg-[#1a1a1a] md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-1 p-4">
            {visibleLinks.map((link) => {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors
                    ${
                      isActive(link.href)
                        ? "underline"
                        : "text-zinc-400 hover:bg-zinc-800/30 hover:text-cyan-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            <div className="h-[1px] bg-zinc-800 my-2 mx-2" />

            <li>
              <Link
                href="/login"
                className="block w-full px-4 py-3 text-zinc-400 hover:text-white text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
            <li className="pt-2 px-2">
              <Link
                href="/register"
                className="block w-full text-center bg-gradient-to-r from-[#4d3df7] to-[#703bf7] text-white py-3 rounded-xl font-medium shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
