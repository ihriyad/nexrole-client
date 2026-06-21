"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FiAlertCircle, FiArrowLeft, FiHome } from "react-icons/fi";


export const UnauthorizedPage = () => {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#121212] border border-neutral-800/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl relative">
        {/* Animated Radar Alert Badge */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping opacity-75 scale-125" />
          <div className="w-14 h-14 rounded-full bg-red-950/30 border border-red-900/60 flex items-center justify-center text-red-400 relative">
          <FiAlertCircle className="w-7 h-7 stroke-[2]" />
          </div>
        </div>

        {/* Message Blocks */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            
            Access Restricted
          </h1>
          <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed max-w-xs mx-auto">
            Your current account tier or profile role doesn&#39;t possess the
            required clearances to load this resource.
          </p>
        </div>

        {/* Informative Error Code Stamp */}
        <div className="px-3 py-1 bg-neutral-900/60 border border-neutral-800 rounded-md text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-8">
          Error Code: 403_Forbidden
        </div>

        {/* Contextual Action Redirect Grid */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => window.history.back()}
            className="flex-1 bg-neutral-900 text-neutral-200 border border-neutral-800 font-bold text-xs h-10 rounded-xl hover:bg-neutral-800 hover:text-white transition-all flex items-center justify-center gap-1.5"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            Go Back
          </Button>

          <Link href="/" passHref className="flex-1">
            <Button className="w-full bg-white text-black font-bold text-xs h-10 rounded-xl hover:bg-neutral-200 transition-all shadow-sm flex items-center justify-center gap-1.5">
              <FiHome className="w-3.5 h-3.5" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
