import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Bike,
  CalendarClock,
  Car,
  Clock,
  Heart,
  MapPin,
  Navigation,
  Phone,
  Sparkles
} from "lucide-react";

export type Accent = "sage" | "lavender" | "champagne" | "blush" | "plum";

export type EventCard = {
  label: string;
  name: string;
  date: string;
  location: string;
  description: string;
  detail: string;
  Icon: LucideIcon;
  accent: Accent;
};

export type InfoPill = {
  Icon: LucideIcon;
  text: string;
};

export type Person = {
  role: string;
  name: string;
  tagline: string;
  description: string;
  favorites: string[];
  signature: string;
  accent: "blush" | "lavender";
  image: string;
  alt: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type TravelRow = {
  Icon: LucideIcon;
  text: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  detail: string;
  Icon: LucideIcon;
};

export const wedding = {
  couple: "Prasoon & Sarayu",
  brideFirst: "Sarayu",
  groomFirst: "Prasoon",
  brideFull: "Sarayu",
  groomFull: "Prasoon",
  date: "May 10, 2026",
  datePill: "10 / 05 / 2026",
  dateLong: "Sunday, the Tenth of May, Two Thousand and Twenty-Six",
  muhurthamTime: "10:25 AM",
  venue: "Padmashali Kalyana Mandapam",
  city: "New Shyampet, Hanmakonda",
  venueLine: "Padmashali Kalyana Mandapam, New Shyampet, Hanmakonda",
  targetDate: "2026-05-10T10:25:00+05:30",
  rsvpDeadline: "May 1, 2026",
  email: "sarayuprasoon2026@gmail.com",
  phone: "+917396171820",
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600",
  venueImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400",
  mapEmbed:
    "https://www.google.com/maps?q=17.983364,79.562731&output=embed",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Padmashali%20Kalyana%20Mandapam%2C%20New%20Shyampet%2C%20Hanmakonda%20%2817.983364%2C%2079.562731%29"
} as const;

export const navItems = [
  { label: "Our Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "Venue", href: "#venue" }
] as const;

export const eventCards: EventCard[] = [
  {
    label: "MARRIAGE",
    name: "Sumuhurtham",
    date: "May 10, 10:25 AM",
    location: "Padmashali Kalyana Mandapam",
    description: "The marriage of Prasoon and Sarayu",
    detail: "Dhanishta Nakshathram - Abhijith Lagnam",
    Icon: Heart,
    accent: "blush"
  },
  {
    label: "RECEPTION",
    name: "Reception",
    date: "May 11, 12:30 PM onwards",
    location: "Padmashali Kalyana Mandapam",
    description: "Reception at the same venue",
    detail: "Family blessings and greetings",
    Icon: Sparkles,
    accent: "plum"
  }
];

export const infoPills: InfoPill[] = [
  {
    Icon: CalendarClock,
    text: "RSVP by May 1, 2026"
  },
  {
    Icon: BedDouble,
    text: "Complimentary rooms available for outstation guests"
  }
];

export const people: Person[] = [
  {
    role: "Groom",
    name: "Prasoon",
    tagline: "The Adventurer",
    description:
      "Prasoon is happiest chasing mountain roads, collecting old songs, and making everyone feel included. His calm humor has been Sarayu's favorite place to return to since 2021.",
    favorites: ["Mountains", "Music", "Coffee"],
    signature: "Prasoon",
    accent: "lavender",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    alt: "Groom portrait in a tailored suit with a warm smile"
  },
  {
    role: "Bride",
    name: "Sarayu",
    tagline: "The Dreamer",
    description:
      "Sarayu brings poetry to the ordinary and warmth to every room she enters. She believes the best evenings end with sunset skies, family stories, and one more cup of chai.",
    favorites: ["Sunsets", "Poetry", "Chai"],
    signature: "Sarayu",
    accent: "blush",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800",
    alt: "Bride in elegant traditional attire with soft natural light"
  }
];

export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    alt: "Couple embracing in a romantic outdoor wedding setting"
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600",
    alt: "Wedding couple walking through soft natural light"
  },
  {
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600",
    alt: "Elegant bridal details with flowers"
  },
  {
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600",
    alt: "Couple holding hands during a wedding celebration"
  },
  {
    src: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=600",
    alt: "Groom and bride in a softly lit portrait"
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
    alt: "Wedding couple laughing together outdoors"
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600",
    alt: "Romantic wedding couple portrait near a ceremony arch"
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
    alt: "Wedding reception table with candles and florals"
  },
  {
    src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600",
    alt: "Groom and bride walking through a garden path"
  },
  {
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600",
    alt: "Wedding celebration details with soft champagne tones"
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600",
    alt: "Outdoor wedding ceremony surrounded by guests"
  },
  {
    src: "https://images.unsplash.com/photo-1444171595173-93f25b4b6bc9?w=600",
    alt: "Wedding couple in a cinematic landscape portrait"
  }
];

export const weddingDayTimeline: ScheduleItem[] = [
  {
    time: "10:25 AM",
    title: "Marriage",
    detail: "Sumuhurtham: Dhanishta Nakshathram - Abhijith Lagnam.",
    Icon: Heart
  }
];

export const receptionTimeline: ScheduleItem[] = [
  {
    time: "12:30 PM onwards",
    title: "Reception",
    detail: "Monday, May 11, 2026 at the same venue.",
    Icon: Sparkles
  }
];

export const travelRows: TravelRow[] = [
  {
    Icon: Car,
    text: "Parking available near the venue"
  },
  {
    Icon: Bike,
    text: "Use Google Maps for the best route"
  }
];

export const venueAddress = [
  "New Shyampet, Hanmakonda",
  "Telangana, India"
] as const;

export const footerLinks = [
  {
    label: "Call Prasoon and Sarayu",
    href: `tel:${wedding.phone}`,
    Icon: Phone
  }
] as const;

export const venueIcons = {
  Clock,
  MapPin,
  Navigation
};
