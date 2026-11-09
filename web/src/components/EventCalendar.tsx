import { useEffect, useMemo, useState } from "react";
import type { FirestoreEvent } from "../services/events";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function monthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export default function EventCalendar({
  events,
}: {
  events: FirestoreEvent[];
}) {
  const [visibleMonth, setVisibleMonth] = useState(() =>
    monthStart(new Date()),
  );
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (hasNavigated || events.length === 0) return;

    const now = new Date();
    const firstUpcoming = events.find((event) => event.ends_at >= now);
    const anchor = firstUpcoming ?? events.at(-1);
    if (anchor) setVisibleMonth(monthStart(anchor.starts_at));
  }, [events, hasNavigated]);

  const cells = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const leadingBlanks = new Date(year, month, 1).getDay();
    const dayCount = new Date(year, month + 1, 0).getDate();

    return [
      ...Array.from({ length: leadingBlanks }, (_, index) => ({
        day: null,
        key: `blank-${index}`,
      })),
      ...Array.from({ length: dayCount }, (_, index) => ({
        day: index + 1,
        key: `day-${index + 1}`,
      })),
    ];
  }, [visibleMonth]);

  const eventsByDay = useMemo(() => {
    const matches = new Map<number, FirestoreEvent[]>();
    for (const event of events) {
      if (
        event.starts_at.getFullYear() === visibleMonth.getFullYear() &&
        event.starts_at.getMonth() === visibleMonth.getMonth()
      ) {
        const day = event.starts_at.getDate();
        matches.set(day, [...(matches.get(day) ?? []), event]);
      }
    }
    return matches;
  }, [events, visibleMonth]);

  const changeMonth = (offset: number) => {
    setHasNavigated(true);
    setVisibleMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + offset, 1),
    );
  };

  return (
    <div className="rounded-[20px] border border-[#c2c2c2] bg-[#f0f4f9] p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-[#4385f3] shadow-sm"
          aria-label="Previous month"
        >
          ‹
        </button>
        <h2 className="text-xl font-semibold text-[#2d2d2d] sm:text-2xl">
          {visibleMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-[#4385f3] shadow-sm"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="pb-1 text-center text-[10px] font-semibold uppercase tracking-wide text-[#767676] sm:text-xs"
          >
            {day}
          </div>
        ))}
        {cells.map(({ day, key }) => {
          const dayEvents = day ? (eventsByDay.get(day) ?? []) : [];
          return (
            <div
              key={key}
              className={`min-h-12 rounded-lg border p-1.5 sm:min-h-[58px] ${
                day
                  ? "border-white bg-white/90 text-[#2d2d2d]"
                  : "border-transparent"
              }`}
            >
              {day && <p className="text-xs font-medium sm:text-sm">{day}</p>}
              {dayEvents.slice(0, 2).map((event) => (
                <p
                  key={event.document_id}
                  className="mt-1 truncate rounded bg-[#e8f0fe] px-1 py-0.5 text-[8px] font-medium text-[#1967d2] sm:text-[10px]"
                  title={event.title}
                >
                  {event.title}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
