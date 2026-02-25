import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Technology } from "@/components/Technology";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Technology />
      <CTA />
    </main>
  );
}
