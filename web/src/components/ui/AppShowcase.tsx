import React from 'react'
import { motion } from 'motion/react'
import { HeroScreen } from '../mobile/HeroScreen'
import { DashboardScreen } from '../mobile/DashboardScreen'

export const AppShowcase: React.FC = () => (
  <section className="py-20 px-6">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 justify-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex gap-6"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="transform scale-[0.85] origin-top">
            <HeroScreen />
          </div>
        </motion.div>
        <motion.div
          className="hidden sm:block mt-16"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <div className="transform scale-[0.85] origin-top">
            <DashboardScreen />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-edulite-navy">
          Designed for kids,
          <br />
          loved by parents
        </h2>
        <p className="text-edulite-gray leading-relaxed">
          The Nigel app mirrors a real financial world in a playful way — kids
          learn to budget, save, and earn through interactive lessons and
          challenges.
        </p>
        <div className="flex gap-3">
          <button className="bg-edulite-purple text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-edulite-navy transition-colors">
            Download App
          </button>
          <button className="border border-gray-200 px-6 py-3 rounded-full text-sm font-bold text-edulite-navy hover:border-edulite-purple/40 transition-colors">
            Learn More
          </button>
        </div>
      </motion.div>
    </div>
  </section>
)
