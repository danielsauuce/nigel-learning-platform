import React from 'react'
import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export const FeaturesHero: React.FC = () => (
  <section className="pt-32 pb-20 px-6 bg-edulite-bg relative overflow-hidden">
    <div className="absolute top-20 right-10 w-64 h-64 bg-edulite-purple/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-edulite-pink/10 rounded-full blur-3xl" />

    <div className="max-w-7xl mx-auto text-center relative z-10">
      <motion.div {...fadeUp}>
        <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs font-bold text-edulite-navy shadow-sm mb-6">
          <Sparkles className="w-3.5 h-3.5 text-edulite-purple" />
          Explore Nigel
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-edulite-navy leading-tight mb-6">
          Very friendly user
          <br />
          <span className="text-edulite-purple">interface</span>
        </h1>

        <p className="text-edulite-gray max-w-xl mx-auto text-lg">
          Nigel is an interactive learning app designed specifically for kids.
          With advanced features and engaging content.
        </p>
      </motion.div>
    </div>
  </section>
)
