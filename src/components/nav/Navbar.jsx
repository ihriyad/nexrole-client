"use client";

import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#1a1a1a] border-b border-zinc-800 text-white">
      <header className="flex h-20 items-center justify-between px-8 max-w-7xl mx-auto">
        {/* Left: Logo & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-zinc-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo matching image text colors */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight flex items-center"
          >
            <span className="text-cyan-400">Nex</span>
            <span className="text-gray-400 font-extrabold">Role</span>
          </Link>
        </div>

        {/* Right: Desktop Links, Divider, and Auth Buttons */}
        <div className="hidden items-center gap-6 md:flex bg-background-secondary px-2 rounded-md">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="#"
                className="text-zinc-300 hover:text-white text-sm transition-colors"
              >
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-zinc-300 hover:text-white text-sm transition-colors"
              >
                Company
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-zinc-300 hover:text-white text-sm transition-colors"
              >
                Pricing
              </Link>
            </li>
          </ul>

          {/* Vertical Divider Line */}
          <div className="h-5 w-[1px] bg-zinc-700 mx-2" />

          {/* Action Links */}
          <Link
            href="/login"
            className="text-[#635bff] hover:text-[#7a73ff] text-sm font-medium transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-gradient-to-r from-[#4d3df7] to-[#703bf7] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="border-t border-zinc-800 bg-[#1a1a1a] md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link
                href="#"
                className="block py-2 text-zinc-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 text-zinc-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Company
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 text-zinc-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <div className="h-[1px] bg-zinc-800 my-2" />
            <li>
              <Link
                href="#"
                className="block py-2 text-[#635bff]"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href="#"
                className="block w-full text-center bg-gradient-to-r from-[#4d3df7] to-[#703bf7] text-white py-2.5 rounded-xl"
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
