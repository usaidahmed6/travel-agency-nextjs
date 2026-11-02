"use client";

import { useState, type FormEvent } from "react";
import { visaCountries, visaOptions } from "@/data/mock";
import type { VisaOption } from "@/data/types";
import { Icon } from "@/components/ui/Icon";
import { Field, FormError, ResultCard, Results, SearchButton, SelectButton, useMockSearch } from "./shared";
import { formatPrice } from "@/lib/utils";

const nationalities = ["Pakistan", "India", "Bangladesh", "Nigeria", "Philippines"];
const visaTypes: Array<VisaOption["type"] | "Any"> = ["Any", "Tourist", "Business", "Student", "Transit"];

export function VisaSearch() {
  const [nationality, setNationality] = useState(nationalities[0]);
  const [country, setCountry] = useState(visaCountries[0]);
  const [type, setType] = useState<(typeof visaTypes)[number]>("Any");
  const [selected, setSelected] = useState<string | null>(null);
  const search = useMockSearch<VisaOption>();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSelected(null);
    search.run(() => visaOptions.filter((v) => v.country === country && (type === "Any" || v.type === type)));
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1fr_auto] lg:items-end">
        <Field label="Your nationality" htmlFor="v-nat">
          <select id="v-nat" className="input-field" value={nationality} onChange={(e) => setNationality(e.target.value)}>
            {nationalities.map((n) => <option key={n}>{n}</option>)}
          </select>
        </Field>
        <Field label="Travelling to" htmlFor="v-country">
          <select id="v-country" className="input-field" value={country} onChange={(e) => setCountry(e.target.value)}>
            {visaCountries.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Visa type" htmlFor="v-type">
          <select id="v-type" className="input-field" value={type} onChange={(e) => setType(e.target.value as (typeof visaTypes)[number])}>
            {visaTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <div className="md:col-span-2 lg:col-span-1">
          <SearchButton loading={search.status === "loading"} label="Check visa" />
        </div>
      </div>
      <FormError message={search.error} />

      <Results
        status={search.status}
        items={search.results}
        summary={`${search.results.length} visa option${search.results.length === 1 ? "" : "s"} for ${nationality} passport holders → ${country}`}
        empty="We don't process this visa type for that country yet. Contact us for a custom quote."
        render={(v) => (
          <ResultCard key={v.id} className="sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-light text-brand"><Icon name="visa" size={24} /></span>
            <div className="flex-1">
              <p className="font-semibold text-ink">{v.country} — {v.type} Visa</p>
              <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Icon name="clock" size={14} />{v.processingDays}</span>
                <span>Valid {v.validity}</span>
                <span>{v.entries} entry</span>
              </div>
              <p className="mt-3 text-xs font-semibold text-slate-600">Documents required</p>
              <ul className="mt-1.5 grid gap-1 text-xs text-slate-600 sm:grid-cols-2">
                {v.documents.map((d) => (
                  <li key={d} className="flex items-center gap-1.5"><Icon name="check" size={14} className="text-emerald-600" />{d}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <div className="sm:text-right">
                <p className="text-xl font-bold text-brand">{formatPrice(v.fee)}</p>
                <p className="text-xs text-slate-500">incl. service fee</p>
              </div>
              <SelectButton selected={selected === v.id} onSelect={() => setSelected(v.id)} />
            </div>
          </ResultCard>
        )}
      />
    </form>
  );
}
