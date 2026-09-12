import ParallaxLayer from './ParallaxLayer.jsx'

function Vegetation() {
  return (
    <ParallaxLayer className="vegetation-layer" depth="middle">
      <span className="bush bush-left" />
      <span className="bush bush-right" />
      <span className="grass-tuft tuft-one" />
      <span className="grass-tuft tuft-two" />
    </ParallaxLayer>
  )
}

export default Vegetation
