import { motion, type Variants } from 'framer-motion'

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
}

const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } } as never,
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } as never,
}

const viewportConfig = { once: true, margin: '-60px' }

/** Single element that fades up when scrolled into view */
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUpVariants}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}

/** Container that staggers its direct children */
export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerVariants}
    >
      {children}
    </motion.div>
  )
}

/** Item inside a StaggerContainer */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  )
}
