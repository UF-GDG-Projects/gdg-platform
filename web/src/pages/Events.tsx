import EventCard from "../components/EventCard";
import { demoEvents } from "../data/events";

export default function Events() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 sm:px-8 lg:px-[90px] lg:pt-[54px]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#4285f4]">Google Developer Groups · UF</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Events</h1>
          <p className="mt-3 max-w-2xl text-base text-[#777777]">Meet developers, learn together, and find your next event.</p>
        </div>
        <span className="rounded-full border border-[#e6e6e6] bg-white px-4 py-2 text-xs text-[#666666]">Preview.. dates TBD</span>
      </div>
      <div className="grid grid-cols-1 gap-x-[42px] gap-y-[66px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {demoEvents.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  );
}
