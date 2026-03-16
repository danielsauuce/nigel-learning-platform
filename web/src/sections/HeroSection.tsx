import { motion } from 'motion/react'
import { Play, Shield } from 'lucide-react'
import { HeroScreen } from '../components/mobile/HeroScreen'
import { DashboardScreen } from '../components/mobile/DashboardScreen'

export const HeroSection = () => (
  <section className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-10">
        <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
          <Shield className="w-4 h-4 text-edulite-navy" />
          <span className="text-edulite-navy text-xs font-bold">
            Powered by Nigel by Beyond Encryption
          </span>
        </div>

        <h1 className="text-7xl font-bold text-edulite-navy leading-[0.9]">
          Master your <br />
          <span className="text-edulite-purple">money!</span>
        </h1>

        <div className="flex gap-4">
          <button className="bg-edulite-purple text-white px-10 py-4 rounded-full">
            Get Started
          </button>

          <button className="bg-white border px-10 py-4 rounded-full flex items-center gap-2">
            <Play className="w-4 h-4" />
            Watch Video
          </button>
        </div>
      </div>

      <div className="flex gap-6 justify-center">
        <motion.div initial={{ y: 40 }} animate={{ y: 0 }}>
          <HeroScreen />
        </motion.div>

        <motion.div className="hidden sm:block mt-24">
          <DashboardScreen />
        </motion.div>
      </div>
    </div>
  </section>
)
