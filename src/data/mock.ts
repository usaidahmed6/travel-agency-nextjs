import type { Car, Flight, Hotel, VisaOption } from "./types";

export const airports = [
  { code: "ISB", city: "Islamabad" },
  { code: "LHE", city: "Lahore" },
  { code: "KHI", city: "Karachi" },
  { code: "DXB", city: "Dubai" },
  { code: "LHR", city: "London" },
  { code: "CDG", city: "Paris" },
  { code: "IST", city: "Istanbul" },
  { code: "NRT", city: "Tokyo" },
  { code: "DPS", city: "Bali" },
];

const airlines = [
  { name: "Emirates", code: "EK" },
  { name: "Qatar Airways", code: "QR" },
  { name: "Turkish Airlines", code: "TK" },
  { name: "PIA", code: "PK" },
  { name: "Etihad", code: "EY" },
];

/**
 * Builds a deterministic set of flights for any route so every search
 * returns believable results without a backend.
 */
export function generateFlights(from: string, to: string, cabin: Flight["cabin"]): Flight[] {
  const seed = (from + to).split("").reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const cabinMultiplier = { Economy: 1, "Premium Economy": 1.6, Business: 3.2, First: 5 }[cabin];
  const departures = ["06:15", "09:40", "13:05", "17:30", "22:50"];

  return airlines.map((airline, i) => {
    const stops = (seed + i) % 3 === 0 ? 0 : (seed + i) % 2;
    const hours = 3 + ((seed + i * 7) % 9) + stops * 2;
    const minutes = (seed * (i + 3)) % 60;
    const [dh, dm] = departures[i].split(":").map(Number);
    const arriveTotal = dh * 60 + dm + hours * 60 + minutes;
    const arrive = `${String(Math.floor(arriveTotal / 60) % 24).padStart(2, "0")}:${String(arriveTotal % 60).padStart(2, "0")}`;
    const base = 220 + ((seed * (i + 1)) % 380) + hours * 18 - stops * 40;

    return {
      id: `${airline.code}-${from}-${to}-${i}`,
      airline: airline.name,
      code: `${airline.code} ${100 + ((seed + i * 37) % 800)}`,
      from,
      to,
      depart: departures[i],
      arrive,
      duration: `${hours}h ${String(minutes).padStart(2, "0")}m`,
      stops,
      cabin,
      price: Math.round(base * cabinMultiplier),
    };
  });
}

export const hotels: Hotel[] = [
  { id: "h1", name: "Atlantis Palm Retreat", city: "Dubai", area: "Palm Jumeirah", stars: 5, rating: 9.2, pricePerNight: 340, amenities: ["Pool", "Spa", "Beach"], image: "1566073771259-6a8506099945" },
  { id: "h2", name: "Marina Skyline Suites", city: "Dubai", area: "Dubai Marina", stars: 4, rating: 8.7, pricePerNight: 165, amenities: ["Gym", "Wi-Fi", "Breakfast"], image: "1520250497591-112f2f40a3f4" },
  { id: "h3", name: "Le Petit Montmartre", city: "Paris", area: "Montmartre", stars: 4, rating: 8.9, pricePerNight: 210, amenities: ["Wi-Fi", "Breakfast", "Bar"], image: "1502602898657-3e91760cbb34" },
  { id: "h4", name: "Ubud Jungle Villas", city: "Bali", area: "Ubud", stars: 5, rating: 9.5, pricePerNight: 185, amenities: ["Private pool", "Spa", "Yoga"], image: "1537996194471-e657df975ab4" },
  { id: "h5", name: "Shinjuku Garden Hotel", city: "Tokyo", area: "Shinjuku", stars: 4, rating: 8.6, pricePerNight: 150, amenities: ["Wi-Fi", "Onsen", "Restaurant"], image: "1540959733332-eab4deabeeaf" },
  { id: "h6", name: "Thames View Residence", city: "London", area: "South Bank", stars: 5, rating: 9.0, pricePerNight: 295, amenities: ["Gym", "Spa", "Bar"], image: "1513635269975-59663e0ac1ad" },
  { id: "h7", name: "Caldera Cliff Resort", city: "Santorini", area: "Oia", stars: 5, rating: 9.4, pricePerNight: 320, amenities: ["Infinity pool", "Sea view", "Breakfast"], image: "1533105079780-92b9be482077" },
  { id: "h8", name: "Seminyak Beach House", city: "Bali", area: "Seminyak", stars: 4, rating: 8.8, pricePerNight: 120, amenities: ["Pool", "Beach", "Wi-Fi"], image: "1507525428034-b723cf961d3e" },
];

