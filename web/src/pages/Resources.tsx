import { useMemo } from "react";
import { useResources } from "../hooks/useResources";

type Resource = {
  name: string;
  description: string;
  url: string;
};

type ResourceCategory = {
  title: string;
  subtitle: string;
  color: string;
  resources: Resource[];
};

const curatedCategories: ResourceCategory[] = [
  {
    title: "General",
    subtitle: "Everyday tools to get started",
    color: "#4285F4",
    resources: [
      {
        name: "VS Code",
        description: "A versatile code editor",
        url: "https://code.visualstudio.com/Download",
      },
      {
        name: "Antigravity",
        description: "Google’s AI coding editor",
        url: "https://antigravity.google/product",
      },
      {
        name: "Gemini for Students",
        description: "Explore Google AI student offers",
        url: "https://gemini.google/students/",
      },
      {
        name: "tldraw",
        description: "A collaborative whiteboard",
        url: "https://www.tldraw.com",
      },
    ],
  },
  {
    title: "Figma",
    subtitle: "Design, prototype, and collaborate",
    color: "#EA4335",
    resources: [
      {
        name: "Figma for beginners",
        description: "Start with the official Figma course",
        url: "https://help.figma.com/hc/en-us/articles/30848209492887-Course-overview-Figma-Design-for-beginners-2025",
      },
      {
        name: "Figma Education",
        description: "Explore Figma’s student plan",
        url: "https://www.figma.com/education/",
      },
    ],
  },
  {
    title: "Git",
    subtitle: "Version control without the confusion",
    color: "#FBBC05",
    resources: [
      {
        name: "Git introduction",
        description: "YouTube · 10-minute introduction",
        url: "https://www.youtube.com/watch?v=r8jQ9hVA2qs",
      },
      {
        name: "Git Cheat Sheet",
        description: "Keep common commands close by",
        url: "https://git-scm.com/cheat-sheet",
      },
      {
        name: "Conventional Commits",
        description: "A guide to writing commit messages",
        url: "https://www.conventionalcommits.org/en/v1.0.0/",
      },
      {
        name: "Dangit, Git!?!",
        description: "Useful commands for fixing Git mistakes",
        url: "https://dangitgit.com/",
      },
    ],
  },
  {
    title: "React",
    subtitle: "Build your first web interface",
    color: "#4285F4",
    resources: [
      {
        name: "React introduction",
        description: "YouTube · 10-minute introduction",
        url: "https://www.youtube.com/watch?v=s2skans2dP4",
      },
      {
        name: "Learn React",
        description: "Work through the official React course",
        url: "https://react.dev/learn",
      },
    ],
  },
  {
    title: "Flutter",
    subtitle: "Explore cross-platform development",
    color: "#34A853",
    resources: [
      {
        name: "Flutter introduction",
        description: "YouTube · 10-minute introduction",
        url: "https://www.youtube.com/watch?v=xWV71C2kp38",
      },
      {
        name: "Full Flutter course",
        description: "A longer, step-by-step video course",
        url: "https://www.youtube.com/watch?v=TclK5gNM_PM",
      },
    ],
  },
  {
    title: "HTML / CSS",
    subtitle: "Start with the foundations of the web",
    color: "#EA4335",
    resources: [
      {
        name: "W3Schools HTML course",
        description: "Learn HTML with examples and practice",
        url: "https://www.w3schools.com/html/",
      },
      {
        name: "Codecademy HTML & CSS",
        description: "Explore interactive web courses",
        url: "https://www.codecademy.com/catalog/language/html-css",
      },
    ],
  },
  {
    title: "Google Cloud / Firebase",
    subtitle: "Explore cloud tools and learning paths",
    color: "#FBBC05",
    resources: [
      {
        name: "Google Skills",
        description: "Find Google Cloud courses and hands-on labs",
        url: "https://www.skills.google/paths",
      },
    ],
  },
];

