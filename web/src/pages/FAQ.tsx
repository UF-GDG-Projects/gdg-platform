const DISCORD_INVITE = "https://discord.gg/B8hzpMvCQ";

const questions = [
  {
    question: "Do I need programming experience to join?",
    answer:
      "All skill levels are welcome, but our projects require that you be willing to learn. Our tech leads will often host workshops, share resources & advice, and provide all the help that you need to get started.",
  },
  {
    question: "Who should I reach out to if I have questions?",
    answer:
      "The quickest way to get in touch with the team is to reach out to an officer on discord.",
  },
  {
    question: "How frequently do events and workshops occur?",
    answer:
      "Our technical leads host biweekly workshops, and we host numerous social events throughout the semester. Join our Discord to stay updated.",
  },
  {
    question: "What should I bring to the workshops?",
    answer:
      "You should bring a notebook, pen, laptop, and most importantly, a curious mind.",
  },
  {
    question: "Why should I join?",
    answer:
      "Joining the UF Google Developer Group on Campus is a great way to gain experience for your CV and develop a strong project portfolio. Working on open source projects or leading a group as a tech-lead positively distinguishes you from other job applicants.",
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
      <header>
        <div>
          <h1 className="max-w-[760px] text-[clamp(3.5rem,7vw,6rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[#2d2d2d]">
            Frequently asked questions
          </h1>
        </div>
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
