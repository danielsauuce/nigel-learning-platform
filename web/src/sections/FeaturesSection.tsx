import { BookOpen, Gamepad2, Lightbulb } from 'lucide-react'

export const FeaturesSection = () => (
  <section className="py-24 px-6 bg-edulite-navy rounded-[4rem] mx-4">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      <FeatureCard
        icon={<BookOpen />}
        title="Bite-sized Learning"
        desc="Budgeting basics, saving goals and money skills."
      />

      <FeatureCard
        icon={<Gamepad2 />}
        title="Interactive Simulator"
        desc="Experience realistic financial decisions."
      />

      <FeatureCard
        icon={<Lightbulb />}
        title="Smart Data Insights"
        desc="Powered by Nigel's smart data system."
      />
    </div>
  </section>
)

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-white/5 p-10 rounded-3xl space-y-4 text-white">
    <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-xl">
      {icon}
    </div>

    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-white/60 text-sm">{desc}</p>
  </div>
)
