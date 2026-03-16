export const TeachersSection = () => (
  <section className="py-24 px-6 bg-edulite-purple/10 rounded-[4rem] mx-4 mt-8">
    <div className="max-w-7xl mx-auto text-center space-y-12">
      <h2 className="text-4xl font-bold text-edulite-navy">
        Meet our teachers
      </h2>

      <div className="grid sm:grid-cols-3 gap-12">
        {['Music Teacher', 'Knowledge Teacher', 'Games Teacher'].map(
          (role, i) => (
            <div key={i} className="space-y-4">
              <div className="w-40 h-40 bg-white rounded-full mx-auto shadow-xl" />
              <h4 className="font-bold text-lg text-edulite-navy">
                Mrs. Yukari Samo
              </h4>
              <p className="text-gray-500 text-sm">{role}</p>
            </div>
          )
        )}
      </div>
    </div>
  </section>
)
