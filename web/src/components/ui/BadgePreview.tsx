type BadgePreviewProps = {
  emoji: string
  title: string
  dark: boolean
}

export const BadgePreview = ({ emoji, title, dark }: BadgePreviewProps) => (
  <div className="flex flex-col items-center gap-2 group">
    <div
      className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform ${
        dark ? 'bg-[#1A1A2E]' : 'bg-amber-100'
      }`}
    >
      {emoji}
    </div>
    <span className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-tighter">
      {title}
    </span>
  </div>
)
