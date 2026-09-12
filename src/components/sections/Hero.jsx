import Brick from "../objects/Brick.jsx";
import Coin from "../objects/Coin.jsx";
import Pipe from "../objects/Pipe.jsx";
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
          <GameButton>Apply on Devfolio</GameButton>
        </div>
        <div className="world-objects" aria-hidden="true">
          <div className="world-object object-top-bricks">
            <Brick />
            <Brick />
          </div>
          <div className="world-object object-mid-blocks">
            <QuestionBlock />
            <Brick />
            <Brick />
            <Brick />
          </div>
          <div className="world-object object-gap-coins">
            <Coin />
            <Coin />
            <Coin />
          </div>
          <div className="world-object object-pipe-left">
            <Pipe variant="medium" />
          </div>
          <div className="world-object object-pipe-center-tall">
            <Pipe variant="tall" />
          </div>
          <div className="world-object object-pipe-top-right">
            <Pipe variant="small" />
          </div>
          <div className="world-object object-right-coin">
            <Coin />
          </div>
        </div>
      </section>
    </main>
  );
}
export default Hero;
