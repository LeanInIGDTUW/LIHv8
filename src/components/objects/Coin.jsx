import { motion } from 'framer-motion'
function Coin({ className = '' }) { return <motion.span aria-hidden="true" className={`coin ${className}`} animate={{ y: [0, -4, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}><i /></motion.span> }
export default Coin