export const hotelCities = Array.from(new Set(hotels.map((h) => h.city)));

export const cars: Car[] = [
  { id: "c1", name: "Toyota Yaris", category: "Economy", seats: 5, transmission: "Automatic", city: "Dubai", pricePerDay: 32 },
  { id: "c2", name: "Honda Civic", category: "Sedan", seats: 5, transmission: "Automatic", city: "Dubai", pricePerDay: 48 },
  { id: "c3", name: "Toyota Land Cruiser", category: "SUV", seats: 7, transmission: "Automatic", city: "Dubai", pricePerDay: 120 },
  { id: "c4", name: "Mercedes-Benz S-Class", category: "Luxury", seats: 5, transmission: "Automatic", city: "Dubai", pricePerDay: 260 },
  { id: "c5", name: "Suzuki Swift", category: "Economy", seats: 5, transmission: "Manual", city: "Islamabad", pricePerDay: 25 },
  { id: "c6", name: "Toyota Corolla", category: "Sedan", seats: 5, transmission: "Automatic", city: "Islamabad", pricePerDay: 38 },
  { id: "c7", name: "Toyota Fortuner", category: "SUV", seats: 7, transmission: "Automatic", city: "Islamabad", pricePerDay: 85 },
  { id: "c8", name: "Volkswagen Golf", category: "Economy", seats: 5, transmission: "Manual", city: "London", pricePerDay: 45 },
  { id: "c9", name: "BMW 5 Series", category: "Luxury", seats: 5, transmission: "Automatic", city: "London", pricePerDay: 190 },
  { id: "c10", name: "Range Rover Evoque", category: "SUV", seats: 5, transmission: "Automatic", city: "London", pricePerDay: 140 },
];

export const carCities = Array.from(new Set(cars.map((c) => c.city)));

export const visaOptions: VisaOption[] = [
  { id: "v1", country: "United Arab Emirates", type: "Tourist", processingDays: "3–5 working days", validity: "60 days", entries: "Single", fee: 120, documents: ["Passport (6+ months validity)", "Passport photo", "Return ticket", "Hotel booking"] },
  { id: "v2", country: "United Arab Emirates", type: "Business", processingDays: "5–7 working days", validity: "90 days", entries: "Multiple", fee: 290, documents: ["Passport", "Invitation letter", "Company letter", "Bank statement"] },
  { id: "v3", country: "United Kingdom", type: "Tourist", processingDays: "15 working days", validity: "6 months", entries: "Multiple", fee: 180, documents: ["Passport", "6-month bank statement", "Employment letter", "Travel itinerary"] },
  { id: "v4", country: "United Kingdom", type: "Student", processingDays: "15 working days", validity: "Course length", entries: "Multiple", fee: 520, documents: ["Passport", "CAS letter", "IELTS / English proof", "Financial proof"] },
  { id: "v5", country: "Schengen (France)", type: "Tourist", processingDays: "10–15 working days", validity: "90 days", entries: "Multiple", fee: 110, documents: ["Passport", "Travel insurance", "Bank statement", "Flight & hotel reservation"] },
  { id: "v6", country: "Turkey", type: "Tourist", processingDays: "24–48 hours", validity: "30 days", entries: "Single", fee: 65, documents: ["Passport", "Valid UK/US/Schengen visa (e-Visa)"] },
  { id: "v7", country: "Japan", type: "Tourist", processingDays: "5–7 working days", validity: "90 days", entries: "Single", fee: 95, documents: ["Passport", "Photo", "Itinerary", "Bank statement"] },
  { id: "v8", country: "Indonesia", type: "Tourist", processingDays: "On arrival / 2 days e-VOA", validity: "30 days", entries: "Single", fee: 45, documents: ["Passport", "Return ticket"] },
  { id: "v9", country: "Turkey", type: "Transit", processingDays: "24 hours", validity: "72 hours", entries: "Single", fee: 40, documents: ["Passport", "Onward ticket"] },
];

export const visaCountries = Array.from(new Set(visaOptions.map((v) => v.country)));
