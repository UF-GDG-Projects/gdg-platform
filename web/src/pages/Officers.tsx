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

type Officer = {
  name: string;
  role: string;
  image: string;
};

const officers: Officer[] = [
  { name: "Jack Harris", role: "President", image: jackHarris },
  {
    name: "Andrew Chuang Saladin",
    role: "Vice President",
    image: andrewChuangSaladin,
  },
  { name: "Sophie Daniel", role: "Treasurer", image: sophieDaniel },
  {
    name: "Jack Detweiler",
    role: "Technical Lead",
    image: jackDetweiler,
  },
  {
    name: "Weedchenska Jeanbaptiste",
    role: "Technical Lead",
    image: weedchenskaJeanbaptiste,
  },
  { name: "Zach Zaslau", role: "Hackathon Lead", image: zachZaslau },
  { name: "Felix Chang", role: "Hackathon Lead", image: felixChang },
  { name: "Carlos Mendez", role: "Hackathon Lead", image: carlosMendez },
  { name: "Sai Rajan", role: "Social Lead", image: saiRajan },
  {
    name: "Mishka Sonavadekar",
    role: "Marketing Lead",
    image: mishkaSonavadekar,
  },
  { name: "Lu Ighodalo", role: "Outreach Lead", image: luIghodalo },
];

function OfficerCard({ officer }: { officer: Officer }) {
  return (
    <article className="group relative h-[272px] w-[208px] overflow-hidden rounded-[16px] border border-[#cfcfcfb3] bg-white shadow-[0_.8px_1.6px_rgba(0,0,0,.25)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(45,45,45,.16)]">
      <img
        src={officer.image}
        alt={`${officer.name}, ${officer.role}`}
        className="mx-auto mt-[21px] h-[136px] w-[136px] rounded-full object-cover"
      />
      <div className="absolute inset-x-[15px] top-[165px]">
        <h2 className="text-[25.6px] font-semibold leading-[1.02] tracking-[-.025em] text-black">
          {officer.name}
        </h2>
        <p className="mt-1 text-[19.2px] font-light leading-none text-black">
          {officer.role}
        </p>
      </div>
    </article>
  );
}

export default function Officers() {
  return (
    <section className="mx-auto min-h-[calc(100vh-70px)] max-w-[1440px] px-6 pb-20 pt-9 sm:px-8 lg:px-[90px]">
      <h1 className="text-center text-[clamp(3.75rem,6.67vw,6rem)] font-semibold leading-[1.05] tracking-[-.055em] text-black">
        Meet the Team
      </h1>

      <div className="mx-auto mt-8 grid max-w-[1114px] grid-cols-1 justify-items-center gap-x-10 gap-y-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:justify-between">
        {officers.map((officer) => (
          <OfficerCard key={officer.name} officer={officer} />
        ))}
      </div>
    </section>
  );
}
