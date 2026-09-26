const sponsors = [
  "/images/sponsors/Screenshot 2026-09-26 195352.png",
  "/images/sponsors/Screenshot 2026-09-26 195357.png",
  "/images/sponsors/Screenshot 2026-09-26 195402.png",
  "/images/sponsors/Screenshot 2026-09-26 195407.png",
  "/images/sponsors/Screenshot 2026-09-26 195413.png",
  "/images/sponsors/Screenshot 2026-09-26 195419.png",
];

const marqueeSponsors = [...sponsors, ...sponsors];

function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="relative overflow-hidden bg-[#fcebed] py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.45),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(200,220,255,0.35),_transparent_28%)]" />
        <div className="cloud cloud-one opacity-70" />
        <div className="cloud cloud-two opacity-70" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-6 flex items-center gap-4 md:gap-5">
          <h2 className="shrink-0 font-['Poppins'] text-xl font-semibold tracking-[-0.04em] text-[#3e3540] md:text-2xl">
            Previous Sponsors
          </h2>
          <div className="h-px flex-1 bg-[#7a5c6d]/50" />
        </div>

        <div className="overflow-hidden rounded-[26px] border border-white/50 bg-white/20 shadow-[0_12px_30px_rgba(90,58,68,0.08)] backdrop-blur-[1px]">
          <div className="sponsor-marquee flex w-max items-center gap-5 py-5 md:gap-7 md:py-6">
            {marqueeSponsors.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex h-20 w-[180px] shrink-0 items-center justify-center rounded-2xl border border-[#e9d3db] bg-white/75 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:h-24 md:w-[220px]"
              >
                <img
                  src={logo}
                  alt={`Sponsor ${(index % sponsors.length) + 1}`}
                  className="max-h-12 w-auto object-contain md:max-h-14"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SponsorsSection;
