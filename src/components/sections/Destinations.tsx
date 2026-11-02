"use client";

import Image from "next/image";
import { destinations } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn, formatPrice, unsplash } from "@/lib/utils";

export function Destinations() {
  const scope = useReveal<HTMLElement>();

  // GSAP hover: subtle 3D tilt that follows the cursor
  useGSAP(
    (_, contextSafe) => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      const cards = gsap.utils.toArray<HTMLElement>(".dest-card");
      const cleanups = cards.map((card) => {
        const img = card.querySelector(".dest-img");
        const info = card.querySelector(".dest-info");
        const move = contextSafe!((e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 900, duration: 0.5, ease: "power2.out" });
          gsap.to(img, { scale: 1.1, x: -x * 14, y: -y * 14, duration: 0.6, ease: "power2.out" });
          gsap.to(info, { y: -6, duration: 0.4 });
        });
        const leave = contextSafe!(() => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1, 0.6)" });
          gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" });
          gsap.to(info, { y: 0, duration: 0.4 });
        });
        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        return () => {
          card.removeEventListener("mousemove", move);
          card.removeEventListener("mouseleave", leave);
        };
      });
      return () => cleanups.forEach((fn) => fn());
    },
    { scope },
  );

  return (
    <section id="destinations" ref={scope} className="scroll-mt-20 bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Popular destinations"
            title="Where our travellers are heading"
            description="Package prices include return flights and hotel. Visa support available for every destination."
          />
          <a data-reveal href="#contact" className="flex shrink-0 items-center gap-2 text-sm font-semibold text-brand">
            Ask for a custom package <Icon name="arrow" size={16} />
          </a>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <div key={d.id} data-reveal className={cn(i === 0 && "lg:row-span-2")}>
              <a
                href="#search"
                className={cn(
                  "dest-card group relative block h-80 overflow-hidden rounded-3xl will-change-transform",
                  i === 0 && "lg:h-full lg:min-h-[664px]",
                )}
              >
                <Image
                  src={unsplash(d.image, 900)}
                  alt={`${d.city}, ${d.country}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="dest-img object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                {d.tag && (
                  <span className="absolute top-5 left-5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">{d.tag}</span>
                )}
                <span className="absolute top-5 right-5 flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  <Icon name="star" size={12} className="text-gold" /> {d.rating}
                </span>
                <div className="dest-info absolute inset-x-0 bottom-0 p-6">
                  <p className="flex items-center gap-1 text-xs text-white/75"><Icon name="pin" size={14} />{d.country}</p>
                  <h3 className="font-display text-3xl font-semibold text-white">{d.city}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-white/80">
                      from <span className="text-lg font-bold text-white">{formatPrice(d.priceFrom)}</span>
                    </p>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition group-hover:bg-gold">
                      <Icon name="arrow" size={18} />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
