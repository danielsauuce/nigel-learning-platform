import { Camera } from 'lucide-react'

type TeacherProfileCardProps = {
  dark: boolean
  initials: string
  name: string
  email: string
  fields: Array<{ label: string; value: string }>
}

export const TeacherProfileCard = ({
  dark,
  initials,
  name,
  email,
  fields,
}: TeacherProfileCardProps) => (
  <section
    className={`p-10 rounded-[3rem] border ${
      dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
    }`}
  >
    <div className="flex items-center gap-8 mb-8">
      <div className="relative">
        <div className="w-24 h-24 bg-[#B9A7F8] rounded-[2rem] flex items-center justify-center text-white text-3xl font-black">
          {initials}
        </div>
        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#22223B] rounded-full flex items-center justify-center text-white">
          <Camera className="w-4 h-4" />
        </button>
      </div>
      <div>
        <h2
          className={`text-xl font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          {name}
        </h2>
        <p className={dark ? 'text-gray-400' : 'text-gray-500'}>{email}</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <div key={field.label}>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            {field.label}
          </label>
          <input
            type="text"
            defaultValue={field.value}
            className={`w-full p-4 rounded-2xl border font-medium ${
              dark
                ? 'bg-[#1A1A2E] border-[#3A3A55] text-white'
                : 'bg-gray-50 border-gray-200 text-[#22223B]'
            }`}
          />
        </div>
      ))}
    </div>
  </section>
)
