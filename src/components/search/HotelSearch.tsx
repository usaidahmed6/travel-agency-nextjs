"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { hotelCities, hotels } from "@/data/mock";
import type { Hotel } from "@/data/types";
import { Rating } from "@/components/ui/Rating";
import { Field, FormError, ResultCard, Results, SearchButton, SelectButton, useMockSearch } from "./shared";
import { formatPrice, todayISO, unsplash } from "@/lib/utils";

function nightsBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

export function HotelSearch() {
  const [city, setCity] = useState(hotelCities[0]);
  const [checkIn, setCheckIn] = useState(todayISO(7));
  const [checkOut, setCheckOut] = useState(todayISO(10));
  const [guests, setGuests] = useState(2);
  const [minStars, setMinStars] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const search = useMockSearch<Hotel>();
  const nights = nightsBetween(checkIn, checkOut);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSelected(null);
    search.run(() => {
      if (nights < 1) return "Check-out must be at least one night after check-in.";
      return hotels
        .filter((h) => h.city === city && h.stars >= minStars)
        .sort((a, b) => b.rating - a.rating);
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.7fr_0.9fr_auto] lg:items-end">
        <Field label="Destination" htmlFor="h-city">
          <select id="h-city" className="input-field" value={city} onChange={(e) => setCity(e.target.value)}>
            {hotelCities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Check-in" htmlFor="h-in">
          <input id="h-in" type="date" className="input-field" min={todayISO()} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </Field>
        <Field label="Check-out" htmlFor="h-out">
          <input id="h-out" type="date" className="input-field" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </Field>
        <Field label="Guests" htmlFor="h-guests">
          <input id="h-guests" type="number" min={1} max={10} className="input-field" value={guests} onChange={(e) => setGuests(Math.min(10, Math.max(1, Number(e.target.value) || 1)))} />
        </Field>
        <Field label="Stars" htmlFor="h-stars">
          <select id="h-stars" className="input-field" value={minStars} onChange={(e) => setMinStars(Number(e.target.value))}>
            <option value={0}>Any</option>
            <option value={4}>4★ & up</option>
            <option value={5}>5★ only</option>
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
        summary={`${search.results.length} stays in ${city} · ${nights} night${nights > 1 ? "s" : ""} · ${guests} guest${guests > 1 ? "s" : ""}`}
        empty="No hotels match these filters. Try lowering the star rating."
        render={(h) => (
          <ResultCard key={h.id}>
            <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32">
              <Image src={unsplash(h.image, 400)} alt={h.name} fill sizes="(max-width: 640px) 100vw, 128px" className="object-cover" />
            </div>
            <div className="flex-1">
              <Rating value={h.stars} size={12} />
              <p className="mt-1 font-semibold text-ink">{h.name}</p>
              <p className="text-xs text-slate-500">{h.area}, {h.city}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {h.amenities.map((a) => <span key={a} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] text-slate-600">{a}</span>)}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <div className="sm:text-right">
                <span className="rounded-md bg-brand px-2 py-0.5 text-xs font-bold text-white">{h.rating.toFixed(1)}</span>
                <p className="mt-1 text-xl font-bold text-brand">{formatPrice(h.pricePerNight * nights)}</p>
                <p className="text-xs text-slate-500">{formatPrice(h.pricePerNight)} / night</p>
              </div>
              <SelectButton selected={selected === h.id} onSelect={() => setSelected(h.id)} />
            </div>
          </ResultCard>
        )}
      />
    </form>
  );
}
