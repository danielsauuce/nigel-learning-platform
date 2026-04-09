import React from 'react'
import { motion } from 'motion/react'
import {
  Smartphone,
  BarChart3,
  Shield,
  Users,
  Target,
  Zap,
  Award,
  TrendingUp,
  BookOpen,
} from 'lucide-react'
import { DetailedFeatureCard } from './DetailedFeatureCard'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export const DetailedFeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: 'Mobile-First',
      desc: 'Beautiful app experience optimized for kids on any device.',
      color: 'bg-edulite-purple/10 text-edulite-purple',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Progress Tracking',
      desc: 'Parents and teachers can monitor learning progress in real-time.',
      color: 'bg-edulite-pink/15 text-edulite-navy',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Safe & Secure',
      desc: 'Powered by Beyond Encryption for the highest data security.',
      color: 'bg-edulite-yellow/20 text-edulite-navy',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Family Sharing',
      desc: 'Connect the whole family and learn together.',
      color: 'bg-edulite-peach/30 text-edulite-navy',
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Budget Simulator',
      desc: 'Hands-on practice allocating income with the 50/30/20 rule.',
      color: 'bg-edulite-purple/10 text-edulite-purple',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Daily Challenges',
      desc: 'Fresh financial puzzles every day to keep kids engaged.',
      color: 'bg-edulite-pink/15 text-edulite-navy',
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'Achievements',
      desc: 'Badges and rewards that celebrate financial milestones.',
      color: 'bg-edulite-yellow/20 text-edulite-navy',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'XP & Streaks',
      desc: 'Gamified progression system that motivates consistent learning.',
      color: 'bg-edulite-peach/30 text-edulite-navy',
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Bite-Sized Lessons',
      desc: 'Short, focused lessons on saving, budgeting, and earning.',
      color: 'bg-edulite-purple/10 text-edulite-purple',
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-edulite-navy mb-4">
            Everything your child needs
          </h2>
          <p className="text-edulite-gray max-w-xl mx-auto">
            A comprehensive toolkit for building financial confidence from an
            early age.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <DetailedFeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              color={item.color}
              delay={i * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
