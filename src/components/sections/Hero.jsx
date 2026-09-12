import Brick from "../objects/Brick.jsx";
import Castle from "../objects/Castle.jsx";
import Coin from "../objects/Coin.jsx";
import Pipe from "../objects/Pipe.jsx";
import Platform from "../objects/Platform.jsx";
import QuestionBlock from "../objects/QuestionBlock.jsx";
import GameButton from "../ui/GameButton.jsx";
import WorldBackground from "../world/WorldBackground.jsx";
function Hero() {
  return (
    <main className="world-page">
      <section className="hero" aria-labelledby="hero-title">
        <WorldBackground />
        <div className="hero-hud" aria-label="Level indicator">
          <span>LEVEL</span>
          <strong>01</strong>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">WORLD 8-0</p>
          <h1 id="hero-title">
            LEAN IN <span>HACKS 8.0</span>
          </h1>
          <GameButton>
            Start hacking <span aria-hidden="true">→</span>
          </GameButton>
        </div>
        <div className="world-objects" aria-hidden="true">
          <div className="blocks blocks-left">
            <QuestionBlock />
            <Brick />
            <Brick />
          </div>
          <Coin className="coin-left" />
          <div className="coin-arc coin-arc-left">
            <Coin />
            <Coin />
            <Coin />
          </div>
          <Platform className="platform-left" />
          <Pipe variant="large" className="hero-pipe" />
          <Pipe variant="small" className="hill-pipe" />
          <div className="blocks blocks-right">
            <Brick />
            <QuestionBlock />
          </div>
          <Coin className="coin-right" />
          <Platform className="platform-right" />
          <Castle className="hero-castle" />
        </div>
      </section>
    </main>
  );
}
export default Hero;
