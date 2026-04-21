import { BookOpen, Gamepad2, Lightbulb, Shield } from 'lucide-react'
import { HeroSection } from '../sections/HeroSection'
import { SponsorSection } from '../sections/SponsorSection'
import { CTASection } from '../sections/CTASection'

export const Home = () => (
  <>
    <HeroSection />

    {/* ── Financial Literacy for the Future ── */}
    <section className="py-24 px-6 bg-[#1A1A2E] rounded-[4rem] mx-4 md:mx-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-white">
              Financial Literacy <br /> for the Future
            </h2>
            <p className="text-white/50 max-w-md">
              A ring-fenced sprint project aimed at secondary school students,
              preparing them for real-world financial decisions.
            </p>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#B9A7F8] rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#22223B]" />
            </div>
            <div>
              <p className="text-white font-bold">Curriculum Ready</p>
              <p className="text-white/40 text-xs">Targeting 2028 Readiness</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="w-6 h-6" />,
              title: 'Bite-sized Learning',
              desc: 'Budgeting basics, needs vs wants, and saving goals in easy-to-digest levels.',
              color: 'bg-white/5',
            },
            {
              icon: <Gamepad2 className="w-6 h-6" />,
              title: 'Interactive Simulator',
              desc: 'Experience a realistic first job scenario and manage your first payslip.',
              color: 'bg-[#B9A7F8]',
            },
            {
              icon: <Lightbulb className="w-6 h-6" />,
              title: 'Smart Data Insights',
              desc: "Powered by Nigel's award-winning data agent to simplify complex admin.",
              color: 'bg-white/5',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`${item.color} p-12 rounded-[3.5rem] space-y-6 border border-white/5`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${i === 1 ? 'bg-white/20' : 'bg-white/10'}`}
              >
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Meet our teachers ── */}
    <section className="py-24 px-6 bg-[#B9A7F8]/10 rounded-[4rem] mx-4 md:mx-8 mt-8">
      <div className="max-w-7xl mx-auto text-center space-y-16">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold text-[#22223B]">
            Meet our teachers
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Discover the teachers on Nigel who are ready to accompany children
            and parents in their learning journey.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-12">
          {[
            { name: 'Mrs. Yukari Samo', role: "Children's Music Teacher" },
            { name: 'Mrs. Yukari Samo', role: 'General Knowledge Teacher' },
            { name: 'Mrs. Yukari Samo', role: 'Games and Quiz Teacher' },
          ].map((teacher, i) => (
            <div key={teacher.role} className="space-y-6">
              <div className="relative mx-auto w-48 h-48">
                <div className="absolute inset-0 bg-[#F7B6B6] rounded-full rotate-6" />
                <div className="absolute inset-0 bg-white rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={`https://images.unsplash.com/photo-${1544005313 + i}?auto=format&fit=crop&w=300&h=300`}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xl text-[#22223B]">
                  {teacher.name}
                </h4>
                <p className="text-gray-500 text-sm font-medium">
                  {teacher.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <SponsorSection />
    <CTASection />
  </>
)
