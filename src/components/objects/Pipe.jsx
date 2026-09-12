function Pipe({ variant = 'small', className = '' }) { return <div aria-hidden="true" className={`pipe pipe-${variant} ${className}`}><span className="pipe-lip" /><span className="pipe-body" /></div> }
export default Pipe
