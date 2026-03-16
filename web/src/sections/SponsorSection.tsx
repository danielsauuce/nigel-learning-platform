import { Shield } from 'lucide-react'
import { motion } from 'motion/react'

export const SponsorSection = () => (
  <section className="py-24 px-6 bg-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto border-2 border-dashed border-gray-100 rounded-3xl p-16 flex flex-col md:flex-row items-center gap-8"
    >
      <div className="w-20 h-20 bg-edulite-purple/10 rounded-2xl flex items-center justify-center flex-shrink-0">
        <Shield className="w-10 h-10 text-edulite-navy" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-edulite-navy">
          Beyond Encryption
        </h2>
        <p className="text-gray-500 max-w-md mt-2">
          Proud sponsor of Nigel Junior — helping build financial literacy for
          the next generation with trusted data security.
        </p>
      </div>
    </motion.div>
  </section>
)
