import { motion } from 'framer-motion'
function QuestionBlock({ className = '' }) { return <motion.div aria-hidden="true" className={`question-block ${className}`} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 360, damping: 18 }}><span>?</span></motion.div> }
export default QuestionBlock
