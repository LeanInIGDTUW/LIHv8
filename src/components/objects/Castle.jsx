import Flag from './Flag.jsx'
function Castle({ className = '' }) { return <div aria-hidden="true" className={`castle ${className}`}><Flag /><div className="castle-tower castle-tower-left" /><div className="castle-main"><i /></div><div className="castle-tower castle-tower-right" /></div> }
export default Castle
