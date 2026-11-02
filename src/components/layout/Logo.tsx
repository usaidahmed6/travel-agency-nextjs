import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Voyara Travels home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/30">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M3 17c4-1 6-6 9-11 3 5 5 10 9 11" />
          <circle cx="12" cy="6" r="1.5" fill="currentColor" />
        </svg>
      </span>
      <span className={cn("font-display text-xl font-semibold tracking-tight", light ? "text-white" : "text-ink")}>
        Voyara<span className="text-gold">.</span>
      </span>
    </a>
  );
}
