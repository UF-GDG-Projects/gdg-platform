import EventCard from "../components/EventCard";
import { useEvents } from "../hooks/useEvents";
import { presentEvent } from "../utils/eventPresentation";

export default function Events() {
  const { events, isLoading, error } = useEvents();
  const displayEvents = events.map(presentEvent);

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 sm:px-8 lg:px-[90px] lg:pt-[54px]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#4285f4]">
            Google Developer Groups · UF
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Events
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#777777]">
            Meet developers, learn together, and find your next event.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#dbe7dc] bg-white px-4 py-2 text-xs font-medium text-[#3c4043]">
          <span className="h-2 w-2 rounded-full bg-[#34a853]" />
          Live from Firestore
        </span>
      </div>
      {isLoading && (
        <div className="rounded-2xl border border-[#e6e6e6] bg-white/80 p-8 text-center text-[#666666]">
          Loading events…
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-[#f2c8c4] bg-[#fce8e6] p-6 text-[#8c1d18]"
        >
          <p className="font-semibold">Events could not be loaded.</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      )}
      {!isLoading && !error && displayEvents.length === 0 && (
        <div className="rounded-2xl border border-[#e6e6e6] bg-white/80 p-8 text-center text-[#666666]">
          No events have been added yet.
        </div>
      )}
      {!isLoading && !error && displayEvents.length > 0 && (
        <div className="grid grid-cols-1 gap-x-[42px] gap-y-[66px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
