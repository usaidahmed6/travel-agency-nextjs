"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { unsplash } from "@/lib/utils";

const headline = ["Your", "next", "journey,", "planned", "end", "to", "end."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-bg", { scale: 1.25, duration: 2.4, ease: "power2.out" })
        .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 }, 0.3)
        .from(".hero-word", { yPercent: 110, duration: 1.1, stagger: 0.07 }, 0.4)
        .from(".hero-copy", { y: 24, opacity: 0, duration: 0.9 }, 1.0)
        .from(".hero-cta > *", { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, 1.15)
        .from(".hero-card", { x: 60, opacity: 0, duration: 1, stagger: 0.15 }, 1.2);

      // Floating cards drift continuously after they arrive
      gsap.to(".hero-card", {
        y: -12,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.6,
        delay: 2.4,
      });

      // Parallax: background moves slower than the page while the hero scrolls out
      gsap.to(".hero-bg", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-48 sm:pb-56">
      <div className="hero-bg absolute inset-0 -z-10">
        <Image
          src={unsplash("1507525428034-b723cf961d3e", 2000)}
          alt="Turquoise ocean and white sand beach"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink/60 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <p className="hero-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Visas · Flights · Hotels · Cars
          </p>
          <h1 className="font-display text-[2.6rem] leading-[1.05] font-semibold text-white sm:text-6xl lg:text-7xl">
            {headline.map((word, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-1 align-bottom">
                <span className={`hero-word inline-block ${word === "journey," ? "text-gold italic" : ""}`}>{word}</span>
              </span>
            ))}
          </h1>
          <p className="hero-copy mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            From visa paperwork to the car waiting at arrivals, Voyara handles every booking so you only have to
            pack.
          </p>
          <div className="hero-cta mt-9 flex flex-wrap gap-4">
            <LinkButton href="#search" variant="secondary">
              Start planning <Icon name="arrow" size={18} />
            </LinkButton>
            <LinkButton href="#destinations" variant="light">
              Explore destinations
            </LinkButton>
          </div>
        </div>

        <div className="relative hidden h-[360px] lg:block">
          <div className="hero-card absolute top-0 right-6 w-64 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand"><Icon name="plane" /></span>
              <div>
                <p className="text-xs text-slate-500">ISB → DXB</p>
                <p className="font-semibold text-ink">Flight confirmed</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
              <span>Emirates EK 615</span><span className="font-semibold text-brand">$412</span>
            </div>
          </div>
          <div className="hero-card absolute top-36 left-0 w-60 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Icon name="check" /></span>
              <div>
                <p className="text-xs text-slate-500">UAE Tourist Visa</p>
                <p className="font-semibold text-ink">Approved in 3 days</p>
              </div>
            </div>
          </div>
          <div className="hero-card absolute right-0 bottom-0 w-56 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur">
            <p className="text-xs text-slate-500">Rated by travellers</p>
            <p className="mt-1 font-display text-3xl font-semibold text-ink">4.9<span className="text-base text-slate-400">/5</span></p>
            <p className="text-xs text-slate-500">from 3,200+ reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
