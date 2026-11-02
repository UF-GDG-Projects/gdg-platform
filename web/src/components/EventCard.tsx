import type { GDGEvent } from "../types/events";

const coverColors: Record<GDGEvent["accent"], string> = {
  blue: "bg-[#dbe8ff]",
  red: "bg-[#ffe1dd]",
  yellow: "bg-[#fff0b3]",
  green: "bg-[#d9f2df]",
};

/** Figma-inspired event tile: photo/cover, top time & place, bottom title. */
export default function EventCard({ event }: { event: GDGEvent }) {
  return (
    <article className="group relative min-w-0 pb-[11px] pr-[11px]">
      {/* Offset backing panel visible on right and bottom, like the Figma mockup. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[11px] bottom-0 right-0 top-[11px] bg-[#d9d9d9]"
      />

      <div className="relative flex min-h-[363px] flex-col border border-[#ededed] bg-white p-[13px] transition-transform duration-200 group-hover:-translate-y-0.5">
        {/* Photo / color cover: use an image URL once real event photos exist. */}
        <div className={`relative min-h-[255px] flex-1 overflow-hidden ${coverColors[event.accent]}`}>
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.imageAlt || `${event.title} event cover`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}

          {/* Small outlined label near top: event time and location. */}
          <div className="absolute left-3 right-3 top-3 inline-flex w-fit max-w-[calc(100%-1.5rem)] flex-wrap gap-x-1.5 gap-y-0.5 border border-[#bdbdbd] bg-white/90 px-3 py-2 text-xs font-medium text-[#353535]">
            <span>{event.dateLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{event.location}</span>
          </div>
        </div>

        {/* Small distinct bottom block: event name. */}
        <div className="mt-[13px] flex min-h-[66px] items-center bg-[#f2f2f2] px-4 py-3">
          <h2 className="text-base font-semibold leading-snug text-[#292929]">{event.title}</h2>
        </div>
      </div>
    </article>
  );
}
