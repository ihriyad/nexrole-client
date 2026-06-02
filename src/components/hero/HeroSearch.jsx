import { Button, Input, Label } from "@heroui/react";
import { FaEnvelope, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { FiBriefcase, FiMapPin, FiSearch } from "react-icons/fi";

const HeroSearch = () => {
  return (
    <section className="flex py-10 flex-col items-center gap-6 px-4 text-center ">
      {/* Badge */}
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm md:px-4 md:py-2">
        <span className=" md:text-lg">
          <FaEnvelope color="purple"></FaEnvelope>
        </span>
        <p className="text-xs font-semibold tracking-widest text-white md:text-sm">
          <span className="text-white">50,000+</span>{" "}
          <span className="">NEW JOBS THIS MONTH</span>
        </p>
      </div>

      {/* Headline */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-white  md:text-4xl lg:text-5xl">
          Find Your Dream Job Today
        </h1>
        <p className="mx-auto max-w-xs text-sm text-white/50 sm:max-w-lg sm:text-base md:max-w-xl md:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>
      </div>

      <form className="relative w-full flex flex-col md:flex-row justify-center max-w-lg gap-3 bg-gray-600/20 py-2 px-4 rounded-2xl">
        <div className="relative flex-1">
          <div className="relative">
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              size={14}
            />
            <input
              className="w-full bg-transparent border border-white/10 rounded-md pl-8 pr-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
              type="text"
              required
              placeholder="Job title, skill or company"
            />
          </div>
        </div>

        <div className="relative flex-1">
          <div className="relative">
            <FaMapMarkerAlt
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              size={14}
            />
            <input
              className="w-full bg-transparent border border-white/10 rounded-md pl-8 pr-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
              required
              type="text"
              placeholder="Location or Remote"
            />
          </div>
        </div>

        {/* Submit button — full width on mobile, auto on desktop */}
        <button
          type="submit"
          className="w-full md:w-auto self-end bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-4 py-2 flex items-center justify-center gap-2 text-sm transition-colors"
        >
          <FaSearch size={12} />
          Search
        </button>
      </form>

      {/* Trending tags */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-white/30 sm:text-sm">
          Trending Position
        </span>
        {["Product Designer", "AI Engineering", "Dev-ops Engineer"].map(
          (tag) => (
            <button
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 transition-colors hover:border-white/20 hover:text-white/80 sm:px-4 sm:py-1.5 sm:text-sm"
            >
              {tag}
            </button>
          ),
        )}
      </div>
    </section>
  );
};

export default HeroSearch;
