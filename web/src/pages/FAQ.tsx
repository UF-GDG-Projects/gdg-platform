const DISCORD_INVITE = "https://discord.gg/B8hzpMvCQ";

const questions = [
  {
    question: "What is GDG on Campus at UF?",
    answer:
      "GDG on Campus at UF is a student-led community for people interested in technology, design, and building. We host workshops, talks, projects, and social events throughout the year.",
  },
  {
    question: "Who can join?",
    answer:
      "UF students from any major are welcome. Whether you are exploring tech for the first time or already building projects, there is a place for you here.",
  },
  {
    question: "Do I need technical experience?",
    answer:
      "Not at all. Many events are designed for beginners, and our community is a great place to learn alongside other students.",
  },
  {
    question: "How do I become a member?",
    answer:
      "There is no application required. Join the Discord, come to an event, and introduce yourself. That is all you need to get started.",
  },
  {
    question: "Where can I find upcoming events?",
    answer:
      "The Events page has our Google Calendar and detailed event cards. Add the calendar to your account so new events stay easy to find.",
  },
  {
    question: "Are events free?",
    answer:
      "Most GDG events are free for students. If an event has limited space, registration, or another requirement, we will include it in the event details.",
  },
  {
    question: "Can I work on a GDG project?",
    answer:
      "Yes. Project opportunities are shared through our community and events. The Gallery will also showcase work created by GDG members and project teams.",
  },
  {
    question: "How can I contact the officer team?",
    answer:
      "The fastest option is the GDG Discord. Join the server and send your question in the appropriate channel so an officer can help.",
  },
];

const accentColors = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"];

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function FAQ() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 pt-[68px] sm:px-10 lg:px-[95px]">
      <header className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#4285f4]">
            Need a hand?
          </p>
          <h1 className="max-w-[760px] text-[clamp(3.5rem,7vw,6rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[#2d2d2d]">
            Frequently asked questions
          </h1>
        </div>
        <p className="max-w-[500px] pb-2 text-lg leading-8 text-[#686868]">
          Everything you need to know before joining the GDG community at the
          University of Florida.
        </p>
      </header>

      <div className="mt-14 overflow-hidden rounded-[22px] border border-[#e2e2e2] bg-white shadow-[0_8px_30px_rgba(0,0,0,.06)]">
        {questions.map((item, index) => (
          <details
            key={item.question}
            className="group border-b border-[#e8e8e8] last:border-b-0"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-6 outline-none transition-colors hover:bg-[#fafafa] focus-visible:bg-[#f3f7ff] sm:px-8 [&::-webkit-details-marker]:hidden">
              <span
                aria-hidden="true"
                className="h-3 w-3 shrink-0 rounded-full"
                style={{
                  backgroundColor: accentColors[index % accentColors.length],
                }}
              />
              <span className="flex-1 text-lg font-semibold leading-7 text-[#2d2d2d] sm:text-xl">
                {item.question}
              </span>
              <span className="shrink-0 text-[#6a6d73] transition-transform duration-200 group-open:rotate-45">
                <PlusIcon />
              </span>
            </summary>
            <div className="px-12 pb-7 pr-8 sm:pl-[68px]">
              <p className="max-w-[850px] text-base leading-7 text-[#686868]">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[22px] bg-[#2d2d2d] px-6 py-7 text-white sm:flex-row sm:items-center sm:px-8">
        <div>
          <h2 className="text-2xl font-semibold">Still have a question?</h2>
          <p className="mt-1 text-[#d4d4d4]">
            Ask the officer team on Discord.
          </p>
        </div>
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#5865f2] px-6 py-3 font-semibold text-white shadow-[0_4px_0_rgba(0,0,0,.18)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Join our Discord
        </a>
      </div>
    </section>
  );
}
