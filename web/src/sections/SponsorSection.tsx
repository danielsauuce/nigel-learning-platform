import { Shield } from 'lucide-react'

export const SponsorSection = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto border-2 border-dashed border-gray-100 rounded-3xl p-16 flex items-center gap-8">
      <Shield className="w-16 h-16 text-edulite-navy" />

      <div>
        <h2 className="text-3xl font-bold text-edulite-navy">
          Beyond Encryption
        </h2>

        <p className="text-gray-500 max-w-md">
          Proud sponsor of Nigel Junior helping build financial literacy.
        </p>
      </div>
    </div>
  </section>
)
