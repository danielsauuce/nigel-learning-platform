import { motion } from 'motion/react'
import { Users } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const teachers = [
  { name: 'Mrs. Yukari Samo', role: "Children's Music Teacher" },
  { name: 'Mrs. Yukari Samo', role: 'General Knowledge Teacher' },
  { name: 'Mrs. Yukari Samo', role: 'Games and Quiz Teacher' },
]

export const TeachersSection = () => (
  <section className="py-24 px-6 bg-edulite-purple/10 rounded-[4rem] mx-4 mt-8 relative overflow-hidden">
    {/* Decorative swirls */}
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
        <h2 className="text-4xl md:text-5xl font-bold text-edulite-navy mb-3">
          Meet our teachers
        </h2>
        <p className="text-edulite-gray max-w-lg mx-auto text-sm">
          Discover the teachers on Nigel who are ready to accompany children and parents in their learning journey.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-12">
        {teachers.map((t, i) => (
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
)
