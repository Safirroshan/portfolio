import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import AILab from "@/components/sections/AILab";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <AILab />
      <Contact />
    </main>
  );
}
