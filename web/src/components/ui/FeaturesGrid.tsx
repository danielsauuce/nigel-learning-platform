import React from 'react'
import { motion } from 'motion/react'
import { BookOpen, Gamepad2, Palette, Sparkles } from 'lucide-react'
import { FeaturesCard } from './FeaturesCard'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export const FeaturesGrid: React.FC = () => {
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

  return (
    <section className="py-24 px-6 bg-edulite-navy rounded-[4rem] mx-4">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeaturesCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              desc={f.desc}
              accent={f.accent}
              highlight={f.highlight}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
