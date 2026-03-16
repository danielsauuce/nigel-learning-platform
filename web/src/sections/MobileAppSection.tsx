import { motion } from 'motion/react'
import { Download } from 'lucide-react'
import { DashboardScreen } from '../components/mobile/DashboardScreen'
import { NigelMascot } from '../components/mobile/NigelMascot'
import { NigelBrandIconWhite } from '../components/ui/Logo'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export const MobileAppSection = () => (
  <section className="py-24 px-6 bg-edulite-purple/10 rounded-[4rem] mx-4">
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <motion.div {...fadeUp} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-edulite-navy mb-4">
          Nigel mobile app
        </h2>
        <p className="text-edulite-gray max-w-xl mx-auto">
          Nigel is an interactive learning app designed specifically for kids.
          With advanced features and engaging content.
        </p>
      </motion.div>

      {/* 2×2 feature card grid */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Card 1 — Very friendly user interface (shows actual dashboard) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 flex flex-col items-center text-center overflow-hidden"
        >
          <h3 className="text-2xl font-bold text-edulite-navy mb-6">
            Very friendly user<br />interface
          </h3>
          <div className="transform scale-[0.65] origin-top -mb-40">
            <DashboardScreen />
          </div>
        </motion.div>

        {/* Card 2 — Learning media + Drawing practice + Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 space-y-6 overflow-hidden"
        >
          <div>
            <h3 className="text-2xl font-bold text-edulite-navy mb-4">
              Very complete<br />learning media
            </h3>
            <div className="flex items-center gap-3 text-edulite-purple/25 text-4xl font-bold">
              <span>+</span><span>−</span><span>=</span>
            </div>
          </div>

          {/* Drawing practice card */}
          <div className="bg-edulite-peach/40 rounded-2xl p-6 relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎨</span>
              <span className="text-xs text-edulite-purple font-semibold">Creative</span>
            </div>
            <h4 className="text-xl font-bold text-edulite-navy">Drawing<br />practice</h4>
            <div className="absolute top-4 right-4 grid grid-cols-3 gap-1 opacity-20">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-edulite-navy" />
              ))}
            </div>
          </div>

          {/* Download CTA */}
          <div className="bg-edulite-navy rounded-2xl p-6 flex items-center justify-between">
            <div className="flex-1">
              <h4 className="text-white font-bold">Download the app now</h4>
              <p className="text-white/50 text-xs mt-1">
                Nigel is an interactive learning app.
              </p>
              <button className="mt-3 bg-white text-edulite-navy font-bold text-xs px-5 py-2 rounded-full hover:bg-edulite-purple hover:text-white transition-colors">
                Download Now
              </button>
            </div>
            <div className="w-14 h-14 bg-edulite-purple rounded-2xl flex items-center justify-center flex-shrink-0 ml-4">
              <NigelBrandIconWhite size={28} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)
