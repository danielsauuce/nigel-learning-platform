import { motion } from 'motion/react'
import {
  BookOpen,
  Gamepad2,
  Palette,
  Sparkles,
  Smartphone,
  BarChart3,
  Shield,
  Users,
  Target,
  Zap,
  Award,
  TrendingUp,
} from 'lucide-react'
import { NigelBrandIconWhite } from '../components/ui/Logo'
import { HeroScreen } from '../components/mobile/HeroScreen'
import { DashboardScreen } from '../components/mobile/DashboardScreen'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export const Features = () => (
  <>
    {/* ── HERO ── */}
    <section className="pt-32 pb-20 px-6 bg-edulite-bg relative overflow-hidden">
      <div className="absolute top-20 right-10 w-64 h-64 bg-edulite-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-edulite-pink/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div {...fadeUp}>
          <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs font-bold text-edulite-navy shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-edulite-purple" />
            Explore Nigel
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-edulite-navy leading-tight mb-6">
            Very friendly user
            <br />
            <span className="text-edulite-purple">interface</span>
          </h1>

          <p className="text-edulite-gray max-w-xl mx-auto text-lg">
            Nigel is an interactive learning app designed specifically for kids.
            With advanced features and engaging content.
          </p>
        </motion.div>
      </div>
    </section>

    {/* ── APP SHOWCASE — actual phone mockups ── */}
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 justify-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex gap-6"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="transform scale-[0.85] origin-top">
              <HeroScreen />
            </div>
          </motion.div>
          <motion.div
            className="hidden sm:block mt-16"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <div className="transform scale-[0.85] origin-top">
              <DashboardScreen />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-edulite-navy">
            Designed for kids,
            <br />
            loved by parents
          </h2>
          <p className="text-edulite-gray leading-relaxed">
            The Nigel app mirrors a real financial world in a playful way — kids
            learn to budget, save, and earn through interactive lessons and
            challenges.
          </p>
          <div className="flex gap-3">
            <button className="bg-edulite-purple text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-edulite-navy transition-colors">
              Download App
            </button>
            <button className="border border-gray-200 px-6 py-3 rounded-full text-sm font-bold text-edulite-navy hover:border-edulite-purple/40 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── WHAT WE OFFER — navy section ── */}
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
          {[
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
          ].map((f, i) => (
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

    {/* ── DETAILED FEATURES GRID ── */}
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
          {[
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
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-white rounded-2xl p-6 flex gap-4 items-start shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-edulite-navy text-sm">
                  {item.title}
                </h4>
                <p className="text-edulite-gray text-xs mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── DOWNLOAD CTA ── */}
    <section className="py-20 px-6">
      <motion.div
        {...fadeUp}
        className="max-w-7xl mx-auto bg-edulite-navy rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="flex-1 space-y-5">
          <h2 className="text-4xl font-bold text-white">
            Download the app now
          </h2>
          <p className="text-white/60 max-w-md">
            Nigel is an interactive learning app. Start your child's financial
            literacy journey today.
          </p>
          <button className="bg-white text-edulite-navy font-bold px-8 py-3.5 rounded-full text-sm hover:bg-edulite-purple hover:text-white transition-colors">
            Download Now
          </button>
        </div>

        <div className="w-16 h-16 bg-edulite-purple rounded-2xl flex items-center justify-center">
          <NigelBrandIconWhite size={32} />
        </div>
      </motion.div>
    </section>
  </>
)
