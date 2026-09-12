function ParallaxLayer({ children, className = '', depth = 'base' }) {
  return <div className={`parallax-layer ${className}`} data-parallax-depth={depth}>{children}</div>
}
export default ParallaxLayer
