type NotificationPreference = {
  id: string
  label: string
  desc: string
  enabled: boolean
}

type TeacherNotificationsCardProps = {
  dark: boolean
  preferences: NotificationPreference[]
  onToggle: (id: string) => void
}

export const TeacherNotificationsCard = ({
  dark,
  preferences,
  onToggle,
}: TeacherNotificationsCardProps) => (
  <section
    className={`p-10 rounded-[3rem] border ${
      dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
    }`}
  >
    <h2
      className={`text-xl font-bold mb-6 ${dark ? 'text-white' : 'text-[#22223B]'}`}
    >
      Notification Preferences
    </h2>
    <div className="space-y-4">
      {preferences.map((pref) => (
        <div
          key={pref.id}
          className={`flex items-center justify-between py-5 border-b last:border-b-0 ${
            dark ? 'border-[#3A3A55]' : 'border-gray-100'
          }`}
        >
          <div>
            <p
              className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
            >
              {pref.label}
            </p>
            <p className="text-xs text-gray-400">{pref.desc}</p>
          </div>
          <button
            onClick={() => onToggle(pref.id)}
            className={`w-12 h-7 rounded-full relative transition-all ${
              pref.enabled ? 'bg-[#B9A7F8]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow transition-all ${
                pref.enabled ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  </section>
)
