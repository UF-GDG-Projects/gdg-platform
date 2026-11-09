export default function Gallery() {
  return (
    <section className="mx-auto min-h-[954px] w-full max-w-[1440px] px-6 pb-20 pt-[58px] sm:px-10 lg:px-[95px]">
      <h1 className="text-center text-5xl font-bold leading-[1.4] tracking-[-.035em] text-[#2d2d2d]">
        Gallery
      </h1>

      <div className="mt-[50px] grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article className="min-h-[432px] rounded-[16px] border border-[#e7e7e7] bg-white p-[38px] shadow-[0_1px_2px_rgba(0,0,0,.04)]">
          <h2 className="text-[clamp(2.25rem,3.35vw,3rem)] font-medium leading-[1.4] tracking-[-.03em] text-[#2d2d2d]">
            Project Name
          </h2>
        </article>
      </div>
    </section>
  );
}
