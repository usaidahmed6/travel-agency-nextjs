"use client";

import Image from "next/image";
import { testimonials } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Rating";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { unsplash } from "@/lib/utils";

export function Testimonials() {
  const scope = useReveal<HTMLElement>();

  return (
    <section id="testimonials" ref={scope} className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trips our travellers still talk about"
          description="Rated 4.9/5 from over 3,200 verified reviews."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              data-reveal
              className="relative flex flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_10px_30px_-15px_rgba(11,27,43,0.15)] transition duration-300 hover:-translate-y-1 hover:border-brand/30"
            >
              <Icon name="quote" size={40} className="absolute top-6 right-6 text-brand-light" />
              <Rating value={t.rating} />
              <blockquote className="mt-5 flex-1 leading-relaxed text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-6">
                <Image src={unsplash(t.avatar, 120)} alt={t.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
