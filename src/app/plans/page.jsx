"use client";

import React, { useState } from "react";
import { Button, Card } from "@heroui/react";
import {
  FiCheck,
  FiZap,
  FiBriefcase,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

const SEEKER_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description:
      "Ideal for fresh applicants building their initial engineering portfolios.",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic candidate profile setup",
      "Standard email alerts",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "month",
    description:
      "Perfect for active candidates tracking competitive modern web developer roles.",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs history",
      "Real-time application tracking metrics",
      "Platform salary marketplace insights",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Premium",
    price: "$39",
    period: "month",
    description:
      "Ultimate toolkit engineered for maximum developer visibility.",
    features: [
      "Everything in Pro tier analytics",
      "Unlimited monthly applications",
      "Profile boost rank to active recruiters",
      "Early access to fresh job posts",
      "Priority customer helpdesk support",
    ],
    cta: "Go Premium",
    popular: false,
  },
];

const RECRUITER_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description:
      "Excellent layout parameters suited for a company's first year of rapid hiring.",
    features: [
      "Up to 3 active job posts simultaneously",
      "Basic structural applicant management",
      "Standard system listing visibility",
    ],
    cta: "Start Free Posting",
    popular: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "month",
    description:
      "Scale up operations pipeline workflows across multi-tier team openings.",
    features: [
      "Up to 10 active job posts concurrently",
      "Full interactive applicant tracking dashboard",
      "Basic conversion insights & analytics",
      "Dedicated corporate email support",
    ],
    cta: "Scale with Growth",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "month",
    description:
      "Complete management ecosystem for high-volume platform operations structures.",
    features: [
      "Up to 50 active job posts concurrently",
      "Advanced predictive analytics dashboard",
      "Featured listing visibility upgrades",
      "Multi-user team collaboration seats",
      "Custom company asset branding matrices",
      "Dedicated round-the-clock priority support",
    ],
    cta: "Contact Enterprise",
    popular: false,
  },
];

const FAQ_ITEMS = [
  {
    question: "Can I switch or modify my chosen tier anytime?",
    answer:
      "Absolutely. You can seamlessly scale up or down between system plans at any given point via your profile billing configuration console. System adjustments apply immediately.",
  },
  {
    question: "How do cancellations work across monthly cycles?",
    answer:
      "You remain completely free to terminate monthly billing profiles whenever you wish. Your active parameters hold utility right up to the literal final hour of your current paid duration timeframe.",
  },
  {
    question: "What is your baseline transaction refund protocol?",
    answer:
      "We offer clear, unconditional 14-day refund parameters on premium tiers if the matching analytics do not fully live up to your professional delivery expectations.",
  },
  {
    question:
      "Which custom payment processing configurations are handled safely?",
    answer:
      "We support safe, high-grade tokens processing through all top secure setups including international credit card frameworks, digital wallets, or direct bank routing mechanics.",
  },
];

const AUDIENCE_TABS = [
  {
    key: "seekers",
    icon: FiUser,
    label: "For Job Seekers",
    plans: SEEKER_PLANS,
  },
  {
    key: "recruiters",
    icon: FiBriefcase,
    label: "For Recruiters",
    plans: RECRUITER_PLANS,
  },
];

export const PlansPage = () => {
  const [activeTab, setActiveTab] = useState("seekers");
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const currentPlans =
    AUDIENCE_TABS.find((t) => t.key === activeTab)?.plans ?? [];

  return (
    <main className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <header className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            Predictable Plans Built for Scale
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Pick a tier optimized exactly around your structural journey—whether
            browsing target technology roles or building teams.
          </p>
        </header>

        {/* Native tab switcher — plain buttons + state, no collection API */}
        <div className="w-full flex justify-center border-b border-neutral-800">
          <div className="flex gap-6">
            {AUDIENCE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 h-11 text-sm font-bold transition-colors border-b-2 -mb-px ${
                    isActive
                      ? "text-white border-purple-500"
                      : "text-neutral-400 border-transparent hover:text-neutral-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plan grid for the active tab */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full items-stretch">
          {currentPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-[#121212] border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "border-purple-500 shadow-[0_0_24px_rgba(147,51,234,0.15)] md:-translate-y-2"
                  : "border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-purple-600 text-[10px] font-black uppercase tracking-widest text-white rounded-full flex items-center gap-1">
                  <FiZap className="w-2.5 h-2.5 fill-current" /> Most Popular
                </span>
              )}
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed min-h-[32px]">
                    {plan.description}
                  </p>
                </div>
                <div className="flex items-baseline gap-1 mb-6 border-b border-neutral-800/60 pb-5">
                  <span className="text-3xl font-black text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    /{plan.period}
                  </span>
                </div>
                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-neutral-300 leading-normal"
                    >
                      <FiCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <form action="/api/checkout_sessions" method="POST">
                <section>
                  <button
                    className={`w-full font-bold text-xs h-10 rounded-xl transition-all ${
                      plan.popular
                        ? "bg-purple-600 text-white hover:bg-purple-500 shadow-md"
                        : "bg-neutral-900 text-neutral-200 border border-neutral-800 hover:bg-neutral-800 hover:text-white"
                    }`}
                    type="submit"
                    role="link"
                  >
                    {plan.cta}
                  </button>
                </section>
              </form>
            </Card>
          ))}
        </div>

        <hr className="w-full border-neutral-900 my-20" />

        {/* FAQ accordion */}
        <section className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Everything you need to verify regarding billing mechanisms.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#121212] border border-neutral-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white transition-colors">
                      {item.question}
                    </span>
                    <FiChevronDown
                      className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? "transform rotate-180 text-white" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen
                        ? "max-h-32 opacity-100 border-t border-neutral-800/60"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="p-5 text-xs text-neutral-400 leading-relaxed font-normal bg-black/20">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default PlansPage;
