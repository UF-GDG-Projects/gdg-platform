/** Frontend preview shape; reconcile with the shared Firebase schema when integrated. */
export type GDGEvent = {
  id: string;
  title: string;
  category: string;
  dateLabel: string;
  location: string;
  description: string;
  status: "upcoming" | "past";
  accent: "blue" | "red" | "yellow" | "green";
  /** Optional photo for the event cover. Leave undefined for a color cover. */
  imageUrl?: string;
  imageAlt?: string;
};
