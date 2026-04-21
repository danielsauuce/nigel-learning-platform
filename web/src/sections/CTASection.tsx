import { motion } from 'motion/react'
import { Megaphone } from 'lucide-react'

export const CTASection = () => (
  <section className="py-24 px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto bg-[#B9A7F8]/20 rounded-[4rem] p-12 md:p-24 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden"
    >
      <div className="space-y-10 flex-1">
        <h2 className="text-5xl md:text-7xl font-bold text-[#22223B] leading-[0.9] tracking-tighter">
          Get Started with <br /> Nigel Junior!
        </h2>
        <p className="text-[#22223B]/60 text-lg max-w-md font-medium">
          Join the mission to empower the next generation with the financial
          skills they need to thrive in a digital world.
        </p>
        <button className="bg-[#22223B] text-white font-bold px-12 py-5 rounded-full shadow-2xl hover:bg-[#B9A7F8] transition-colors">
          Get Started
        </button>
      </div>

      <div className="flex-1 relative">
        <div className="w-full aspect-square bg-white/50 rounded-full blur-3xl absolute inset-0 -z-10" />
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&h=600"
            alt="Happy child learning"
            className="w-full h-auto rounded-[4rem] shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#FFD93D] rounded-full flex items-center justify-center shadow-xl">
            <Megaphone className="w-10 h-10 text-[#22223B] -rotate-12" />
          </div>
        </div>
      </div>
    </motion.div>
  </section>
)
