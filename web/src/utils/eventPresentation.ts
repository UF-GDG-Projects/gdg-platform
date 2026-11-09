import devfestSpeaker from "../assets/events/devfest-speaker.png";
import geminiWorkshop from "../assets/events/gemini-workshop.png";
import getIntoGear from "../assets/events/get-into-gear.png";
import type { FirestoreEvent } from "../services/events";
import type { GDGEvent } from "../types/events";

const accents: GDGEvent["accent"][] = ["blue", "red", "yellow", "green"];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function eventAccent(eventId: string): GDGEvent["accent"] {
  const hash = [...eventId].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return accents[hash % accents.length];
}

export function presentEvent(event: FirestoreEvent): GDGEvent {
  const normalizedTitle = event.title.toLowerCase();
  const imageUrl = normalizedTitle.includes("devfest")
    ? devfestSpeaker
    : normalizedTitle.includes("gemini")
      ? geminiWorkshop
      : normalizedTitle.includes("gear")
        ? getIntoGear
        : undefined;

  return {
    id: event.document_id,
    title: event.title,
    category: "GDG Event",
    dateLabel: dateFormatter.format(event.starts_at),
    location: event.location_name || event.address,
    description: event.description,
    status: event.ends_at < new Date() ? "past" : "upcoming",
    accent: eventAccent(event.event_id),
    imageUrl,
    imageAlt: imageUrl ? `${event.title} event artwork` : undefined,
  };
}
