"use client";

import { useState, type FormEvent } from "react";
import { airports, generateFlights } from "@/data/mock";
import type { Flight } from "@/data/types";
import { Icon } from "@/components/ui/Icon";
import { Field, FormError, ResultCard, Results, SearchButton, SelectButton, useMockSearch } from "./shared";
import { cn, formatPrice, todayISO } from "@/lib/utils";

const cabins: Flight["cabin"][] = ["Economy", "Premium Economy", "Business", "First"];

export function FlightSearch() {
  const [trip, setTrip] = useState<"round" | "oneway">("round");
  const [from, setFrom] = useState("ISB");
  const [to, setTo] = useState("DXB");
  const [depart, setDepart] = useState(todayISO(7));
  const [ret, setRet] = useState(todayISO(14));
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState<Flight["cabin"]>("Economy");
  const [sort, setSort] = useState<"price" | "duration">("price");
  const [selected, setSelected] = useState<string | null>(null);
  const search = useMockSearch<Flight>();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSelected(null);
    search.run(() => {
      if (from === to) return "Departure and destination airports must be different.";
      if (trip === "round" && ret < depart) return "Return date must be after the departure date.";
      return generateFlights(from, to, cabin);
    });
  }

  const minutes = (d: string) => {
    const [h, m] = d.replace("m", "").split("h ").map(Number);
    return h * 60 + m;
  };
  const sorted = [...search.results].sort((a, b) =>
    sort === "price" ? a.price - b.price : minutes(a.duration) - minutes(b.duration),
  );
  const multiplier = passengers * (trip === "round" ? 2 : 1);

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-4 flex gap-5 text-sm">
        {(["round", "oneway"] as const).map((t) => (
          <label key={t} className="flex cursor-pointer items-center gap-2 font-medium text-slate-700">
            <input type="radio" name="trip" checked={trip === t} onChange={() => setTrip(t)} className="accent-brand" />
            {t === "round" ? "Round trip" : "One way"}
          </label>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_1fr_1fr_0.7fr_1fr_auto] lg:items-end">
        <Field label="From" htmlFor="f-from">
          <select id="f-from" className="input-field" value={from} onChange={(e) => setFrom(e.target.value)}>
            {airports.map((a) => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
          </select>
        </Field>
        <button
          type="button"
          aria-label="Swap airports"
          onClick={() => { setFrom(to); setTo(from); }}
          className="mx-auto grid h-[46px] w-[46px] place-items-center rounded-full border border-slate-200 text-brand transition hover:rotate-180 hover:bg-brand-light md:hidden lg:grid"
        >
          <Icon name="swap" size={18} />
        </button>
        <Field label="To" htmlFor="f-to">
          <select id="f-to" className="input-field" value={to} onChange={(e) => setTo(e.target.value)}>
            {airports.map((a) => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
          </select>
        </Field>
        <Field label="Depart" htmlFor="f-depart">
          <input id="f-depart" type="date" className="input-field" min={todayISO()} value={depart} onChange={(e) => setDepart(e.target.value)} />
        </Field>
        <Field label="Return" htmlFor="f-return">
          <input
            id="f-return"
            type="date"
            className={cn("input-field", trip === "oneway" && "opacity-40")}
            min={depart}
            value={ret}
            disabled={trip === "oneway"}
            onChange={(e) => setRet(e.target.value)}
          />
        </Field>
        <Field label="Travellers" htmlFor="f-pax">
          <input id="f-pax" type="number" min={1} max={9} className="input-field" value={passengers} onChange={(e) => setPassengers(Math.min(9, Math.max(1, Number(e.target.value) || 1)))} />
        </Field>
        <Field label="Cabin" htmlFor="f-cabin">
          <select id="f-cabin" className="input-field" value={cabin} onChange={(e) => setCabin(e.target.value as Flight["cabin"])}>
            {cabins.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <div className="md:col-span-2 lg:col-span-1">
          <SearchButton loading={search.status === "loading"} />
        </div>
      </div>
      <FormError message={search.error} />

      <Results
        status={search.status}
        items={sorted}
        summary={`${sorted.length} flights · ${passengers} traveller${passengers > 1 ? "s" : ""} · ${cabin}`}
        empty="No flights found for this route."
        toolbar={
          <div className="flex rounded-full bg-slate-100 p-1 text-xs font-semibold">
            {(["price", "duration"] as const).map((s) => (
              <button key={s} type="button" onClick={() => setSort(s)} className={cn("rounded-full px-4 py-1.5 transition", sort === s ? "bg-white text-brand shadow" : "text-slate-500")}>
                {s === "price" ? "Cheapest" : "Fastest"}
              </button>
            ))}
          </div>
        }
        render={(f) => (
          <ResultCard key={f.id}>
            <div className="flex items-center gap-3 sm:w-48">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-light text-brand"><Icon name="plane" /></span>
              <div>
                <p className="font-semibold text-ink">{f.airline}</p>
                <p className="text-xs text-slate-500">{f.code}</p>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-between gap-3 text-center">
              <div><p className="text-lg font-bold text-ink">{f.depart}</p><p className="text-xs text-slate-500">{f.from}</p></div>
              <div className="flex-1 px-2">
                <p className="text-xs text-slate-500">{f.duration}</p>
                <div className="relative my-1 h-px bg-slate-200"><span className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" /></div>
                <p className={cn("text-xs font-medium", f.stops === 0 ? "text-emerald-600" : "text-amber-600")}>{f.stops === 0 ? "Non-stop" : `${f.stops} stop`}</p>
              </div>
              <div><p className="text-lg font-bold text-ink">{f.arrive}</p><p className="text-xs text-slate-500">{f.to}</p></div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <div className="sm:text-right">
                <p className="text-xl font-bold text-brand">{formatPrice(f.price * multiplier)}</p>
                <p className="text-xs text-slate-500">{formatPrice(f.price)} / person{trip === "round" ? " / way" : ""}</p>
              </div>
              <SelectButton selected={selected === f.id} onSelect={() => setSelected(f.id)} />
            </div>
          </ResultCard>
        )}
      />
    </form>
  );
}
