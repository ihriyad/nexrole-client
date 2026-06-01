import React from "react";
import { FiBriefcase, FiBarChart2, FiSearch, FiStar } from "react-icons/fi";

const HeroStats = () => {
  const statsData = [
    {
      icon: <FiBriefcase size={22} />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      icon: <FiBarChart2 size={22} />,
      value: "12K",
      label: "Companies",
    },
    {
      icon: <FiSearch size={22} />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      icon: <FiStar size={22} />,
      value: "97%",
      label: "Satisfication Rate", // Maintained typo spelling from your design source mockup
    },
  ];

  return (
    <section className="md:mt-50">
      <h1 className="text-gray-400 text-xl font-medium md:text-4xl text-center my-8 md:my-16">
        Assisting over <strong className="font-bold">15,000 job seekers</strong>{" "}
        <br /> find their dream positions.
      </h1>
      {/* Cards Grid layout Wrapper */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-8 flex flex-col justify-between min-h-[200px] shadow-xl hover:border-zinc-700 transition-colors duration-200"
          >
            {/* Card Top Section: Outlined Icon Wrapper */}
            <div className="text-zinc-400 self-start">{stat.icon}</div>

            {/* Card Bottom Section: Dynamic Content Blocks */}
            <div className="mt-8">
              <h3 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                {stat.value}
              </h3>
              <p className="text-sm text-zinc-400 font-normal">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroStats;
