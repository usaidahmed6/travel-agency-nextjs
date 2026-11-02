"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/content";
import { Icon } from "@/components/ui/Icon";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-white/90 py-3 shadow-sm backdrop-blur-lg" : "bg-transparent py-5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo light={!solid} />

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "group relative text-sm font-medium transition-colors",
                  solid ? "text-slate-700 hover:text-brand" : "text-white/90 hover:text-white",
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <LinkButton href="#contact" variant={solid ? "primary" : "light"} className="px-5 py-2.5">
            Get a free quote
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn("rounded-full p-2 lg:hidden", solid ? "text-ink" : "text-white")}
        >
          <Icon name={open ? "close" : "menu"} size={26} />
        </button>
      </nav>

      <div
        className={cn(
          "fixed inset-x-0 top-[60px] bottom-0 bg-white px-6 pt-6 transition-all duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-4 text-lg font-medium text-ink hover:bg-brand-light"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <LinkButton href="#contact" onClick={() => setOpen(false)} className="mt-6 w-full">
          Get a free quote
        </LinkButton>
      </div>
    </header>
  );
}
