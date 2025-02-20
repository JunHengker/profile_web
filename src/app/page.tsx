import Hero from "@/app/components/Hero";
import AboutMe from "@/app/components/AboutMe";
import Projects from "@/app/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1e1e1e]">
      <Hero />
      <AboutMe />
      <Projects />
    </main>
  );
}
