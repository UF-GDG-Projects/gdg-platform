import { Link } from "react-router";
import { useEvents } from "../hooks/useEvents";
import { presentEvent } from "../utils/eventPresentation";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="currentColor"
    >
      <path d="M19.8 5.1a18 18 0 0 0-4.4-1.4l-.5 1a16 16 0 0 0-5.8 0l-.5-1a18 18 0 0 0-4.4 1.4C1.4 9.2.6 13.3 1 17.4a18 18 0 0 0 5.5 2.8l1.2-1.9-1.8-.9.4-.3a13 13 0 0 0 11.4 0l.4.3-1.8.9 1.2 1.9a18 18 0 0 0 5.5-2.8c.5-4.8-.8-8.9-3.2-12.3ZM8.7 14.9c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2Z" />
    </svg>
  );
}

function DiscordGraphic() {
  return (
    <div className="relative mt-8 min-h-[395px] overflow-hidden rounded-[28px] bg-[#f7f9ff] p-5 sm:p-7">
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#dce7ff]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-14 h-48 w-48 rounded-full bg-[#fce8e6]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-9 right-8 h-20 w-20 rotate-12 rounded-3xl bg-[#fff1bd]"
      />

      <div className="relative mx-auto max-w-[440px] rounded-[24px] border border-white bg-white/95 p-5 shadow-[0_24px_60px_rgba(60,64,67,.14)] sm:p-6">
        <div className="flex items-center justify-between border-b border-[#eceff3] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5865f2] text-white">
              <DiscordIcon />
            </span>
            <div>
              <p className="font-semibold text-[#202124]">GDG at UF</p>
              <p className="text-xs text-[#7a7d83]">student community</p>
            </div>
          </div>
          <span className="flex items-center gap-2 text-xs font-medium text-[#5f6368]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#34a853]" />
            Active
          </span>
        </div>

        <div className="space-y-3 py-5">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4285f4] text-[10px] font-bold text-white">
              JL
            </span>
            <div className="rounded-2xl rounded-tl-sm bg-[#f1f3f4] px-4 py-3 text-sm leading-6 text-[#3c4043]">
              Anyone want to build something together?
            </div>
          </div>
          <div className="flex items-start justify-end gap-3">
            <div className="rounded-2xl rounded-tr-sm bg-[#e8f0fe] px-4 py-3 text-sm leading-6 text-[#3c4043]">
              Bring your idea to the next project meeting 🚀
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ea4335] text-[10px] font-bold text-white">
              GK
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eceff3] pt-4">
          <div className="flex -space-x-2">
            {[
              ["SM", "#34A853"],
              ["AL", "#FBBC05"],
              ["SK", "#4285F4"],
              ["+", "#5f6368"],
            ].map(([initials, color]) => (
              <span
                key={initials}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {initials}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#7a7d83]">Learn · build · connect</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { events, isLoading, error } = useEvents();
  const featuredEvents = events.slice(0, 3).map(presentEvent);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-12 sm:px-8 lg:px-[90px] lg:pb-20 lg:pt-16">
        <div className="grid items-start gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
          <div className="flex flex-col gap-6 lg:pt-5">
            <article className="relative min-h-[430px] overflow-hidden rounded-[30px] border border-[#e4e7eb] bg-white p-7 shadow-[0_18px_55px_rgba(32,33,36,.08)] sm:p-10">
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-2 w-full bg-[linear-gradient(90deg,#4285f4_0_25%,#ea4335_25%_50%,#fbbc05_50%_75%,#34a853_75%)]"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[#e8f0fe]"
              />

              <div className="relative flex min-h-[350px] flex-col justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-[#e8f0fe] px-4 py-2 text-xs font-semibold uppercase tracking-[.14em] text-[#1a73e8]">
                    <span className="h-2 w-2 rounded-full bg-[#34a853]" />
                    Google Developer Groups · UF
                  </p>
                  <h1 className="mt-7 max-w-[530px] text-[clamp(3rem,5vw,5.6rem)] font-bold leading-[.93] tracking-[-.06em] text-[#202124]">
                    Learn together. Build something real.
                  </h1>
                </div>
                <p className="mt-7 max-w-[520px] text-base leading-7 text-[#5f6368] sm:text-lg sm:leading-8">
                  A student community for developers, designers, and curious
                  minds at the University of Florida. Come grow your skills,
                  meet collaborators, and turn ideas into projects.
                </p>
              </div>
            </article>

            <article className="grid gap-5 rounded-[24px] border border-[#e4e7eb] bg-white p-6 shadow-[0_12px_35px_rgba(32,33,36,.05)] sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#34a853]">
                  Who we are
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-.03em] text-[#202124]">
                  A place to learn by doing.
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#6a6d73]">
                  No experience level is required—just bring your curiosity.
                </p>
              </div>
              <Link
                to="/officers"
                className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#dadce0] px-5 py-2.5 font-semibold text-[#3c4043] no-underline transition hover:border-[#4285f4] hover:text-[#1a73e8]"
              >
                Meet the team <ArrowIcon />
              </Link>
            </article>
          </div>

          <article className="min-h-[615px] rounded-[30px] border border-[#e4e7eb] bg-white p-6 shadow-[0_18px_55px_rgba(32,33,36,.08)] sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#5865f2]">
                  Our community
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-[-.035em] text-[#202124] sm:text-4xl">
                  Join the conversation.
                </h2>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5865f2] text-white shadow-[0_10px_25px_rgba(88,101,242,.24)]">
                <DiscordIcon />
              </span>
            </div>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#6a6d73] sm:text-base">
              Ask questions, share opportunities, find teammates, and keep up
              with what the club is building.
            </p>
            <DiscordGraphic />
          </article>
        </div>
      </section>

      <section className="border-y border-[#e4e7eb] bg-white/75">
        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-8 lg:px-[90px] lg:py-20">
          <div className="rounded-[30px] bg-[#202124] p-7 text-white shadow-[0_20px_60px_rgba(32,33,36,.14)] sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#8ab4f8]">
                  Club calendar
                </p>
                <h2 className="mt-3 text-4xl font-bold tracking-[-.045em] sm:text-6xl">
                  What’s coming up
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#bdc1c6]">
                  Workshops, project meetings, talks, and community events—all
                  in one place.
                </p>
              </div>
              <Link
                to="/events"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-[#202124] no-underline transition hover:-translate-y-0.5 hover:text-[#1a73e8]"
              >
                Open full calendar <ArrowIcon />
              </Link>
            </div>

            {isLoading && (
              <div className="mt-10 rounded-[22px] border border-white/15 bg-white/[.07] p-6 text-[#bdc1c6]">
                Loading events…
              </div>
            )}
            {error && (
              <div
                role="alert"
                className="mt-10 rounded-[22px] border border-[#f28b82]/50 bg-[#ea4335]/10 p-6 text-[#f6aea8]"
              >
                Events could not be loaded right now.
              </div>
            )}
            {!isLoading && !error && featuredEvents.length === 0 && (
              <div className="mt-10 rounded-[22px] border border-white/15 bg-white/[.07] p-6 text-[#bdc1c6]">
                No events have been added yet.
              </div>
            )}
            {!isLoading && !error && featuredEvents.length > 0 && (
              <div className="mt-10 grid gap-4 lg:grid-cols-3">
                {featuredEvents.map((event, index) => (
                  <Link
                    key={event.id}
                    to="/events"
                    className="group flex min-h-48 flex-col justify-between rounded-[22px] border border-white/15 bg-white/[.07] p-5 text-white no-underline transition hover:-translate-y-1 hover:bg-white/[.12]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-[#e8eaed]">
                        {event.category}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: ["#4285F4", "#EA4335", "#FBBC05"][
                            index
                          ],
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-[-.025em]">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#bdc1c6]">
                        {event.dateLabel} · {event.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-white/70">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-[#6a6d73] sm:px-8 lg:px-[90px]">
          <p>Google Developer Groups at the University of Florida</p>
          <p>Built by students, for students.</p>
        </div>
      </footer>
    </>
  );
}
