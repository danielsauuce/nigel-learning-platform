import { motion } from 'motion/react'
import {
  BookOpen,
  BarChart2,
  Zap,
  Brain,
  Users,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-[#B9A7F8]" />,
    title: 'Interactive Lessons',
    description:
      'Bite-sized financial lessons covering saving, budgeting, spending wisely and earning. Each lesson takes under 15 minutes.',
    bg: 'bg-[#B9A7F8]/10',
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-[#F7B6B6]" />,
    title: 'Budget Simulator',
    description:
      'A hands-on simulator where students manage income, expenses and savings in realistic everyday scenarios.',
    bg: 'bg-[#F7B6B6]/10',
  },
  {
    icon: <Zap className="w-8 h-8 text-[#FFD93D]" />,
    title: 'Daily Challenges',
    description:
      'New financial challenges every day to test knowledge, build streaks and earn XP to level up through the learning map.',
    bg: 'bg-[#FFD93D]/10',
  },
  {
    icon: <Brain className="w-8 h-8 text-[#B9A7F8]" />,
    title: 'Progress Tracking',
    description:
      'Detailed analytics for parents and teachers to monitor learning milestones and identify areas where students need support.',
    bg: 'bg-[#B9A7F8]/10',
  },
  {
    icon: <Users className="w-8 h-8 text-[#F7B6B6]" />,
    title: 'Family Sharing',
    description:
      'Students securely share a read-only progress summary with a parent or guardian via a 7-day expiring link.',
    bg: 'bg-[#F7B6B6]/10',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#22223B]" />,
    title: 'Safe & Secure',
    description:
      'A fully moderated, GDPR-compliant, ad-free platform that puts child safety and data privacy above everything else.',
    bg: 'bg-[#22223B]/10',
  },
]

export const FeaturesSection = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full"
        >
          <Sparkles className="w-4 h-4 text-[#B9A7F8]" />
          <span className="text-[#22223B] text-xs font-bold uppercase tracking-wider">
            Our Capabilities
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-[#22223B] tracking-tight"
        >
          Everything your child <br /> needs to{' '}
          <span className="text-[#B9A7F8]">thrive</span>
        </motion.h2>
      </div>

      {/* 6-card grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${feature.bg} p-10 rounded-[3rem] border border-white/20 hover:shadow-xl transition-all duration-300 group`}
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#22223B] mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Ready to explore more CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-24 bg-[#22223B] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9A7F8]/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to explore more?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Join thousands of families already using Nigel Junior to build
            real-world money skills that last a lifetime.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#B9A7F8] text-white font-bold px-10 py-4 rounded-full shadow-xl shadow-[#B9A7F8]/30 hover:bg-[#a090e8] transition-colors">
              Start Free Trial
            </button>
            <button className="bg-white/10 text-white font-bold px-10 py-4 rounded-full border border-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
)
