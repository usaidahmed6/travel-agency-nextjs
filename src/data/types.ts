export type ServiceKey = "visa" | "flight" | "hotel" | "car";

export interface Service {
  key: ServiceKey;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  image: string;
  priceFrom: number;
  rating: number;
  tag?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface Flight {
  id: string;
  airline: string;
  code: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: number;
  cabin: "Economy" | "Premium Economy" | "Business" | "First";
  price: number;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  area: string;
  stars: number;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  image: string;
}

export interface Car {
  id: string;
  name: string;
  category: "Economy" | "Sedan" | "SUV" | "Luxury";
  seats: number;
  transmission: "Automatic" | "Manual";
  city: string;
  pricePerDay: number;
}

export interface VisaOption {
  id: string;
  country: string;
  type: "Tourist" | "Business" | "Student" | "Transit";
  processingDays: string;
  validity: string;
  entries: "Single" | "Multiple";
  fee: number;
  documents: string[];
}
