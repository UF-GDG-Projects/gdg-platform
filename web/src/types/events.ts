export type GDGEvent = {
  id: string;
  title: string;
  category: string;
  dateLabel: string;
  location: string;
  description: string;
  status: "upcoming" | "past";
  accent: "blue" | "red" | "yellow" | "green";
  startsAt: Date;
  endsAt: Date;
  imageUrl?: string;
  imageAlt?: string;
};
