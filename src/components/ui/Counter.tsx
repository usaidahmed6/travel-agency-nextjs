"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface CounterProps {
  value: number;
  suffix?: string;
}

/** Counts up from 0 to `value` once the number scrolls into view. */
export function Counter({ value, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const counter = { n: 0 };
    el.textContent = `0${suffix}`;
    gsap.to(counter, {
      n: value,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = `${Math.round(counter.n).toLocaleString("en-US")}${suffix}`;
      },
    });
  }, [value, suffix]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
