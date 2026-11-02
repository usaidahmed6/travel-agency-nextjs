import { Icon } from "./Icon";

export function Rating({ value, max = 5, size = 14 }: { value: number; max?: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-gold" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <Icon key={i} name="star" size={size} className={i < Math.round(value) ? "" : "opacity-25"} />
      ))}
    </div>
  );
}
