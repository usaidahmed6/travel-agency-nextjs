"use client";

import Image from "next/image";
import { services } from "@/data/content";
import type { ServiceKey } from "@/data/types";
import { useReveal } from "@/hooks/useReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OPEN_TAB_EVENT } from "./SearchPanel";
import { unsplash } from "@/lib/utils";

const icons: Record<ServiceKey, IconName> = { visa: "visa", flight: "plane", hotel: "hotel", car: "car" };

function openTab(key: ServiceKey) {
  window.dispatchEvent(new CustomEvent(OPEN_TAB_EVENT, { detail: key }));
  document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
}

export function Services() {
  const scope = useReveal<HTMLElement>();

  // GSAP hover: lift the card, zoom the photo and spin the icon badge
  useGSAP(
    (_, contextSafe) => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      const cleanups = cards.map((card) => {
        const img = card.querySelector(".service-img");
        const badge = card.querySelector(".service-badge");
        const arrow = card.querySelector(".service-arrow");
        const enter = contextSafe!(() => {
          gsap.to(card, { y: -10, boxShadow: "0 30px 60px -20px rgba(11,27,43,0.35)", duration: 0.4, ease: "power3.out" });
          gsap.to(img, { scale: 1.12, duration: 0.8, ease: "power3.out" });
          gsap.to(badge, { rotate: 360, duration: 0.7, ease: "back.out(1.6)" });
          gsap.to(arrow, { x: 6, duration: 0.3 });
        });
        const leave = contextSafe!(() => {
          gsap.to(card, { y: 0, boxShadow: "0 10px 30px -15px rgba(11,27,43,0.15)", duration: 0.4, ease: "power3.out" });
          gsap.to(img, { scale: 1, duration: 0.8, ease: "power3.out" });
          gsap.set(badge, { rotate: 0 });
          gsap.to(arrow, { x: 0, duration: 0.3 });
        });
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        return () => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        };
      });
      return () => cleanups.forEach((fn) => fn());
    },
    { scope },
  );

  return (
    <section id="services" ref={scope} className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Four services, one seamless trip"
          description="Book each piece on its own or let one advisor tie your visa, flight, stay and car together."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.key}
              data-reveal
              className="service-card group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_-15px_rgba(11,27,43,0.15)] ring-1 ring-slate-100"
            >
              <div className="relative h-48 overflow-hidden">
                <Image src={unsplash(s.image, 700)} alt={s.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="service-img object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <span className="service-badge absolute -bottom-6 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white shadow-lg">
                  <Icon name={icons[s.key]} size={22} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 pt-9">
                <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2"><Icon name="check" size={16} className="text-brand" />{f}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openTab(s.key)}
                  className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-brand"
                >
                  Book now <Icon name="arrow" size={16} className="service-arrow" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
