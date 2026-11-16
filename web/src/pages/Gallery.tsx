import projectPlaceholder from "../assets/gallery/project-placeholder.png";
import barteringDesktopBottom from "../assets/gallery/uf-bartering-desktop-bottom.png";
import barteringDesktopTop from "../assets/gallery/uf-bartering-desktop-top.png";
import barteringMobile from "../assets/gallery/uf-bartering-mobile.png";
import { useGalleryProjects } from "../hooks/useGalleryProjects";

type GalleryProject = {
  description: string;
  id: string;
  title: string;
  reverse: boolean;
  images: [string, string, string];
};

const figmaProjects: GalleryProject[] = [
  {
    id: "uf-bartering",
    title: "UF Bartering",
    description: "To be updated.",
    reverse: false,
    images: [barteringMobile, barteringDesktopTop, barteringDesktopBottom],
  },
  {
    id: "google-projects",
    title: "Google Projects",
    description: "To be updated.",
    reverse: true,
    images: [projectPlaceholder, projectPlaceholder, projectPlaceholder],
  },
  {
    id: "google-puzzles",
    title: "Google Puzzles",
    description: "To be updated.",
    reverse: false,
    images: [projectPlaceholder, projectPlaceholder, projectPlaceholder],
  },
];

function ProjectImage({
  src,
  alt,
  tall = false,
}: {
  src: string;
  alt: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden border border-[#c2c2c2] bg-[#f1f3f4] ${
        tall ? "h-full" : "min-h-0 flex-1"
      }`}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function ProjectImages({ project }: { project: GalleryProject }) {
  return (
    <div className="grid h-[340px] grid-cols-[.62fr_1fr] gap-4">
      <ProjectImage
        src={project.images[0]}
        alt={`${project.title} mobile view`}
        tall
      />
      <div className="flex min-h-0 flex-col gap-4">
        <ProjectImage
          src={project.images[1]}
          alt={`${project.title} project view one`}
        />
        <ProjectImage
          src={project.images[2]}
          alt={`${project.title} project view two`}
        />
      </div>
    </div>
  );
}

function ProjectEntry({ project }: { project: GalleryProject }) {
  const copy = (
    <div className={project.reverse ? "lg:text-right" : ""}>
      <h2 className="inline-flex min-h-9 items-center rounded-[10px] bg-[#4385f3] px-3 font-mono text-xl font-medium leading-[1.4] text-white">
        {project.title}
      </h2>
      <p className="mt-3 text-sm leading-[1.4] text-[#767676]">
        {project.description}
      </p>
    </div>
  );

  const images = <ProjectImages project={project} />;

  return (
    <article className="grid items-start gap-8 lg:grid-cols-[minmax(0,433px)_minmax(0,426px)] lg:gap-[52px]">
      {project.reverse ? images : copy}
      {project.reverse ? copy : images}
    </article>
  );
}

export default function Gallery() {
  const firebaseProjects = useGalleryProjects();
  const projects: GalleryProject[] =
    firebaseProjects.length > 0
      ? firebaseProjects.map((project, index) => {
          const images = [...project.image_urls];
          while (images.length < 3) images.push(projectPlaceholder);

          return {
            id: project.document_id,
            title: project.title,
            description: project.description,
            reverse:
              project.text_side === "right" ||
              (project.text_side === undefined && index % 2 === 1),
            images: [images[0], images[1], images[2]],
          };
        })
      : figmaProjects;

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
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
