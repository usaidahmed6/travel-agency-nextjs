"use client";

import { stats, whyUs } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

const whyIcons: IconName[] = ["headset", "tag", "shield"];

export function Stats() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Why Voyara"
              title="Travel planning without the paperwork headache"
              description="Since 2012 we've booked trips for families, students and business teams across 60+ countries."
            />
            <div className="mt-10 space-y-6">
              {whyUs.map((item, i) => (
                <div key={item.title} data-reveal className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-gold">
                    <Icon name={whyIcons[i]} size={22} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} data-reveal className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
                <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
