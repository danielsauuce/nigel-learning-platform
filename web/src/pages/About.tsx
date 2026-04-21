import { motion } from 'motion/react'
import {
  Shield,
  Heart,
  BookOpen,
  Target,
  Users,
  Globe,
  Award,
  Zap,
  Mail,
  Linkedin,
} from 'lucide-react'
import { NigelMascot } from '../components/mobile/NigelMascot'
import { PersonCard } from '../components/ui/PersonCard'

const missionItems = [
  {
    icon: <Target className="w-8 h-8 text-[#B9A7F8]" />,
    title: 'The Project Goal',
    desc: 'To help secondary school students (ages 11–16) develop practical financial literacy skills through interactive content and simulations.',
  },
  {
    icon: <Zap className="w-8 h-8 text-[#F7B6B6]" />,
    title: 'Smart Data',
    desc: "Leveraging the power of Nigel's smart data capabilities to simplify complex financial concepts like budgeting, interest, and debt.",
  },
  {
    icon: <Globe className="w-8 h-8 text-[#FFD93D]" />,
    title: 'Curriculum Ready',
    desc: "Supporting Nigel's long-term vision of becoming curriculum-ready by 2028, ensuring every student leaves school with real-world money skills.",
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
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      {/* ── HERO: Beyond Encryption sponsor ── */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-[#B9A7F8]/10 px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-[#B9A7F8]" />
            <span className="text-[#B9A7F8] text-xs font-bold uppercase tracking-wider">
              Our Sponsor
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#22223B] leading-tight tracking-tight">
            Powered by <span className="text-[#B9A7F8]">Nigel</span> by Beyond
            Encryption
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed font-medium">
            Nigel is an award-winning, consent-based Smart Data agent that
            securely turns digital and paper admin into interoperable data. By
            converting fragmented information into proactive, money-saving
            actions, Nigel helps consumers cut costs and protect vulnerable
            households.
          </p>

          {/* Emily Plummer card */}
          <div className="flex flex-col sm:flex-row gap-8 pt-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-[#B9A7F8]/15 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-[#B9A7F8]/60" />
              </div>
              <div>
                <h4 className="font-bold text-[#22223B]">Emily Plummer</h4>
                <p className="text-gray-500 text-xs font-bold">
                  Marketing Director
                </p>
                <div className="flex gap-2 mt-1">
                  <a
                    href="mailto:emily.plummer@beyondencryption.com"
                    className="text-[#B9A7F8] hover:text-[#22223B] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="text-[#B9A7F8] hover:text-[#22223B] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square bg-[#F7B6B6] rounded-[4rem] rotate-3 absolute inset-0 -z-10" />
          <div className="bg-[#B9A7F8]/10 rounded-[4rem] p-16 flex items-center justify-center">
            <NigelMascot size={220} />
          </div>
        </motion.div>
      </div>

      {/* ── THREE MISSION CARDS ── */}
      <div className="grid md:grid-cols-3 gap-12 mb-32">
        {missionItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="space-y-6 text-center"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#22223B]">{item.title}</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── VALUES STRIP ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
        {valueItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-gray-50 rounded-2xl p-6 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-[#B9A7F8]/10 rounded-xl flex items-center justify-center text-[#B9A7F8]">
              {item.icon}
            </div>
            <span className="font-bold text-sm text-[#22223B]">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── MEET THE TEACHERS ── */}
      <section className="py-24 px-6 bg-[#B9A7F8]/10 rounded-[4rem] mb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full"
            >
              <BookOpen className="w-4 h-4 text-[#B9A7F8]" />
              <span className="text-[#22223B] text-xs font-bold uppercase tracking-wider">
                Our Team
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#22223B] tracking-tight">
              Meet our teachers
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">
              Discover the teachers on Nigel who are ready to accompany children
              and parents in their learning journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-12">
            {teachers.map((teacher, i) => (
              <PersonCard
                key={teacher.role}
                name={teacher.name}
                role={teacher.role}
                icon={
                  <div className="w-24 h-24 bg-[#B9A7F8]/15 rounded-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-[#B9A7F8]/40" />
                  </div>
                }
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT BEYOND ENCRYPTION DARK BANNER ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#22223B] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9A7F8] rounded-full -mr-20 -mt-20 blur-[80px] opacity-20" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            About Beyond Encryption
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg mb-12 font-medium">
            Beyond Encryption is a world leader in secure communications and
            data management. Through Nigel, they are committed to supporting UK
            priorities on inclusion, fairer markets, and Net Zero by empowering
            consumers with their own data.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://www.beyondencryption.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#B9A7F8] text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-[#B9A7F8]/20 hover:bg-[#a090e8] transition-colors"
            >
              Visit Beyond Encryption
            </a>
            <a
              href="https://www.beyondencryption.com/nigel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-full border border-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              Learn more about Nigel
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
)
