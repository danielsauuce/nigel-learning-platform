type JobCardProps = {
  emoji: string
  title: string
  description: string
  salary: string
  onSelect: () => void
}

export const JobCard = ({
  emoji,
  title,
  description,
  salary,
  onSelect,
}: JobCardProps) => (
  <button
    onClick={onSelect}
    className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 hover:border-[#B9A7F8] hover:shadow-xl transition-all text-left group"
  >
    <div className="text-4xl mb-4">{emoji}</div>
    <h3 className="text-xl font-black text-[#22223B] mb-2">{title}</h3>
    <p className="text-gray-400 text-sm font-medium mb-4">{description}</p>
    <div className="pt-4 border-t border-gray-50">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        Annual Salary
      </p>
      <p className="text-2xl font-black text-[#22223B]">{salary}</p>
    </div>
  </button>
)
