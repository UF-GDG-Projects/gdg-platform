import type { CSSProperties } from "react";
import andrewChuangSaladin from "../assets/officers/andrew-chuang-saladin.png";
import carlosMendez from "../assets/officers/carlos-mendez.png";
import felixChang from "../assets/officers/felix-chang.png";
import jackDetweiler from "../assets/officers/jack-detweiler.png";
import jackHarris from "../assets/officers/jack-harris.jpg";
import luIghodalo from "../assets/officers/lu-ighodalo.png";
import mishkaSonavadekar from "../assets/officers/mishka-sonavadekar.png";
import saiRajan from "../assets/officers/sai-rajan.png";
import sophieDaniel from "../assets/officers/sophie-daniel.png";
import weedchenskaJeanbaptiste from "../assets/officers/weedchenska-jeanbaptiste.png";
import zachZaslau from "../assets/officers/zach-zaslau.png";
import { useOfficers } from "../hooks/useOfficers";
import "./Officers.css";

type DisplayOfficer = {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedinUrl: string;
  displayOrder: number;
  isActive: boolean;
};

const fallbackOfficers: DisplayOfficer[] = [
  {
    id: "president",
    name: "Jack Harris",
    role: "President",
    image: jackHarris,
    linkedinUrl: "",
    displayOrder: 0,
    isActive: true,
  },
  {
    id: "vice-president",
    name: "Andrew Chuang Saladin",
    role: "Vice President",
    image: andrewChuangSaladin,
    linkedinUrl: "",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "treasurer",
    name: "Sophie Daniel",
    role: "Treasurer",
    image: sophieDaniel,
    linkedinUrl: "",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "technical-lead-1",
    name: "Jack Detweiler",
    role: "Technical Lead",
    image: jackDetweiler,
    linkedinUrl: "",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "technical-lead-2",
    name: "Weedchenska Jeanbaptiste",
    role: "Technical Lead",
    image: weedchenskaJeanbaptiste,
    linkedinUrl: "",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "hackathon-lead-1",
    name: "Zach Zaslau",
    role: "Hackathon Lead",
    image: zachZaslau,
    linkedinUrl: "",
    displayOrder: 5,
    isActive: true,
  },
  {
    id: "hackathon-lead-2",
    name: "Felix Chang",
    role: "Hackathon Lead",
    image: felixChang,
    linkedinUrl: "",
    displayOrder: 6,
    isActive: true,
  },
  {
    id: "hackathon-lead-3",
    name: "Carlos Mendez",
    role: "Hackathon Lead",
    image: carlosMendez,
    linkedinUrl: "",
    displayOrder: 7,
    isActive: true,
  },
  {
    id: "social-lead",
    name: "Sai Rajan",
    role: "Social Lead",
    image: saiRajan,
    linkedinUrl: "",
    displayOrder: 8,
    isActive: true,
  },
  {
    id: "marketing-lead",
    name: "Mishka Sonavadekar",
    role: "Marketing Lead",
    image: mishkaSonavadekar,
    linkedinUrl: "",
    displayOrder: 9,
    isActive: true,
  },
  {
    id: "outreach-lead",
    name: "Lu Ighodalo",
    role: "Outreach Lead",
    image: luIghodalo,
    linkedinUrl: "",
    displayOrder: 10,
    isActive: true,
  },
];

function OfficerSurface({ officer }: { officer: DisplayOfficer }) {
  const hasLinkedIn = Boolean(officer.linkedinUrl);
  const hasLongName = officer.name.length >= 18;

  return (
    <article className="officer-card-surface">
      <span
        className={`officer-linkedin${hasLinkedIn ? "" : " officer-linkedin-pending"}`}
        aria-hidden="true"
        title={hasLinkedIn ? undefined : "LinkedIn profile coming soon"}
      >
        in
      </span>
      <img
        src={officer.image}
        alt={`${officer.name}, ${officer.role}`}
        className="officer-photo mx-auto mt-[21px] h-[136px] w-[136px] rounded-full object-cover"
      />
      <div className="absolute inset-x-[15px] top-[165px]">
        <h2
          className={`officer-name text-[25.6px] font-semibold leading-[1.02] tracking-[-.025em] text-black${
            hasLongName ? " officer-name-long" : ""
          }`}
        >
          {officer.name}
        </h2>
        <p className="mt-1 text-[19.2px] font-light leading-none text-black">
          {officer.role}
        </p>
      </div>
    </article>
  );
}

function OfficerCard({
  officer,
  index,
}: {
  officer: DisplayOfficer;
  index: number;
}) {
  const style = {
    "--float-delay": `${index * -0.42}s`,
  } as CSSProperties;

  if (officer.linkedinUrl) {
    return (
      <a
        className="officer-card"
        style={style}
        href={officer.linkedinUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${officer.name}'s LinkedIn profile`}
      >
        <OfficerSurface officer={officer} />
      </a>
    );
  }

  return (
    <div className="officer-card" style={style}>
      <OfficerSurface officer={officer} />
    </div>
  );
}

export default function Officers() {
  const firebaseOfficers = useOfficers();
  const firebaseById = new Map(
    firebaseOfficers.map((officer) => [officer.document_id, officer]),
  );
  const fallbackIds = new Set(fallbackOfficers.map((officer) => officer.id));

  const updatedFallbacks = fallbackOfficers.map((fallback) => {
    const live = firebaseById.get(fallback.id);
    if (!live) return fallback;
    return {
      id: live.document_id,
      name: live.name,
      role: live.role,
      image: live.image_url || fallback.image,
      linkedinUrl: live.linkedin_url,
      displayOrder: live.display_order,
      isActive: live.is_active,
    };
  });

  const additionalOfficers = firebaseOfficers
    .filter((officer) => !fallbackIds.has(officer.document_id))
    .map((officer) => ({
      id: officer.document_id,
      name: officer.name,
      role: officer.role,
      image: officer.image_url,
      linkedinUrl: officer.linkedin_url,
      displayOrder: officer.display_order,
      isActive: officer.is_active,
    }));

  const officers = [...updatedFallbacks, ...additionalOfficers]
    .filter((officer) => officer.isActive && officer.image)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="mx-auto min-h-[calc(100vh-70px)] max-w-[1440px] px-6 pb-20 pt-9 sm:px-8 lg:px-[90px]">
      <h1 className="text-center text-[clamp(3.75rem,6.67vw,6rem)] font-semibold leading-[1.05] tracking-[-.055em] text-black">
        Meet the Team
      </h1>

      <div className="mx-auto mt-12 grid max-w-[1114px] grid-cols-1 justify-items-center gap-x-10 gap-y-14 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:justify-between">
        {officers.map((officer, index) => (
          <OfficerCard key={officer.id} officer={officer} index={index} />
        ))}
      </div>
    </section>
  );
}
