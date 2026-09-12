import { motion } from 'framer-motion'
function Flag() { return <div className="flag" aria-hidden="true"><span className="flag-pole" /><motion.span className="flag-cloth" animate={{ rotate: [0, 2, -1, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} /></div> }
export default Flag
