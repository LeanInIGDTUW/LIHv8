import { useState } from "react";

const pages = [
  {
    eyebrow: "01 / THE BEGINNING",
    title: "Where it started.",
    text: (
      <>
        <strong>Lean In Hacks</strong> is the flagship annual hackathon of Lean
        In IGDTUW, the first Lean In chapter in India.
        <br />
        <br />
        Started in 2020, it has grown into an inclusive space to learn, build,
        share and grow through technology and ideas.
      </>
    ),
    photos: [
      {
        src: "/images/lih_prev_editions/Screenshot%202026-09-26%20163300.png",
        alt: "Lean In Hacks community gathering",
        type: "large",
      },
      {
        src: "/images/lih_prev_editions/Screenshot%202026-09-26%20171332.png",
        alt: "Lean In Hacks early edition moments",
        type: "small",
      },
    ],
  },
  {
    eyebrow: "02 / THE JOURNEY",
    title: "Built by people.",
    text: (
      <>
        Every edition brings together students who come to experiment, solve
        problems and turn ideas into something real.
        <br />
        <br />
        What began as a hackathon has become a space for collaboration,
        creativity and technology.
      </>
    ),
    photos: [
      {
        src: "/images/lih_prev_editions/Screenshot%202026-09-26%20163638.png",
        alt: "Lean In Hacks team collaboration moment",
        type: "wide",
      },
      {
        src: "/images/lih_prev_editions/Screenshot%202026-09-26%20171359.png",
        alt: "Hackathon participants building together",
        type: "small",
      },
    ],
  },
  {
    eyebrow: "03 / EDITION 08",
    title: "The next page.",
    text: (
      <>
        And now, we are gearing up for <strong>Lean In Hacks 8.0</strong>.
        <br />
        <br />A new edition. New ideas. New teams. And another page waiting to
        be written.
      </>
    ),
    photos: [
      {
        src: "/images/lih_prev_editions/Screenshot%202026-09-26%20171412.png",
        alt: "Lean In Hacks team photo",
        type: "large",
      },
      {
        src: "/images/lih_prev_editions/Screenshot%202026-09-26%20171453.png",
        alt: "Lean In Hacks final teams and moments",
        type: "small",
      },
    ],
  },
];

function Cloud({ className }) {
  return <div aria-hidden="true" className={`cloud ${className}`} />;
}

