import { Shield } from 'lucide-react'
import { motion } from 'motion/react'

export const SponsorSection = () => (
  <section className="py-24 px-6 bg-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 p-12 rounded-[4rem] border-2 border-dashed border-gray-100"
    >
      <div className="space-y-4 text-center md:text-left">
        <p className="text-[#B9A7F8] font-black text-sm uppercase tracking-[0.2em]">
          Project Sponsor
        </p>
        <h2 className="text-4xl font-black text-[#22223B]">
          Beyond Encryption
        </h2>
        <p className="text-gray-500 max-w-md font-medium">
          This project is proudly sponsored by Beyond Encryption, the creators
          of Nigel. Together, we're building a safer, more financially literate
          future for everyone.
        </p>
      </div>

      <div className="flex items-center gap-8">
        <div className="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all cursor-pointer">
          <Shield className="w-full h-full text-[#22223B]" />
        </div>
        <div className="h-16 w-px bg-gray-100 hidden md:block" />
        <div className="text-center md:text-left">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">
            Marketing Director
          </p>
          <p className="text-[#22223B] font-black">Emily Plummer</p>
          <p className="text-gray-400 text-xs font-bold">Beyond Encryption</p>
        </div>
      </div>
    </motion.div>
  </section>
)
