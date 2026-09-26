function Pipe({ variant = 'small', className = '', style }) { return <div aria-hidden="true" className={`pipe pipe-${variant} ${className}`} style={style}><span className="pipe-lip" /><span className="pipe-body" /></div> }
export default Pipe
