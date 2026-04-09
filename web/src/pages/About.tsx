import { motion } from 'motion/react'
import {
  Shield,
  Heart,
  BookOpen,
  Target,
  Users,
  Globe,
  Award,
  ArrowRight,
} from 'lucide-react'
import { NigelMascot } from '../components/mobile/NigelMascot'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatCard } from '../components/ui/StatCard'
import { FeatureCard } from '../components/ui/FeatureCard'
import { PersonCard } from '../components/ui/PersonCard'
import { CtaBanner } from '../components/ui/CtaBanner'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const trustTags = ['Data Security', 'Privacy First', 'Trusted by Businesses']

const stats = [
  { num: '320k+', label: 'Children learning' },
  { num: '50+', label: 'Interactive lessons' },
  { num: '98%', label: 'Parent satisfaction' },
  { num: '15+', label: 'Countries reached' },
]

const missionValues = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Financial Literacy',
    desc: 'Teaching kids real-world money skills through interactive lessons and simulations.',
    accentClass: 'bg-edulite-purple/10 text-edulite-purple',
    textClass: 'text-edulite-navy',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Fun-First Learning',
    desc: 'Every lesson is a game. Every achievement is a celebration. Learning should feel like play.',
    accentClass: 'bg-edulite-pink/20 text-edulite-navy',
    textClass: 'text-edulite-navy',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Family Together',
    desc: 'Parents and teachers stay connected with progress tracking and shared goals.',
    accentClass: 'bg-edulite-yellow/20 text-edulite-navy',
    textClass: 'text-edulite-navy',
  },
]

const teachers = [
  { name: 'Mrs. Yukari Samo', role: "Children's Music Teacher" },
  { name: 'Mrs. Yukari Samo', role: 'General Knowledge Teacher' },
  { name: 'Mrs. Yukari Samo', role: 'Games and Quiz Teacher' },
]

const valueItems = [
  { icon: <Shield className="w-5 h-5" />, label: 'Safe & Secure' },
  { icon: <Globe className="w-5 h-5" />, label: 'Global Reach' },
  { icon: <Award className="w-5 h-5" />, label: 'Award Winning' },
  { icon: <Heart className="w-5 h-5" />, label: 'Made with Love' },
]

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
            Building financial
            <br />
            <span className="text-edulite-purple">confidence</span> in kids
          </h1>

          <p className="text-edulite-gray text-lg leading-relaxed max-w-lg">
            Nigel Junior is on a mission to make financial literacy fun,
            engaging, and accessible for every child — powered by the trusted
            team at Beyond Encryption.
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
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                  Powered by
                </p>
                <h2 className="text-2xl font-bold text-white">
                  Beyond Encryption
                </h2>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed">
              Nigel Junior is proudly developed by Beyond Encryption — a leading
              provider of secure digital communication solutions. With years of
              experience protecting sensitive data, we bring that same
              commitment to safety and quality to children's education.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {trustTags.map((tag) => (
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
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                num={stat.num}
                label={stat.label}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>

    {/* ── MISSION & VALUES ── */}
    <section className="py-20 px-6 bg-edulite-bg rounded-[4rem] mx-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Our Mission"
          subtitle="We believe every child deserves the tools to understand money, make smart choices, and build a confident financial future."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {missionValues.map((value, i) => (
            <FeatureCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.desc}
              accentClass={value.accentClass}
              textClass={value.textClass}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>

    {/* ── MEET THE TEACHERS ── */}
    <section className="py-24 px-6 bg-edulite-purple/10 rounded-[4rem] mx-4 mt-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 right-12 text-edulite-purple/15">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M5 35 Q 20 5, 35 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute bottom-8 left-12 text-edulite-purple/15">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path
            d="M5 25 Q 15 5, 25 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
        <SectionHeader
          title="Meet our teachers"
          subtitle="Discover the teachers on Nigel who are ready to accompany children and parents in their learning journey."
        />

        <div className="grid sm:grid-cols-3 gap-12">
          {teachers.map((teacher, i) => (
            <PersonCard
              key={teacher.role}
              name={teacher.name}
              role={teacher.role}
              icon={
                <div className="w-24 h-24 bg-edulite-purple/15 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-edulite-purple/40" />
                </div>
              }
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>

    {/* ── VALUES STRIP ── */}
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {valueItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-edulite-bg rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-edulite-purple/10 rounded-xl flex items-center justify-center text-edulite-purple">
                {item.icon}
              </div>
              <span className="font-bold text-sm text-edulite-navy">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── GET STARTED CTA ── */}
    <section className="py-20 px-6">
      <CtaBanner
        title="Get Started with Nigel Junior Today!"
        description="The fun push to encourage visitors to try the app and make learning more enjoyable for children."
        buttonLabel="Get Started"
        buttonIcon={<ArrowRight className="w-4 h-4" />}
        mascot={<NigelMascot size={120} animate={false} />}
      />
    </section>
  </>
)
