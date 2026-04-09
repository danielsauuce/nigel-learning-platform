import React from 'react'
import { motion } from 'motion/react'
import { NigelBrandIconWhite } from './Logo'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export const DownloadCTA: React.FC = () => (
  <section className="py-20 px-6">
    <motion.div
      {...fadeUp}
      className="max-w-7xl mx-auto bg-edulite-navy rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-10"
    >
      <div className="flex-1 space-y-5">
        <h2 className="text-4xl font-bold text-white">Download the app now</h2>
        <p className="text-white/60 max-w-md">
          Nigel is an interactive learning app. Start your child's financial
          literacy journey today.
        </p>
        <button className="bg-white text-edulite-navy font-bold px-8 py-3.5 rounded-full text-sm hover:bg-edulite-purple hover:text-white transition-colors">
          Download Now
        </button>
      </div>

      <div className="w-16 h-16 bg-edulite-purple rounded-2xl flex items-center justify-center">
        <NigelBrandIconWhite size={32} />
      </div>
    </motion.div>
  </section>
)
