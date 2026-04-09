type InsightSummaryCardProps = {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
  items: Array<{ label: string; value: string }>
}

export const InsightSummaryCard = ({
  title,
  description,
  actionLabel,
  onAction,
  items,
}: InsightSummaryCardProps) => (
  <div className="bg-[#22223B] rounded-[4rem] p-12 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-[#B9A7F8]/20 rounded-full -mr-32 -mt-32 blur-3xl" />
    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-white/60 leading-relaxed font-medium">
          {description}
        </p>
        <button
          onClick={onAction}
          className="bg-[#B9A7F8] text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-[#B9A7F8]/30"
        >
          {actionLabel}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10"
          >
            <p className="text-white/40 text-xs font-bold uppercase mb-1">
              {item.label}
            </p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)
