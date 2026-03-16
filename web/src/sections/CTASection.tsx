import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { NigelMascot } from '../components/mobile/NigelMascot'

export const CTASection = () => (
  <section className="py-24 px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto bg-edulite-navy rounded-[4rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden"
    >
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-edulite-purple/10 rounded-full blur-3xl" />

      <div className="flex-1 space-y-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Get Started with<br />Nigel Junior Today!
        </h2>
        <p className="text-white/50 max-w-md">
          The final push to encourage visitors to try the app and make learning more enjoyable for children.
        </p>
        <button className="bg-white text-edulite-navy font-bold px-10 py-4 rounded-full flex items-center gap-2 text-sm hover:bg-edulite-purple hover:text-white transition-colors">
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <motion.div
        className="relative z-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <NigelMascot size={120} animate={false} />
      </motion.div>
    </motion.div>
  </section>
)
