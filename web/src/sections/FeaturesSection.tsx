import { motion } from 'motion/react'
import { BookOpen, Gamepad2, Palette, Sparkles } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Personalized Learning',
    desc: "Customized lessons that evolve with your child's progress.",
    accent: 'bg-edulite-purple/20',
  },
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    title: 'Interactive Games',
    desc: 'Learn something new while your kids playing games!',
    accent: 'bg-edulite-pink/20',
    highlight: true,
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Creative Activities',
    desc: 'Discover enjoyable activities such as coloring, crafting, and science.',
    accent: 'bg-edulite-yellow/20',
  },
]

export const FeaturesSection = () => (
  <section className="py-24 px-6 bg-edulite-navy rounded-[4rem] mx-4 mt-8">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        {...fadeUp}
        className="flex items-center justify-between mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          What we offer
        </h2>
        <div className="hidden md:flex gap-2">
          <Sparkles className="w-8 h-8 text-edulite-yellow" />
          <Sparkles className="w-6 h-6 text-edulite-purple" />
        </div>
      </motion.div>

      {/* 3 cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`${
              f.highlight ? 'bg-edulite-purple' : 'bg-white/5'
            } p-10 rounded-3xl space-y-5`}
          >
            <div
              className={`w-14 h-14 ${f.accent} flex items-center justify-center rounded-2xl text-white`}
            >
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{f.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)
