const projects = [
  { id: 1, reverse: false },
  { id: 2, reverse: true },
  { id: 3, reverse: false },
];

function PlaceholderImage({ tall = false }: { tall?: boolean }) {
  return (
    <div
      role="img"
      className={`flex items-center justify-center border border-[#c2c2c2] bg-[#f1f3f4] ${
        tall ? "h-full" : "min-h-0 flex-1"
      }`}
      aria-label="Project image to be updated"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 120 90"
        className="h-auto w-[72%] text-[#9aa0a6]"
        fill="none"
      >
        <rect
          x="4"
          y="4"
          width="112"
          height="82"
          rx="4"
          stroke="currentColor"
          strokeWidth="5"
        />
        <circle cx="88" cy="25" r="10" fill="currentColor" />
        <path d="m18 72 27-31 21 24 13-14 25 21H18Z" fill="currentColor" />
      </svg>
    </div>
  );
}

function ProjectImages() {
  return (
    <div className="grid h-[340px] grid-cols-[.62fr_1fr] gap-4">
      <PlaceholderImage tall />
      <div className="flex min-h-0 flex-col gap-4">
        <PlaceholderImage />
        <PlaceholderImage />
      </div>
    </div>
  );
}

function ProjectEntry({ reverse }: { reverse: boolean }) {
  const copy = (
    <div className={reverse ? "lg:text-right" : ""}>
      <h2 className="inline-flex min-h-9 items-center rounded-[10px] bg-[#4385f3] px-3 font-mono text-xl font-medium leading-[1.4] text-white">
        To be updated
      </h2>
      <p className="mt-3 text-sm leading-[1.4] text-[#767676]">
        To be updated.
      </p>
    </div>
  );

  const images = <ProjectImages />;

  return (
    <article className="grid items-start gap-8 lg:grid-cols-[minmax(0,433px)_minmax(0,426px)] lg:gap-[52px]">
      {reverse ? images : copy}
      {reverse ? copy : images}
    </article>
  );
}

export default function Gallery() {
  return (
    <section className="mx-auto mb-5 mt-[64px] w-[calc(100%-32px)] max-w-[992px] rounded-[18px] bg-[#f4f4f4] p-4 shadow-[0_1px_2px_rgba(0,0,0,.25)]">
      <div className="min-h-[1268px] rounded-[16px] border border-[#e7e7e7] bg-white px-6 pb-10 pt-5 shadow-[inset_0_1px_2px_rgba(0,0,0,.14)] sm:px-[25px]">
        <header>
          <h1 className="text-[48px] font-bold leading-[1.4] tracking-[-.035em] text-[#2d2d2d]">
            Gallery
          </h1>
          <p className="text-xl leading-[1.4] text-[#767676]">
            View our past projects and events!
          </p>
        </header>

        <div className="mt-[43px] space-y-[43px]">
          {projects.map((project) => (
            <ProjectEntry key={project.id} reverse={project.reverse} />
          ))}
        </div>
      </div>
    </section>
  );
}
