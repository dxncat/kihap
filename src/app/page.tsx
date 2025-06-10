import { CTA, Features, Hero, Navbar, Testimonials } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
}
