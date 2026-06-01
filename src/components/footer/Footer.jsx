import React from "react";
import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#09090b] text-zinc-400 py-16 px-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4">
        {/* Left Column: Brand & Description */}
        <div className="md:col-span-5 flex flex-col justify-between gap-8">
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight flex items-center"
            >
              <span className="text-cyan-400">Nex</span>
              <span className="text-gray-400 font-extrabold">Role</span>
            </Link>
            <p className="text-sm max-w-sm leading-relaxed text-zinc-500">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Social Icons matching the button styling in the image */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-900/60 border border-zinc-800 text-white hover:bg-[#6b59ff] transition-colors"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-lg  text-white hover:bg-[#6b59ff] transition-colors"
            >
              <FaPinterestP size={16} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-900/60 border border-zinc-800 text-white hover:bg-[#6b59ff] transition-colors"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>

        {/* Right Columns: Links Sections */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Product Links */}
          <div>
            <h4 className="text-[#5844ff] font-medium mb-5 text-sm">Product</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Job discovery
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Worker AI
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigations Links */}
          <div>
            <h4 className="text-[#5844ff] font-medium mb-5 text-sm">
              Navigations
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Help center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Career library
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-[#5844ff] font-medium mb-5 text-sm">
              Resources
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Brand Guideline
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright & Legal */}
      <div className="max-w-7xl mx-auto border-t border-zinc-900/80 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
        <p>Copyright 2024 — Programming Hero</p>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-zinc-400 transition-colors">
            Terms & Policy
          </Link>
          <span>-</span>
          <Link href="#" className="hover:text-zinc-400 transition-colors">
            Privacy Guideline
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
