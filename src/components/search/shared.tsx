"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cn, wait } from "@/lib/utils";

type Status = "idle" | "loading" | "done";

/** Runs a synchronous mock query behind a short fake delay and tracks its state. */
export function useMockSearch<T>() {
  const [status, setStatus] = useState<Status>("idle");
  const [results, setResults] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function run(query: () => T[] | string) {
    setError(null);
    setStatus("loading");
    await wait(700);
    const out = query();
    if (typeof out === "string") {
      setError(out);
      setStatus("idle");
      return;
    }
    setResults(out);
    setStatus("done");
  }

  return { status, results, error, run };
}

export function Field({ label, htmlFor, children, className }: { label: string; htmlFor: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label-text">{label}</label>
      {children}
    </div>
  );
}

export function SearchButton({ loading, label = "Search" }: { loading: boolean; label?: string }) {
  return (
    <Button type="submit" disabled={loading} className="h-[46px] w-full">
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        <Icon name="search" size={18} />
      )}
      {loading ? "Searching…" : label}
    </Button>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {message}
    </p>
  );
}

interface ResultsProps<T> {
  status: Status;
  items: T[];
  summary: string;
  render: (item: T) => ReactNode;
  empty: string;
  toolbar?: ReactNode;
}

/** Results area that staggers cards in with GSAP whenever a new result set arrives. */
export function Results<T>({ status, items, summary, render, empty, toolbar }: ResultsProps<T>) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (status !== "done") return;
      gsap.from(".result-card", { y: 24, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" });
    },
    { scope: ref, dependencies: [status, items] },
  );

  if (status === "idle") return null;

  return (
    <div ref={ref} className="mt-6 border-t border-slate-100 pt-6" aria-live="polite">
      {status === "loading" ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">{empty}</p>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">{summary}</p>
            {toolbar}
          </div>
          <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">{items.map(render)}</div>
        </>
      )}
    </div>
  );
}

export function ResultCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "result-card flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 transition hover:border-brand/40 hover:shadow-lg sm:flex-row sm:items-center",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** "Select" button that flips to a confirmed state; booking is simulated. */
export function SelectButton({ selected, onSelect }: { selected: boolean; onSelect: () => void }) {
  return (
    <Button
      type="button"
      variant={selected ? "secondary" : "primary"}
      onClick={onSelect}
      className="w-full px-5 py-2.5 sm:w-auto"
    >
      {selected ? (
        <>
          <Icon name="check" size={16} /> Reserved
        </>
      ) : (
        "Select"
      )}
    </Button>
  );
}
