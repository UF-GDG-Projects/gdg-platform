import type { GDGEvent } from "../types/events";

const coverColors: Record<GDGEvent["accent"], string> = {
  blue: "bg-[#dbe8ff]",
  red: "bg-[#ffe1dd]",
  yellow: "bg-[#fff0b3]",
  green: "bg-[#d9f2df]",
};

type EventCardProps = {
  event: GDGEvent;
  onSelect: (event: GDGEvent) => void;
};

export default function EventCard({ event, onSelect }: EventCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className="group w-full rounded-[18px] border border-[#cfcfcfb3] bg-white p-[14px] text-left shadow-[0_1px_2px_rgba(0,0,0,.25)] transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(45,45,45,.15)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4385f3]"
    >
      <div
        className={`relative aspect-[.8] overflow-hidden rounded-[13px] shadow-[0_1px_2px_rgba(0,0,0,.2)] ${coverColors[event.accent]}`}
      >
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.imageAlt || `${event.title} event cover`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-3xl font-semibold text-[#2d2d2d]">
            {event.title}
          </div>
        )}
      </div>
      <div className="mt-4 min-h-[61px] rounded-[13px] border border-[#c2c2c2] bg-[#f4f4f4] px-3 py-2">
        <h2 className="font-mono text-sm font-medium leading-5 text-[#4385f3]">
          {event.title}
        </h2>
        <p className="mt-0.5 text-[11px] leading-[1.3] text-[#767676]">
          {event.dateLabel}
          <br />
          {event.location}
        </p>
      </div>
    </button>
  );
}
