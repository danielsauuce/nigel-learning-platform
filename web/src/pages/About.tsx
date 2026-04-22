import { motion } from 'motion/react'
import {
  Heart,
  Target,
  Award,
  Globe,
  Shield,
  Zap,
  Mail,
  Linkedin,
} from 'lucide-react'

export const About = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
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
            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100"
                  alt="Emily Plummer"
                  className="w-16 h-16 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-[#22223B]">Emily Plummer</h4>
                  <p className="text-gray-500 text-xs font-bold">
                    Marketing Director
                  </p>
                  <div className="flex gap-2 mt-1">
                    <a
                      href="mailto:emily.plummer@beyondencryption.com"
                      className="text-[#B9A7F8] hover:text-[#22223B]"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-[#B9A7F8] hover:text-[#22223B]">
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
            className="relative"
          >
            <div className="aspect-square bg-[#F7B6B6] rounded-[4rem] rotate-3 absolute inset-0 -z-10" />
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&h=800"
              alt="Beyond Encryption Team"
              className="rounded-[4rem] shadow-2xl w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-32">
          {[
            {
              icon: <Target className="w-8 h-8 text-[#B9A7F8]" />,
              title: 'The Project Goal',
              desc: 'To help secondary school students (ages 11-16) develop practical financial literacy skills through interactive content and simulations.',
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
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#22223B]">
                {item.title}
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#22223B] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9A7F8] rounded-full -mr-20 -mt-20 blur-[80px] opacity-20" />
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
            <button className="flex items-center gap-2 bg-[#B9A7F8] text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-[#B9A7F8]/20">
              Visit Beyond Encryption
            </button>
            <button className="flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-full border border-white/10 backdrop-blur-md">
              Learn more about Nigel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
