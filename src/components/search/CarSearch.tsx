"use client";

import { useState, type FormEvent } from "react";
import { carCities, cars } from "@/data/mock";
import type { Car } from "@/data/types";
import { Icon } from "@/components/ui/Icon";
import { Field, FormError, ResultCard, Results, SearchButton, SelectButton, useMockSearch } from "./shared";
import { formatPrice, todayISO } from "@/lib/utils";

const categories: Array<Car["category"] | "All"> = ["All", "Economy", "Sedan", "SUV", "Luxury"];

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

export function CarSearch() {
  const [city, setCity] = useState(carCities[0]);
  const [pickup, setPickup] = useState(todayISO(7));
  const [dropoff, setDropoff] = useState(todayISO(10));
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<string | null>(null);
  const search = useMockSearch<Car>();
  const days = daysBetween(pickup, dropoff);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSelected(null);
    search.run(() => {
      if (days < 1) return "Drop-off must be at least one day after pick-up.";
      return cars
        .filter((c) => c.city === city && (category === "All" || c.category === category))
        .sort((a, b) => a.pricePerDay - b.pricePerDay);
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto] lg:items-end">
        <Field label="Pick-up location" htmlFor="c-city">
          <select id="c-city" className="input-field" value={city} onChange={(e) => setCity(e.target.value)}>
            {carCities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Pick-up date" htmlFor="c-pick">
          <input id="c-pick" type="date" className="input-field" min={todayISO()} value={pickup} onChange={(e) => setPickup(e.target.value)} />
        </Field>
        <Field label="Drop-off date" htmlFor="c-drop">
          <input id="c-drop" type="date" className="input-field" min={pickup} value={dropoff} onChange={(e) => setDropoff(e.target.value)} />
        </Field>
        <Field label="Car type" htmlFor="c-cat">
          <select id="c-cat" className="input-field" value={category} onChange={(e) => setCategory(e.target.value as (typeof categories)[number])}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <div className="md:col-span-2 lg:col-span-1">
          <SearchButton loading={search.status === "loading"} />
        </div>
      </div>
      <FormError message={search.error} />

      <Results
        status={search.status}
        items={search.results}
        summary={`${search.results.length} cars in ${city} · ${days} day${days > 1 ? "s" : ""}`}
        empty="No cars of this type in this city. Try “All”."
        render={(c) => (
          <ResultCard key={c.id}>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-light text-brand"><Icon name="car" size={28} /></span>
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-wider text-gold uppercase">{c.category}</p>
              <p className="font-semibold text-ink">{c.name}</p>
              <div className="mt-1.5 flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Icon name="users" size={14} />{c.seats} seats</span>
                <span className="flex items-center gap-1"><Icon name="gear" size={14} />{c.transmission}</span>
                <span className="flex items-center gap-1"><Icon name="shield" size={14} />Insured</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <div className="sm:text-right">
                <p className="text-xl font-bold text-brand">{formatPrice(c.pricePerDay * days)}</p>
                <p className="text-xs text-slate-500">{formatPrice(c.pricePerDay)} / day</p>
              </div>
              <SelectButton selected={selected === c.id} onSelect={() => setSelected(c.id)} />
            </div>
          </ResultCard>
        )}
      />
    </form>
  );
}
