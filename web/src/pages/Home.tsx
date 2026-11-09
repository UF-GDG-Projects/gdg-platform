import gdgLogo from "../assets/gdg-logo.svg";

const DISCORD_INVITE = "https://discord.gg/B8hzpMvCQ";

function GoogleWordmark() {
  return (
    <span role="img" aria-label="Google" className="whitespace-nowrap">
      <span className="text-[#4385f3]">G</span>
      <span className="text-[#e94436]">o</span>
      <span className="text-[#fabc05]">o</span>
      <span className="text-[#4385f3]">g</span>
      <span className="text-[#109d58]">l</span>
      <span className="text-[#e94436]">e</span>
    </span>
  );
}

function DiscordPreview() {
  const messages = [
    [
      "GDG",
      "Hi, welcome to the GDG on Campus at the University of Florida! Do you have any questions?",
    ],
    ["Username", "Hello, how do I become a member?"],
    ["GDG", "All you need to become a member is to join our Discord server!"],
    ["Username", "Great! I can’t wait to be a UF GDG member."],
  ];

  return (
    <div className="h-full min-h-[420px] overflow-hidden rounded-l-[12px] border border-[#d7d7d7] bg-[#f4f4f4] shadow-[0_1px_3px_rgba(0,0,0,.24)]">
      <div className="flex h-full">
        <div className="flex w-16 shrink-0 flex-col items-center gap-3 border-r border-[#e6e6e6] bg-[#efefef] py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
            <img src={gdgLogo} alt="" className="w-7" />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl font-light text-[#109d58] shadow-sm">
            +
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm text-[#109d58] shadow-sm">
            ◉
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col bg-white">
          <div className="flex h-12 items-center gap-2 bg-[#f4f4f4] px-4 text-sm font-medium text-[#767676]">
            <span className="text-[#5865f2]">●</span> # General Chat
          </div>
          <div className="flex-1 space-y-5 px-4 py-5">
            {messages.map(([name, message], index) => (
              <div key={`${name}-${message}`} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f1f2] text-[10px] font-bold text-[#4285f4]">
                  {index % 2 === 0 ? "GDG" : "U"}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#767676]">{name}</p>
                  <p className="mt-0.5 text-xs leading-4 text-[#767676]">
                    {message}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-3 mb-3 flex h-9 items-center rounded-sm bg-[#f4f4f4] px-3 text-xs text-[#c2c2c2]">
            +&nbsp;&nbsp; Message #General
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <section className="mx-auto max-w-[1040px] px-4 pb-16 pt-16 sm:px-6">
      <div className="rounded-[18px] bg-[#f4f4f4] p-4 shadow-[0_1px_3px_rgba(0,0,0,.24)]">
        <div className="grid min-h-[607px] overflow-hidden rounded-[16px] border border-[#d8d8d8] bg-white shadow-[0_1px_3px_rgba(0,0,0,.2)] lg:grid-cols-[58%_42%]">
          <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-[53px]">
            <h1 className="max-w-[500px] text-[clamp(2.65rem,4vw,3rem)] font-semibold leading-[1.32] tracking-[-.035em] text-[#2d2d2d]">
              Build, Learn, Innovate
              <br />
              with University of Florida <GoogleWordmark />
              <br />
              Developer Group
            </h1>
            <p className="mt-5 max-w-[500px] text-[20px] leading-[1.3] text-[#767676]">
              Learn Google Developer technologies as well as mobile and web
              development skills essential for the industry.
            </p>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-[36px] w-fit items-center rounded-[10px] bg-[#4385f3] px-4 text-base font-medium text-white no-underline shadow-[0_1px_2px_rgba(0,0,0,.25)] transition hover:-translate-y-0.5 hover:bg-[#3275e5]"
            >
              Join the Club!
            </a>
          </div>

          <div className="min-h-[430px] py-20 pl-2 lg:py-[83px]">
            <DiscordPreview />
          </div>
        </div>

        <div className="px-2 pb-6 pt-[78px] sm:px-8 lg:px-[53px]">
          <h2 className="text-center text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-tight tracking-[-.035em] text-[#2d2d2d]">
            Focused on Project-Based Learning
          </h2>
          <p className="mt-3 text-center text-[20px] leading-7 text-[#767676]">
            Our goal is to help members learn full-stack development and create
            their own applications
          </p>
          <div className="mt-5 grid gap-[15px] sm:grid-cols-3">
            {["one", "two", "three"].map((card) => (
              <div
                key={card}
                aria-hidden="true"
                className="h-[285px] rounded-[20px] border border-[#cfcfcfb3] bg-white shadow-[0_1px_2px_rgba(0,0,0,.25)]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
