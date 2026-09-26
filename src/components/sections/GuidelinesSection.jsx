const guidelines = [
  {
    number: "01",
    title: "Who can participate?",
    description: "Hackers from any college can participate.",
  },
  {
    number: "02",
    title: "Team requirement",
    description: "Every team must have at least 1 female member.",
  },
  {
    number: "03",
    title: "Hackathon format",
    description: "The hackathon will be conducted in hybrid mode.",
  },
  {
    number: "04",
    title: "Build phase",
    description: "Teams will get the weekend to build their product online.",
  },
  {
    number: "05",
    title: "Final pitch",
    description:
      "The top teams will get the opportunity to pitch their projects offline.",
  },
];

function GuidelinesSection() {
  return (
    <section
      id="guidelines"
      className="relative overflow-hidden bg-[#f3d7df] py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.45),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(197,221,255,0.35),_transparent_32%)]" />
        <div className="cloud cloud-one opacity-80" />
        <div className="cloud cloud-two opacity-70" />
        <div className="cloud cloud-three opacity-60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div>
            <p className="mb-2 font-['Poppins'] text-[11px] font-semibold uppercase tracking-[0.25em] text-[#806475]">
              How the Game Works
            </p>
            <h2 className="font-['Poppins'] text-4xl font-semibold tracking-[-0.05em] text-[#3a2d35] md:text-5xl">
              Guidelines
            </h2>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[60rem] grid-cols-1 gap-4 md:grid-cols-3">
          {guidelines.slice(0, 3).map((item) => (
            <div
              key={item.number}
              className="group w-full max-w-[18rem] justify-self-center rounded-[18px] border border-[#eedfe5] bg-white/55 p-5 shadow-[0_10px_24px_rgba(90,58,68,0.06)] backdrop-blur-[1px] transition-transform duration-200 hover:-translate-y-1 md:p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d79ab1] bg-[#fff5f8] font-['Poppins'] text-[11px] font-bold tracking-[0.12em] text-[#7d5367]">
                  {item.number}
                </span>
                <h3 className="font-['Poppins'] text-lg font-semibold tracking-[-0.03em] text-[#43353d] md:text-xl">
                  {item.title}
                </h3>
              </div>

              <p className="font-['Poppins'] text-sm leading-7 text-[#5d4f58] md:text-[15px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-4 flex justify-center">
          <div className="grid w-full max-w-[38rem] grid-cols-1 gap-4 md:grid-cols-2">
            {guidelines.slice(3).map((item) => (
              <div
                key={item.number}
                className="group w-full max-w-[18rem] justify-self-center rounded-[18px] border border-[#eedfe5] bg-white/55 p-5 shadow-[0_10px_24px_rgba(90,58,68,0.06)] backdrop-blur-[1px] transition-transform duration-200 hover:-translate-y-1 md:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d79ab1] bg-[#fff5f8] font-['Poppins'] text-[11px] font-bold tracking-[0.12em] text-[#7d5367]">
                    {item.number}
                  </span>
                  <h3 className="font-['Poppins'] text-lg font-semibold tracking-[-0.03em] text-[#43353d] md:text-xl">
                    {item.title}
                  </h3>
                </div>

                <p className="font-['Poppins'] text-sm leading-7 text-[#5d4f58] md:text-[15px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-2 left-2 z-20 hidden h-36 w-auto md:block lg:h-44 xl:h-52">
        <img
          src="/images/characters/mario.png"
          alt="Mario"
          className="h-full w-auto object-contain drop-shadow-[0_14px_22px_rgba(72,52,60,0.14)]"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full">
        <div className="relative h-14 md:h-16">
          <div className="absolute inset-x-0 bottom-0 h-6 border-[3px] border-[#735146] border-t-[3px] border-t-[#b87857] bg-[#b96d4d] bg-[linear-gradient(90deg,transparent_47%,rgba(108,66,57,0.18)_48%_53%,transparent_54%),linear-gradient(transparent_47%,rgba(108,66,57,0.18)_48%_53%,transparent_54%),radial-gradient(#dc9768_14%,transparent_17%)] bg-[length:36px_29px,36px_29px,31px_31px] before:absolute before:inset-x-0 before:top-4 before:h-[22px] before:bg-[repeating-linear-gradient(0deg,transparent_0_22px,#743e35_23px_25px)] before:opacity-15 before:content-['']" />
          <div className="absolute inset-x-0 bottom-5 h-[29px] border-[3px] border-[#596d55] border-b-0 bg-[linear-gradient(180deg,#b7df6a,#70bc61)] shadow-[inset_0_-5px_0_rgba(54,126,76,0.3)] before:absolute before:inset-x-[-3px] before:-top-3 before:h-4 before:bg-[radial-gradient(17px_11px_at_18px_16px,transparent_60%,#596d55_63%_70%,transparent_73%)] before:bg-[length:36px_16px] before:bg-repeat-x before:content-['']" />
        </div>
      </div>
    </section>
  );
}

export default GuidelinesSection;