const questions = [
  {
    question: "Do I need programming experience to join?",
    answer:
      "All skill levels are welcome, but our projects require that you be willing to learn. Our tech leads will often host workshops, share resources & advice, and provide all the help that you need to get started.",
  },
  {
    question: "Who should I reach out to if I have questions?",
    answer:
      "The quickest way to get in touch with the team is to reach out to an officer on Discord.",
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

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 5h6v6M19 5l-9 9" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function ResourceCard({
  category,
  className = "",
}: {
  category: ResourceCategory;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-[#e7e7e7] bg-white p-6 shadow-[inset_0_1px_2px_rgba(0,0,0,.16)] ${className}`}
      aria-label={`${category.title} resources`}
    >
      <h2 className="flex items-center gap-3 text-[23px] leading-[1.4] font-bold text-[#202124]">
        <span
          className="h-[10px] w-[10px] shrink-0 rounded-full"
          style={{ backgroundColor: category.color }}
          aria-hidden="true"
        />
        {category.title}
      </h2>
      <p className="mt-2 text-[13px] leading-[1.4] text-[#6a6d73]">
        {category.subtitle}
      </p>

      <ul className="mt-4 space-y-3">
        {category.resources.map((resource) => (
          <li key={resource.url} className="min-h-[54px]">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-3 rounded-md outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#1a73e8]"
              aria-label={`${resource.name} (opens in a new tab)`}
            >
              <span className="min-w-0">
                <span className="block text-[15px] leading-[1.4] font-medium text-[#1a73e8] group-hover:underline">
                  {resource.name}
                </span>
                <span className="mt-[3px] block text-[12px] leading-[1.4] text-[#6a6d73]">
                  {resource.description}
                </span>
              </span>
              <span className="mt-0.5 shrink-0 text-[#6a6d73] group-hover:text-[#1a73e8]">
                <ExternalLinkIcon />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="mt-5 scroll-mt-24">
      <header className="mb-5">
        <h2 className="text-[clamp(38px,4vw,48px)] font-bold leading-[1.4] tracking-[-0.035em] text-[#202124]">
          Frequently Asked Question
        </h2>
        <p className="mt-1 text-[18px] leading-[1.4] text-[#6a6d73]">
          For any questions you may still have
        </p>
      </header>
      <div className="min-h-[353px] overflow-hidden rounded-2xl border border-[#e7e7e7] bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,.16)]">
        {questions.map((item) => (
          <details
            key={item.question}
            className="group border-b border-[#e8e8e8] last:border-b-0"
          >
            <summary className="flex min-h-[70px] cursor-pointer list-none items-center gap-4 px-5 py-4 outline-none transition-colors hover:bg-[#fafafa] focus-visible:bg-[#f3f7ff] sm:px-7 [&::-webkit-details-marker]:hidden">
              <span className="flex-1 text-base font-semibold leading-6 text-[#2d2d2d] sm:text-lg">
                {item.question}
              </span>
              <span className="shrink-0 text-[#6a6d73] transition-transform duration-200 group-open:rotate-45">
                <PlusIcon />
              </span>
            </summary>
            <div className="px-5 pb-5 sm:px-7">
              <p className="max-w-[980px] text-[15px] leading-6 text-[#686868]">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function Resources() {
  const firebaseResources = useResources();
  const categories = useMemo(() => {
    const merged = curatedCategories.map((category) => ({
      ...category,
      resources: [...category.resources],
    }));

    for (const resource of firebaseResources) {
      const category =
        merged.find(
          (item) =>
            item.title.toLocaleLowerCase() ===
            resource.category.toLocaleLowerCase(),
        ) ?? merged[0];

      if (!category) continue;

      const normalizedUrl = resource.url.replace(/^\((.*)\)$/, "$1");
      const isDuplicate = category.resources.some(
        (item) =>
          item.url === normalizedUrl ||
          item.name.toLocaleLowerCase() === resource.title.toLocaleLowerCase(),
      );

      if (!isDuplicate) {
        category.resources.push({
          name: resource.title,
          description: resource.description,
          url: normalizedUrl,
        });
      }
    }

    return merged;
  }, [firebaseResources]);

  return (
    <section className="relative mx-auto mb-12 mt-[65px] w-[calc(100%-32px)] max-w-[1242px] rounded-[18px] border border-[#c2c2c2b3] bg-[#f4f4f4] p-5 shadow-[0_1px_2px_rgba(0,0,0,.25)] sm:p-[21px]">
      <header className="mb-6">
        <h1 className="text-[clamp(42px,4vw,48px)] font-bold leading-[1.4] tracking-[-0.035em] text-[#202124]">
          Resources
        </h1>
        <p className="mt-1 text-[18px] leading-[1.4] text-[#6a6d73]">
          Helpful tools, tutorials, and student offers. Pick a topic and start
          exploring.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => (
          <ResourceCard
            key={category.title}
            category={category}
            className={
              index < 3
                ? "min-h-[432px]"
                : index === categories.length - 1 && categories.length % 3 === 1
                  ? "min-h-[194px] md:col-span-2 xl:col-span-3"
                  : "min-h-[280px]"
            }
          />
        ))}
      </div>

      <FAQSection />
    </section>
  );
}
