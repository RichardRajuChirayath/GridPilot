import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Simulation } from "@/components/Simulation";
import { Solution } from "@/components/Solution";
import { Technology } from "@/components/Technology";
import { CTA } from "@/components/CTA";
import { GridBackground } from "@/components/GridBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      <Navbar />
      <GridBackground />
      <div className="relative z-10">
        <Hero />
        <Problem />
        <Simulation />
        <Solution />
        <Technology />
        <CTA />
      </div>
    </main>
  );
}
