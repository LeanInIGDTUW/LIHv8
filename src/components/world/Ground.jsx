import ParallaxLayer from './ParallaxLayer.jsx'

function Terrain({ className }) {
  return <div className={`terrain ${className}`}><div className="ground-grass" /><div className="ground-soil" /></div>
}

function Ground() {
  return (
    <ParallaxLayer className="ground-layer" depth="foreground">
      <Terrain className="terrain-left" />
      <Terrain className="terrain-right" />
      <Terrain className="terrain-ledge" />
    </ParallaxLayer>
  )
}
export default Ground
