import type { Destination, Service, Testimonial } from "./types";

export const services: Service[] = [
  {
    key: "visa",
    title: "Visa Services",
    description:
      "Document checks, appointments and application filing for 60+ countries, handled by visa specialists.",
    features: ["Tourist & business visas", "Document review", "Embassy appointments"],
    image: "1436491865332-7a61a109cc05",
  },
  {
    key: "flight",
    title: "Flight Ticket Booking",
    description:
      "Compare fares across 400+ airlines and lock in the best route, cabin and price for your trip.",
    features: ["One-way & round trips", "All cabin classes", "Free date changes*"],
    image: "1488085061387-422e29b40080",
  },
  {
    key: "hotel",
    title: "Hotel Booking",
    description:
      "Hand-picked stays from boutique hideaways to five-star resorts, with flexible cancellation.",
    features: ["Best-rate guarantee", "Verified reviews", "Pay at hotel options"],
    image: "1566073771259-6a8506099945",
  },
  {
    key: "car",
    title: "Car Rental",
    description:
      "Pick up a car at the airport or downtown, from compact city cars to chauffeur-driven luxury.",
    features: ["Airport pickup", "Unlimited mileage", "Full insurance cover"],
    image: "1549317661-bd32c8ce0db2",
  },
];

export const destinations: Destination[] = [
  { id: "dubai", city: "Dubai", country: "United Arab Emirates", image: "1512453979798-5ea266f8880c", priceFrom: 499, rating: 4.9, tag: "Trending" },
  { id: "paris", city: "Paris", country: "France", image: "1502602898657-3e91760cbb34", priceFrom: 899, rating: 4.8 },
  { id: "bali", city: "Bali", country: "Indonesia", image: "1537996194471-e657df975ab4", priceFrom: 749, rating: 4.9, tag: "Best Value" },
  { id: "tokyo", city: "Tokyo", country: "Japan", image: "1540959733332-eab4deabeeaf", priceFrom: 1099, rating: 4.8 },
  { id: "santorini", city: "Santorini", country: "Greece", image: "1533105079780-92b9be482077", priceFrom: 959, rating: 4.7 },
  { id: "london", city: "London", country: "United Kingdom", image: "1513635269975-59663e0ac1ad", priceFrom: 849, rating: 4.7 },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ayesha Khan",
    role: "Family trip to Dubai",
    avatar: "1494790108377-be9c29b29330",
    quote:
      "Visa, flights and a beachfront hotel sorted in under a week. The team answered every question on WhatsApp within minutes.",
    rating: 5,
  },
  {
    name: "Daniel Brooks",
    role: "Business travel, London",
    avatar: "1507003211169-0a1dd7228f2d",
    quote:
      "My UK business visa was approved first time. They spotted a missing bank statement before I submitted anything.",
    rating: 5,
  },
  {
    name: "Sara Malik",
    role: "Honeymoon in Bali",
    avatar: "1438761681033-6461ffad8d80",
    quote:
      "The villa they recommended was better than the photos, and the airport car was waiting the moment we landed.",
    rating: 5,
  },
];

export const stats = [
  { value: 25000, suffix: "+", label: "Happy travellers" },
  { value: 60, suffix: "+", label: "Visa countries" },
  { value: 400, suffix: "+", label: "Partner airlines" },
  { value: 98, suffix: "%", label: "Visa approval rate" },
];

export const whyUs = [
  { title: "One agent, every booking", text: "Visa, flight, hotel and car managed by one travel advisor who knows your whole trip." },
  { title: "Transparent pricing", text: "No hidden service fees. The price you see in your quote is the price you pay." },
  { title: "24/7 trip support", text: "Delayed flight or lost booking? Our support line is open around the clock while you travel." },
];

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#search", label: "Book" },
  { href: "#destinations", label: "Destinations" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export const contactInfo = {
  phone: "+92 300 1234567",
  email: "hello@voyaratravels.com",
  address: "Office 12, Blue Area, Islamabad, Pakistan",
  hours: "Mon – Sat, 9:00 AM – 8:00 PM",
};
