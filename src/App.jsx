import Hero from "./components/sections/Hero.jsx";
import AboutSection from "./components/sections/AboutSection.jsx";
import MetricsSection from "./components/sections/MetricsSection.jsx";
import TimelineSection from "./components/sections/TimelineSection.jsx";
import TracksComingSoon from "./components/sections/TracksComingSoon.jsx";
import PrizePoolSection from "./components/sections/PrizePoolSection.jsx";
import SponsorsSection from "./components/sections/SponsorsSection.jsx";
import GuidelinesSection from "./components/sections/GuidelinesSection.jsx";

function App() {
  return (
    <>
      <Hero />
      <AboutSection />
      <MetricsSection />
      <TimelineSection />
      <TracksComingSoon />
      <PrizePoolSection />
      <SponsorsSection />
      <GuidelinesSection />
    </>
  );
}

export default App;
