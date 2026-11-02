import { contactInfo, navLinks, services } from "@/data/content";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

const socials = ["Facebook", "Instagram", "LinkedIn", "X"];

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Visas, flights, hotels and car rentals planned by people who travel. One agency for the whole trip.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-xs font-semibold transition hover:border-gold hover:text-gold"
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold tracking-wider text-white uppercase">Services</h3>
          <ul className="space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.key}>
                <a href="#search" className="transition hover:text-gold">{s.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold tracking-wider text-white uppercase">Quick links</h3>
          <ul className="space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-gold">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold tracking-wider text-white uppercase">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><Icon name="pin" size={18} className="mt-0.5 shrink-0 text-gold" />{contactInfo.address}</li>
            <li className="flex gap-3"><Icon name="phone" size={18} className="shrink-0 text-gold" />{contactInfo.phone}</li>
            <li className="flex gap-3"><Icon name="mail" size={18} className="shrink-0 text-gold" />{contactInfo.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Voyara Travels. All rights reserved.</p>
          <p>Demo project — all bookings and prices are mock data.</p>
        </div>
      </div>
    </footer>
  );
}
