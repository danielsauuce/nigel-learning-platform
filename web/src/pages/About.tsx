import { motion } from 'motion/react'
import { Shield, Heart, BookOpen, Target, Users, Globe, Award, ArrowRight } from 'lucide-react'
import { NigelMascot } from '../components/mobile/NigelMascot'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export const About = () => (
  <>
    {/* ── HERO ── */}
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-24 left-10 w-72 h-72 bg-edulite-purple/8 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-edulite-pink/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div {...fadeUp} className="space-y-8">
          <span className="inline-flex items-center gap-2 bg-edulite-purple/10 px-4 py-2 rounded-full text-xs font-bold text-edulite-purple">
            <Heart className="w-3.5 h-3.5" />
            Our Story
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-edulite-navy leading-tight">
            Building financial<br />
            <span className="text-edulite-purple">confidence</span> in kids
          </h1>

          <p className="text-edulite-gray text-lg leading-relaxed max-w-lg">
            Nigel Junior is on a mission to make financial literacy fun, engaging,
            and accessible for every child — powered by the trusted team at Beyond Encryption.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-6 bg-edulite-purple/10 rounded-full blur-2xl" />
            <div className="relative bg-edulite-purple/10 rounded-[3rem] p-12 flex items-center justify-center">
              <NigelMascot size={180} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── BEYOND ENCRYPTION ── */}
    <section className="py-20 px-6">
      <motion.div
        {...fadeUp}
        className="max-w-7xl mx-auto bg-edulite-navy rounded-[3rem] p-12 md:p-16"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">Powered by</p>
                <h2 className="text-2xl font-bold text-white">Beyond Encryption</h2>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed">
              Nigel Junior is proudly developed by Beyond Encryption — a leading provider
              of secure digital communication solutions. With years of experience protecting
              sensitive data, we bring that same commitment to safety and quality to children's education.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {['Data Security', 'Privacy First', 'Trusted by Businesses'].map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '320k+', label: 'Children learning' },
              { num: '50+', label: 'Interactive lessons' },
              { num: '98%', label: 'Parent satisfaction' },
              { num: '15+', label: 'Countries reached' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/5 rounded-2xl p-6 text-center"
              >
                <p className="text-2xl font-bold text-edulite-purple">{stat.num}</p>
                <p className="text-white/50 text-xs mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>

    {/* ── MISSION & VALUES ── */}
    <section className="py-20 px-6 bg-edulite-bg rounded-[4rem] mx-4">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-edulite-navy mb-4">Our Mission</h2>
          <p className="text-edulite-gray max-w-2xl mx-auto">
            We believe every child deserves the tools to understand money, make smart choices,
            and build a confident financial future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="w-6 h-6" />,
              title: 'Financial Literacy',
              desc: 'Teaching kids real-world money skills through interactive lessons and simulations.',
              color: 'bg-edulite-purple/10 text-edulite-purple',
            },
            {
              icon: <BookOpen className="w-6 h-6" />,
              title: 'Fun-First Learning',
              desc: 'Every lesson is a game. Every achievement is a celebration. Learning should feel like play.',
              color: 'bg-edulite-pink/20 text-edulite-navy',
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: 'Family Together',
              desc: 'Parents and teachers stay connected with progress tracking and shared goals.',
              color: 'bg-edulite-yellow/20 text-edulite-navy',
            },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-3xl p-10 space-y-5 shadow-sm"
            >
              <div className={`w-14 h-14 ${v.color} rounded-2xl flex items-center justify-center`}>
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-edulite-navy">{v.title}</h3>
              <p className="text-edulite-gray text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── MEET THE TEACHERS ── */}
    <section className="py-24 px-6 bg-edulite-purple/10 rounded-[4rem] mx-4 mt-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 right-12 text-edulite-purple/15">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M5 35 Q 20 5, 35 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-12 text-edulite-purple/15">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M5 25 Q 15 5, 25 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
        <motion.div {...fadeUp}>
          <h2 className="text-4xl font-bold text-edulite-navy mb-3">Meet our teachers</h2>
          <p className="text-edulite-gray max-w-lg mx-auto text-sm">
            Discover the teachers on Nigel who are ready to accompany children and parents in their learning journey.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-12">
          {[
            { name: 'Mrs. Yukari Samo', role: "Children's Music Teacher" },
            { name: 'Mrs. Yukari Samo', role: 'General Knowledge Teacher' },
            { name: 'Mrs. Yukari Samo', role: 'Games and Quiz Teacher' },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="space-y-4"
            >
              <div className="w-40 h-40 bg-white rounded-full mx-auto shadow-xl overflow-hidden flex items-center justify-center">
                <div className="w-24 h-24 bg-edulite-purple/15 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-edulite-purple/40" />
                </div>
              </div>
              <h4 className="font-bold text-lg text-edulite-navy">{t.name}</h4>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── VALUES STRIP ── */}
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Shield className="w-5 h-5" />, label: 'Safe & Secure' },
            { icon: <Globe className="w-5 h-5" />, label: 'Global Reach' },
            { icon: <Award className="w-5 h-5" />, label: 'Award Winning' },
            { icon: <Heart className="w-5 h-5" />, label: 'Made with Love' },
          ].map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-edulite-bg rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-edulite-purple/10 rounded-xl flex items-center justify-center text-edulite-purple">
                {v.icon}
              </div>
              <span className="font-bold text-sm text-edulite-navy">{v.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── GET STARTED CTA ── */}
    <section className="py-20 px-6">
      <motion.div
        {...fadeUp}
        className="max-w-7xl mx-auto bg-edulite-navy rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-edulite-purple/10 rounded-full blur-3xl" />

        <div className="flex-1 space-y-5 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Get Started with<br />Nigel Junior Today!
          </h2>
          <p className="text-white/50 max-w-md">
            The fun push to encourage visitors to try the app and make learning more enjoyable for children.
          </p>
          <button className="bg-white text-edulite-navy font-bold px-10 py-4 rounded-full flex items-center gap-2 text-sm hover:bg-edulite-purple hover:text-white transition-colors">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <motion.div
          className="relative z-10"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <NigelMascot size={120} animate={false} />
        </motion.div>
      </motion.div>
    </section>
  </>
)
