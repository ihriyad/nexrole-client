import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import {
  FiCheckCircle,
  FiMail,
  FiArrowRight,
  
  FiCreditCard,
} from "react-icons/fi";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  // Safely retrieving details from Stripe with expanded line item context
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details, amount_total, currency } = session;
  const customerEmail = customer_details?.email || "";

  if (status === "open") {
    return redirect("/");
  }

  // Render pristine interactive dashboard state upon verification success
  if (status === "complete") {
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "usd",
    }).format(amount_total / 100);

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-[#121212] border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
          {/* Subtle decorative background gradient glow */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Glowing Animated Success Icon badge */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md scale-110" />
            <div className="w-14 h-14 rounded-full bg-emerald-950/40 border border-emerald-500 flex items-center justify-center text-emerald-400 relative">
              <FiCheckCircle className="w-7 h-7 stroke-[2.5]" />
            </div>
          </div>

          {/* Success Typography Blocks */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              Payment Successful{" "}
              
            </h1>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed max-w-xs mx-auto">
              Your transactional record was authorized safely. Your account tier
              updates have been applied instantly.
            </p>
          </div>

          {/* Mini Invoice Summary Panel Card */}
          <div className="w-full bg-black border border-neutral-800/60 rounded-xl p-4 mb-6 flex flex-col gap-2.5 text-left">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                <FiCreditCard className="w-3.5 h-3.5" /> Amount Settled
              </span>
              <span className="text-sm font-bold text-emerald-400">
                {formattedAmount}
              </span>
            </div>

            <div className="flex items-start gap-2.5 pt-0.5">
              <FiMail className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  Confirmation Dispatch
                </h4>
                <p className="text-xs text-neutral-300 font-medium truncate max-w-[240px] mt-0.5">
                  {customerEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Helpdesk Warning Callout Text link */}
          <p className="text-[11px] text-neutral-500 leading-relaxed mb-8">
            Encountering latency? Reach our system engineers directly via{" "}
            <a
              href="mailto:orders@example.com"
              className="text-neutral-300 hover:text-white underline font-medium transition-colors"
            >
              orders@example.com
            </a>
            .
          </p>

          {/* Dynamic Link Nav Action Button */}
          <Link
            href="/jobs"
            className="w-full bg-white text-black font-bold text-sm h-11 rounded-xl hover:bg-neutral-200 transition-all shadow-md flex items-center justify-center gap-1.5 group"
          >
            Start Browsing Positions
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </main>
    );
  }
}
