type SecurityField = {
  label: string
  type: string
  value: string
}

type TeacherSecurityCardProps = {
  dark: boolean
  fields: SecurityField[]
  onChange: (label: string, value: string) => void
  onSubmit: () => void
}

export const TeacherSecurityCard = ({
  dark,
  fields,
  onChange,
  onSubmit,
}: TeacherSecurityCardProps) => (
  <section
    className={`p-10 rounded-[3rem] border ${
      dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
    }`}
  >
    <h2
      className={`text-xl font-bold mb-6 ${dark ? 'text-white' : 'text-[#22223B]'}`}
    >
      Security
    </h2>
    <div className="space-y-6">
      {fields.map((field) => (
        <div key={field.label}>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            {field.label}
          </label>
          <input
            type={field.type}
            value={field.value}
            onChange={(event) => onChange(field.label, event.target.value)}
            placeholder="••••••••"
            className={`w-full p-4 rounded-2xl border font-medium ${
              dark
                ? 'bg-[#1A1A2E] border-[#3A3A55] text-white'
                : 'bg-gray-50 border-gray-200 text-[#22223B]'
            }`}
          />
        </div>
      ))}
      <button
        onClick={onSubmit}
        className="bg-[#22223B] text-white font-bold px-8 py-4 rounded-2xl"
      >
        Update Password
      </button>
    </div>
  </section>
)