function PageContent({ page, side = "left" }) {
  const isLeft = side === "left";

  return (
    <div
      className={`relative h-full ${
        isLeft ? "border-r border-[#e4d8c8] bg-[#fffaf1]" : "bg-[#fffdf7]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 30px, #ddd0bf 31px)",
        }}
      />

      <div className="relative z-10 h-full px-7 py-8 md:px-11 md:py-10">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-px w-8 bg-[#d87999]" />
          <span className="font-['Poppins'] text-[10px] font-bold uppercase tracking-[0.25em] text-[#a05d78]">
            {page.eyebrow}
          </span>
        </div>

        <h3 className="max-w-sm font-['Poppins'] text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#40353e] md:text-[42px]">
          {page.title}
        </h3>

        <div className="mt-6 max-w-md font-['Poppins'] text-[14px] font-medium leading-7 text-[#625761] md:text-[15px]">
          {page.text}
        </div>
      </div>
    </div>
  );
}

function PhotoContent({ page }) {
  return (
    <div className="relative flex h-full flex-col bg-[#fffdf7] px-6 py-7 md:px-8 md:py-8">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-['Poppins'] text-[10px] font-bold uppercase tracking-[0.25em] text-[#a05d78]">
          Previous Editions
        </span>
        <span className="font-['Poppins'] text-[10px] text-[#aa929a]">
          Lean In Hacks
        </span>
      </div>

      <div className="grid flex-1 grid-cols-[1.35fr_0.65fr] gap-4 md:gap-5">
        <div className="relative overflow-hidden border border-[#e3d8cc] bg-[#eee5da] p-2 shadow-[0_8px_18px_rgba(76,49,63,0.1)]">
          <div className="h-full min-h-[250px] overflow-hidden">
            <img
              src={page.photos[0].src}
              alt={page.photos[0].alt}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          <span className="absolute bottom-3 left-4 bg-[#fff8e8]/90 px-2 py-1 font-['Poppins'] text-[9px] font-bold uppercase tracking-[0.16em] text-[#76596a]">
            {page.title.includes("Where")
              ? "The early days"
              : page.title.includes("Built")
                ? "Building together"
                : "Edition 08"}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden border border-[#e3d8cc] bg-white p-2 shadow-[0_8px_18px_rgba(76,49,63,0.08)]">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={page.photos[1].src}
                alt={page.photos[1].alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>

          <div className="flex flex-1 items-end">
            <div className="w-full border-l-2 border-[#dd7e9d] pl-3">
              <p className="font-['Poppins'] text-lg font-medium leading-tight text-[#4b3d46]">
                Learn.
                <br />
                Build.
                <br />
                Share.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [turning, setTurning] = useState(false);
  const [direction, setDirection] = useState(null);

  const totalSpreads = pages.length;
  const currentPage = pages[currentSpread];
  const nextPage =
    currentSpread < totalSpreads - 1 ? pages[currentSpread + 1] : null;
  const previousPageData = currentSpread > 0 ? pages[currentSpread - 1] : null;

  const goNext = () => {
    if (turning || currentSpread >= totalSpreads - 1) return;

    setDirection("next");
    setTurning(true);

    setTimeout(() => {
      setCurrentSpread((prev) => prev + 1);
    }, 375);

    setTimeout(() => {
      setTurning(false);
      setDirection(null);
    }, 750);
  };

  const goPrevious = () => {
    if (turning || currentSpread <= 0) return;

    setDirection("previous");
    setTurning(true);

    setTimeout(() => {
      setCurrentSpread((prev) => prev - 1);
    }, 375);

    setTimeout(() => {
      setTurning(false);
      setDirection(null);
    }, 750);
  };

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#fcebed] px-5 py-20 md:px-10 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[15%] h-72 w-72 rounded-full bg-[#ffdce7]/70 blur-3xl" />
        <div className="absolute right-[-8%] bottom-[10%] h-96 w-96 rounded-full bg-[#c8dcff]/50 blur-3xl" />

        <Cloud className="cloud-one" />
        <Cloud className="cloud-two" />

        <div className="absolute left-[15%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/70" />
        <div className="absolute right-[20%] top-[20%] h-2 w-2 rounded-full bg-white/60" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-10">
          <p className="mb-2 font-['Poppins'] text-[11px] font-semibold uppercase tracking-[0.28em] text-[#86566b]">
            Know Us Better
          </p>

          <div className="flex items-end justify-center">
            <h2 className="text-center font-['Poppins'] text-4xl font-semibold tracking-[-0.04em] text-[#3e3540] md:text-6xl">
              About Us
            </h2>
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl [perspective:1800px]">
          <div className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 rotate-[0.7deg] bg-[#f0e4d3] shadow-lg" />
          <div className="pointer-events-none absolute inset-0 -translate-x-2 translate-y-1 rotate-[-0.5deg] bg-[#fff4e4] shadow-md" />

          <div className="book relative h-[470px] overflow-hidden bg-[#fffaf1] shadow-[0_24px_55px_rgba(76,49,63,0.2)]">
            <div className="book-spread">
              <div className="book-page left-page">
                <PageContent page={currentPage} side="left" />
              </div>

              <div className="book-page right-page">
                <PhotoContent page={currentPage} />
              </div>
            </div>

            {nextPage && (
              <div className="book-spread next-spread">
                <div className="book-page left-page">
                  <PageContent page={nextPage} side="left" />
                </div>

                <div className="book-page right-page">
                  <PhotoContent page={nextPage} />
                </div>
              </div>
            )}

            {previousPageData && (
              <div className="book-spread previous-spread">
                <div className="book-page left-page">
                  <PageContent page={previousPageData} side="left" />
                </div>

                <div className="book-page right-page">
                  <PhotoContent page={previousPageData} />
                </div>
              </div>
            )}

            {turning && direction === "next" && nextPage && (
              <div className="turning-sheet turning-next">
                <div className="sheet-front">
                  <PhotoContent page={currentPage} />
                </div>

                <div className="sheet-back">
                  <PageContent page={nextPage} side="left" />
                </div>
              </div>
            )}

            {turning && direction === "previous" && previousPageData && (
              <div className="turning-sheet turning-previous">
                <div className="sheet-front">
                  <PageContent page={currentPage} side="left" />
                </div>

                <div className="sheet-back">
                  <PhotoContent page={previousPageData} />
                </div>
              </div>
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-5 -translate-x-1/2 md:block"
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent via-[#cfc0ae]/25 to-transparent" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrevious}
              disabled={currentSpread === 0 || turning}
              className="inline-flex w-[110px] items-center justify-center gap-1 whitespace-nowrap font-['Poppins'] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6e5361] transition-all hover:-translate-x-1 disabled:pointer-events-none disabled:opacity-30 md:text-xs"
            >
              <span aria-hidden="true">←</span>
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={turning}
                  aria-label={`Go to page ${index + 1}`}
                  onClick={() => {
                    if (index === currentSpread) return;

                    setDirection(index > currentSpread ? "next" : "previous");
                    setTurning(true);

                    setTimeout(() => {
                      setCurrentSpread(index);
                    }, 375);

                    setTimeout(() => {
                      setTurning(false);
                      setDirection(null);
                    }, 750);
                  }}
                  className={`h-1.5 transition-all ${
                    index === currentSpread
                      ? "w-8 bg-[#c96586]"
                      : "w-1.5 bg-[#b9899b]/50"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={currentSpread === totalSpreads - 1 || turning}
              className="inline-flex w-[110px] items-center justify-center gap-1 whitespace-nowrap font-['Poppins'] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6e5361] transition-all hover:translate-x-1 disabled:pointer-events-none disabled:opacity-30 md:text-xs"
            >
              <span>Next</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .book {
          position: relative;
          width: 100%;
          height: 470px;
          perspective: 1800px;
          transform-style: preserve-3d;
        }

        .book-spread {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          z-index: 2;
          background: #fffaf1;
        }

        .next-spread {
          z-index: 1;
        }

        .previous-spread {
          z-index: 1;
        }

        .book-page {
          position: relative;
          min-width: 0;
          height: 100%;
          overflow: hidden;
        }

        .turning-sheet {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          z-index: 10;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .turning-next {
          right: 0;
          transform-origin: left center;
          animation: pageTurnNext 750ms ease-in-out forwards;
        }

        .turning-previous {
          left: 0;
          transform-origin: right center;
          animation: pageTurnPrevious 750ms ease-in-out forwards;
        }

        .sheet-front,
        .sheet-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #fffdf7;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        .sheet-front {
          transform: rotateY(0deg);
        }

        .sheet-back {
          transform: rotateY(180deg);
        }

        @keyframes pageTurnNext {
          from {
            transform: rotateY(0deg);
          }

          to {
            transform: rotateY(-180deg);
          }
        }

        @keyframes pageTurnPrevious {
          from {
            transform: rotateY(0deg);
          }

          to {
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </section>
  );
}

export default AboutSection;
