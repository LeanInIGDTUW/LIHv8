import Hero from "./components/sections/Hero.jsx";
import RulebookSection from "./components/sections/RulebookSection.jsx";
import AboutSection from "./components/sections/AboutSection.jsx";
import MetricsSection from "./components/sections/MetricsSection.jsx";
import TimelineSection from "./components/sections/TimelineSection.jsx";
import TracksSection from "./components/sections/TracksSection.jsx";
import PrizePoolSection from "./components/sections/PrizePoolSection.jsx";
import SponsorsSection from "./components/sections/SponsorsSection.jsx";
import GuidelinesSection from "./components/sections/GuidelinesSection.jsx";
import Footer from "./components/sections/Footer.jsx";

function App() {
  return (
    <>
      <Hero />
      <RulebookSection />
      <AboutSection />
      <MetricsSection />
      <TimelineSection />
      <TracksSection />
      <PrizePoolSection />
      <SponsorsSection />
      <GuidelinesSection />
      <Footer />
    </>
  );
}

export default App;
