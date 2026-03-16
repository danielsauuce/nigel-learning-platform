import { motion } from 'motion/react'
import { Play, Shield } from 'lucide-react'
import { HeroScreen } from '../components/mobile/HeroScreen'
import { DashboardScreen } from '../components/mobile/DashboardScreen'
import { NigelMascot } from '../components/mobile/NigelMascot'

export const HeroSection = () => (
  <section className="pt-32 pb-20 px-6 bg-edulite-bg relative overflow-hidden">
    {/* Soft background blobs */}
    <div className="absolute top-20 right-1/4 w-80 h-80 bg-edulite-purple/8 rounded-full blur-3xl" />
    <div className="absolute bottom-10 left-10 w-64 h-64 bg-edulite-pink/10 rounded-full blur-3xl" />

    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
      {/* Left column */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-8"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <Shield className="w-4 h-4 text-edulite-purple" />
          <span className="text-edulite-navy text-xs font-bold">
            The best kids course
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-7xl font-bold text-edulite-navy leading-[1.05]">
          Turn{' '}
          <span className="relative inline-block">
            learning
            <motion.div
              className="absolute -top-10 -right-14"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <NigelMascot size={50} animate={false} />
            </motion.div>
          </span>
          <br />
          into{' '}
          <span className="text-edulite-purple relative">
            fun!
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4" stroke="#B9A7F8" strokeWidth="2" fill="none" opacity="0.5" />
            </svg>
          </span>
        </h1>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <button className="bg-edulite-purple text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-edulite-navy transition-colors shadow-lg shadow-edulite-purple/25">
            Get Started
          </button>
          <button className="bg-white border border-gray-200 px-8 py-3.5 rounded-full flex items-center gap-2 text-sm font-bold text-edulite-navy hover:border-edulite-purple/40 transition-colors">
            <div className="w-6 h-6 bg-edulite-purple/10 rounded-full flex items-center justify-center">
              <Play className="w-3 h-3 text-edulite-purple fill-edulite-purple" />
            </div>
            Watch Video
          </button>
        </div>

        {/* Decorative arrow */}
        <div className="text-edulite-purple/30">
          <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
            <path d="M2 18 Q 8 2, 20 6 T 28 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M25 0 L28 2 L24 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* 320k+ stat */}
        <div className="flex items-center gap-4 pt-2">
          <p className="text-5xl font-bold text-edulite-navy">320k+</p>
          <p className="text-edulite-gray text-sm leading-tight max-w-[140px]">
            Children have learned a lot with our method
          </p>
          <div className="flex -space-x-2 ml-4">
            {['bg-edulite-purple', 'bg-edulite-pink', 'bg-edulite-peach', 'bg-edulite-yellow'].map((c, i) => (
              <div key={i} className={`w-8 h-8 ${c} rounded-full border-2 border-white`} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right — phone mockups matching actual mobile UI */}
      <div className="flex gap-6 justify-center relative">
        <div className="absolute -top-8 -right-4 w-16 h-16 bg-edulite-peach/40 rounded-2xl rotate-12" />
        <div className="absolute bottom-12 -left-8 w-12 h-12 bg-edulite-yellow/40 rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <HeroScreen />
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden sm:block mt-24"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <DashboardScreen />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
)
