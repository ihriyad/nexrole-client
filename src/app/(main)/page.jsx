import HeroSearch from "@/components/hero/HeroSearch";
import HeroStats from "@/components/hero/HeroStats";

export default function Home() {
  return (
    <section
      className="w-full bg-center bg-no-repeat bg-cover md:py-16 px-8 text-white "
      style={{ backgroundImage: "url('/images/globe.png')" }}
    >
      <HeroSearch></HeroSearch>
      <HeroStats></HeroStats>
    </section>
  );
}
