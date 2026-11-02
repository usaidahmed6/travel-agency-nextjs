import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SearchPanel } from "@/components/sections/SearchPanel";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Destinations } from "@/components/sections/Destinations";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SearchPanel />
        <Services />
        <Stats />
        <Destinations />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
