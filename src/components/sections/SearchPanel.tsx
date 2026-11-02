"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ServiceKey } from "@/data/types";
import { Icon, type IconName } from "@/components/ui/Icon";
import { FlightSearch } from "@/components/search/FlightSearch";
import { HotelSearch } from "@/components/search/HotelSearch";
import { CarSearch } from "@/components/search/CarSearch";
import { VisaSearch } from "@/components/search/VisaSearch";
import { cn } from "@/lib/utils";

const tabs: { key: ServiceKey; label: string; icon: IconName }[] = [
  { key: "flight", label: "Flights", icon: "plane" },
  { key: "hotel", label: "Hotels", icon: "hotel" },
  { key: "car", label: "Car Rental", icon: "car" },
  { key: "visa", label: "Visa", icon: "visa" },
];

/** Event other sections dispatch to jump straight to a booking tab. */
export const OPEN_TAB_EVENT = "voyara:open-tab";

export function SearchPanel() {
  const [active, setActive] = useState<ServiceKey>("flight");
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => setActive((e as CustomEvent<ServiceKey>).detail);
    window.addEventListener(OPEN_TAB_EVENT, handler);
    return () => window.removeEventListener(OPEN_TAB_EVENT, handler);
  }, []);

  useGSAP(
    () => {
      gsap.from(".search-shell", { y: 60, opacity: 0, duration: 1.1, delay: 1.3, ease: "power3.out" });
    },
    { scope: panel },
  );

  // Fade in the form each time the tab changes
  useGSAP(
    () => {
      gsap.fromTo(".search-body", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
    },
    { scope: panel, dependencies: [active] },
  );

  return (
    <section id="search" ref={panel} className="relative z-20 -mt-36 scroll-mt-24 px-4 sm:-mt-44 sm:px-6 lg:px-8">
      <div className="search-shell mx-auto max-w-6xl rounded-3xl bg-white p-4 shadow-[0_30px_80px_-20px_rgba(11,27,43,0.35)] sm:p-6">
        <div role="tablist" aria-label="Booking type" className="mb-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              type="button"
              aria-selected={active === tab.key}
              onClick={() => setActive(tab.key)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                active === tab.key
                  ? "bg-ink text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-brand-light hover:text-brand",
              )}
            >
              <Icon name={tab.icon} size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="search-body" role="tabpanel">
          {active === "flight" && <FlightSearch />}
          {active === "hotel" && <HotelSearch />}
          {active === "car" && <CarSearch />}
          {active === "visa" && <VisaSearch />}
        </div>
      </div>
    </section>
  );
}
