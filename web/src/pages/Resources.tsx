import { useMemo } from "react";
import { useResources } from "../hooks/useResources";

type ResourceLink = {
  name: string;
  description: string;
  url: string;
};

type ResourceCategory = {
  title: string;
  subtitle: string;
  color: string;
  resources: ResourceLink[];
};

const categoryColors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

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
      className={`rounded-2xl border border-[#e7e7e7] bg-white p-6 ${className}`}
      aria-label={`${category.title} resources`}
    >
      <h2 className="flex items-center gap-3 text-[23px] font-bold leading-[1.4] text-[#202124]">
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
                <span className="block text-[15px] font-medium leading-[1.4] text-[#1a73e8] group-hover:underline">
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

export default function Resources() {
  const firebaseResources = useResources();
  const categories = useMemo(() => {
    const merged = curatedCategories.map((category) => ({
      ...category,
      resources: [...category.resources],
    }));

    for (const resource of firebaseResources) {
      let category = merged.find(
        (item) =>
          item.title.toLocaleLowerCase() ===
          resource.category.toLocaleLowerCase(),
      );

      if (!category) {
        category = {
          title: resource.category,
          subtitle: `More tools and learning from ${resource.provider}`,
          color: categoryColors[merged.length % categoryColors.length],
          resources: [],
        };
        merged.push(category);
      }

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
    <section className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 pt-[68px] sm:px-8 lg:px-[120px]">
      <header className="mb-6">
        <h1 className="text-[clamp(44px,5vw,64px)] font-bold leading-[1.4] tracking-[-0.035em] text-[#202124]">
          Resources
        </h1>
        <p className="mt-1 text-[18px] leading-[1.4] text-[#6a6d73]">
          Helpful tools, tutorials, and student offers.
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
      <footer className="mt-6 text-[13px] leading-[1.4] text-[#6a6d73]">
        Curated by GDG at UF.
      </footer>
    </section>
  );
}
