import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p
        data-reveal
        className={cn(
          "mb-3 text-xs font-bold uppercase tracking-[0.25em]",
          tone === "dark" ? "text-brand" : "text-gold",
        )}
      >
        {eyebrow}
      </p>
      <h2
        data-reveal
        className={cn(
          "font-display text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "dark" ? "text-slate-600" : "text-white/75",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
