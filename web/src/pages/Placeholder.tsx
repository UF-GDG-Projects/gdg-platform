export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#4285f4]">GDG · University of Florida</p>
      <h1 className="text-5xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-5 max-w-xl text-[#777777]">placeholder.</p>
    </section>
  );
}
