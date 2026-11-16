import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EventCard from "../components/EventCard";
import { useDemoAccount } from "../demo/DemoAccount";
import { useEvents } from "../hooks/useEvents";
import { checkInToEvent, subscribeToCheckIn } from "../services/checkIns";
import type { GDGEvent } from "../types/events";
import { presentEvent } from "../utils/eventPresentation";

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/u/0?cid=Z2Rnb25jYW1wdXN1ZkBnbWFpbC5jb20";

const GOOGLE_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?src=gdgoncampusuf%40gmail.com&ctz=America%2FNew_York";

function EventDialog({
  event,
  onClose,
}: {
  event: GDGEvent;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const { user, profile, loading: accountLoading } = useDemoAccount();

  const [now, setNow] = useState(Date.now());
  const [checkedIn, setCheckedIn] = useState(false);
  const [loadingCheckIn, setLoadingCheckIn] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 15_000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setCheckedIn(false);
    setMessage("");

    if (!user || !profile) {
      setLoadingCheckIn(false);
      return;
    }

    setLoadingCheckIn(true);

    return subscribeToCheckIn(
      event.id,
      user.uid,
      (exists) => {
        setCheckedIn(exists);
        setLoadingCheckIn(false);
      },
      (error) => {
        console.error("Check-in lookup failed:", error);
        setMessage(
          "Unable to load check-in status. Check Firestore permissions.",
        );
        setLoadingCheckIn(false);
      },
    );
  }, [event.id, user, profile]);

  const beforeEvent = now < event.startsAt.getTime();
  const afterEvent = now > event.endsAt.getTime();
  const eventActive = !beforeEvent && !afterEvent;

  async function handleCheckIn() {
    if (saving || checkedIn || !eventActive) return;

    if (!user) {
      navigate("/login");
      return;
    }

    if (!profile) {
      navigate("/signup/personal");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await checkInToEvent(event.id, user.uid);
      setCheckedIn(true);
      setMessage("You're checked in! Enjoy the event.");
    } catch (error) {
      console.error("Check-in failed:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to check in. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  let buttonLabel = "Check In";

  if (checkedIn) {
    buttonLabel = "Checked In ✓";
  } else if (afterEvent) {
    buttonLabel = "Check In Closed";
  } else if (eventActive && accountLoading) {
    buttonLabel = "Loading...";
  } else if (eventActive && !user) {
    buttonLabel = "Log In to Check In";
  } else if (eventActive && !profile) {
    buttonLabel = "Complete Sign Up";
  } else if (eventActive && (loadingCheckIn || saving)) {
    buttonLabel = saving ? "Checking In..." : "Loading...";
  }

  const buttonDisabled =
    checkedIn || !eventActive || accountLoading || loadingCheckIn || saving;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#c2c2c21a] p-4 backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-dialog-title"
      onMouseDown={(mouseEvent) => {
        if (mouseEvent.currentTarget === mouseEvent.target) {
          onClose();
        }
      }}
    >
      <div className="relative grid max-h-[90vh] w-full max-w-[964px] overflow-auto rounded-[40px] border border-[#cfcfcfb3] bg-white p-[18px] shadow-[0_2px_4px_rgba(0,0,0,.25)] md:grid-cols-[1.05fr_.95fr] md:gap-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-xl text-[#2d2d2d] shadow-md"
          aria-label="Close event details"
        >
          ×
        </button>

        <div className="overflow-hidden rounded-[30px] bg-[#f4f4f4] shadow-[0_2px_4px_rgba(0,0,0,.22)]">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.imageAlt || ""}
              className="h-full min-h-[420px] w-full object-cover"
            />
          ) : (
            <div className="flex min-h-[520px] items-center justify-center p-10 text-center text-4xl font-semibold">
              {event.title}
            </div>
          )}
        </div>

        <div className="flex flex-col px-1 py-5 md:px-0 md:py-0">
          <div>
            <h2
              id="event-dialog-title"
              className="inline-flex rounded-[15px] bg-[#4385f3] px-4 py-2 font-mono text-2xl font-medium text-white sm:text-[32px]"
            >
              {event.title}
            </h2>

            <h3 className="mt-5 text-xl font-semibold text-[#2d2d2d]">
              Event Info
            </h3>

            <p className="mt-1 text-sm leading-5 text-[#767676]">
              {event.dateLabel}
              <br />
              {event.location}
            </p>

            <h3 className="mt-6 text-xl font-semibold text-[#2d2d2d]">
              Description
            </h3>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-[1.35] text-[#767676]">
              {event.description || "More event details are coming soon."}
            </p>
          </div>

          <div className="mt-auto flex flex-col items-end gap-2 pt-8">
            {message && (
              <p
                className="w-full text-right text-sm text-[#767676]"
                role="status"
              >
                {message}
              </p>
            )}

            <button
              type="button"
              disabled={buttonDisabled}
              onClick={handleCheckIn}
              className={`rounded-full px-5 py-2 text-sm font-medium text-white transition ${
                checkedIn
                  ? "cursor-default bg-[#c2c2c2]"
                  : buttonDisabled
                    ? "cursor-not-allowed bg-[#8db6fa] opacity-70"
                    : "bg-[#4385f3] hover:bg-[#3275e5]"
              }`}
            >
              {buttonLabel}
            </button>

            {beforeEvent && !checkedIn && (
              <p className="text-xs text-[#767676]">
                Check-in opens when the event starts.
              </p>
            )}

            {afterEvent && !checkedIn && (
              <p className="text-xs text-[#767676]">This event has ended.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const { events, isLoading, error } = useEvents();
  const displayEvents = events.map(presentEvent);

  const [selectedEvent, setSelectedEvent] = useState<GDGEvent | null>(null);

  return (
    <section className="mx-auto max-w-[1040px] px-4 pb-16 pt-[54px] sm:px-6">
      <div className="rounded-[20px] border border-[#c2c2c2b3] bg-[#f4f4f4] p-6 shadow-[0_1px_2px_rgba(0,0,0,.25)] sm:p-8">
        <h1 className="text-4xl font-bold tracking-[-.035em] text-[#2d2d2d] sm:text-5xl">
          Calendar
        </h1>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <p className="text-base text-[#767676] sm:text-xl">
            Keep up with GDG meetings, workshops, and events.
          </p>

          <a
            href={GOOGLE_CALENDAR_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center rounded-full bg-[#4385f3] px-5 text-sm font-semibold text-white no-underline shadow-sm transition hover:-translate-y-0.5 hover:bg-[#3275e5]"
          >
            Add to Google Calendar
          </a>
        </div>

        <div className="mt-4">
          <div className="overflow-hidden rounded-[20px] border border-[#c2c2c2] bg-white shadow-sm">
            <iframe
              src={GOOGLE_CALENDAR_EMBED_URL}
              title="GDG on Campus UF Google Calendar"
              className="h-[470px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        <h2 className="mt-5 text-4xl font-bold tracking-[-.035em] text-[#2d2d2d] sm:text-5xl">
          Upcoming Events
        </h2>

        <p className="mt-1 text-base text-[#767676] sm:text-xl">
          We have something fun for everyone
        </p>

        {isLoading && (
          <p className="mt-5 text-[#767676]" role="status">
            Loading events...
          </p>
        )}

        {error && (
          <p className="mt-5 text-red-600" role="alert">
            Unable to load events: {error}
          </p>
        )}

        {!isLoading && !error && displayEvents.length === 0 && (
          <div className="mt-5 rounded-[18px] border border-[#d8d8d8] bg-white p-8 text-center text-[#767676]">
            No events have been added yet.
          </div>
        )}

        {!isLoading && !error && displayEvents.length > 0 && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={setSelectedEvent}
              />
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventDialog
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}
