# Voyara Travels — Travel Agency Website

A modern, fully responsive travel agency website built with **Next.js (App Router)**, **Tailwind CSS** and **GSAP**.
It offers four services: **Visa Services, Flight Ticket Booking, Hotel Booking and Car Rental**, each with a working
search form backed by mock data. There is no backend; all searches, bookings and the contact form are simulated on the client.

> Built as the Frontend Developer (Next.js) technical assessment for Bizwave Consultancy Pvt. Ltd.

**Live demo:** https://travel-agency-nextjs-psi.vercel.app  
**Repository:** https://github.com/usaidahmed6/travel-agency-nextjs

## Features

- **Hero** with GSAP intro timeline (masked word-by-word headline, background zoom, floating booking cards) and scroll parallax
- **Tabbed booking panel** with four functional search forms:
  - **Flights:** round-trip / one-way, airport swap, travellers, cabin class, validation, sort by cheapest / fastest
  - **Hotels:** destination, check-in/out (night count), guests, star filter, total stay price
  - **Car rental:** pick-up city, dates (day count), car type filter
  - **Visa:** nationality, destination country, visa type; shows processing time, validity, fee and required documents
  - Loading skeletons, empty states, inline errors and a "Reserved" select state
- **Service cards** with GSAP hover (card lift, image zoom, icon spin); "Book now" opens the matching search tab
- **Animated counters** (GSAP + ScrollTrigger) and a "Why choose us" block
- **Popular destinations** grid with a GSAP cursor-follow 3D tilt on hover
- **Testimonials**, **contact form** with client-side validation and success state, and a **footer**
- **Scroll reveal** animations on every section via a reusable `useReveal` hook (ScrollTrigger.batch)
- Respects `prefers-reduced-motion`; content stays visible when JavaScript is disabled
- Responsive across mobile, tablet and desktop, with a mobile navigation menu

## Tech stack

| Tool | Purpose |
| --- | --- |
| Next.js 15 (App Router) + React 19 | Framework, static rendering |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling and design tokens |
| GSAP 3 + ScrollTrigger + `@gsap/react` | Animations |
| `next/image` + Unsplash | Optimised remote images |
| `next/font` (Plus Jakarta Sans, Playfair Display) | Typography |

## Getting started

Requirements: Node.js 18.18+ (Node 20+ recommended) and npm.

```bash
git clone https://github.com/usaidahmed6/travel-agency-nextjs.git
cd travel-agency-nextjs
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Fonts, metadata, root layout
│   ├── page.tsx            # Composes the home page sections
│   └── globals.css         # Tailwind theme tokens and shared form styles
├── components/
│   ├── layout/             # Navbar, Footer, Logo
│   ├── sections/           # Hero, SearchPanel, Services, Stats, Destinations, Testimonials, Contact
│   ├── search/             # FlightSearch, HotelSearch, CarSearch, VisaSearch + shared form/result pieces
│   └── ui/                 # Button, Icon, Rating, Counter, SectionHeading
├── data/
│   ├── types.ts            # Domain types
│   ├── content.ts          # Services, destinations, testimonials, stats, contact info
│   └── mock.ts             # Mock flights (generated per route), hotels, cars and visa options
├── hooks/
│   └── useReveal.ts        # GSAP scroll-reveal hook
└── lib/
    ├── gsap.ts             # Registers GSAP plugins once
    └── utils.ts            # cn, formatPrice, image URL and date helpers
```

## Notes

- All prices, availability and bookings are mock data; nothing is sent to a server.
- Flight results are generated deterministically from the selected route, so any airport pair returns believable results.
- Images are served from Unsplash through `next/image` (allowed in `next.config.ts`).

## Deployment

Deployed on Vercel: import the repository in Vercel and keep the default Next.js settings. No environment variables are needed.
