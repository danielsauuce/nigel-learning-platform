import type { BudgetCategory } from '../../types'

type BudgetSliderProps = {
  category: BudgetCategory
  onChange: (key: string, value: number) => void
}

export const BudgetSlider = ({ category, onChange }: BudgetSliderProps) => (
  <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl">
      {category.emoji}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-[#22223B]">{category.label}</span>
        <span className="font-black text-[#B9A7F8]">£{category.value}</span>
      </div>
      <p className="text-xs text-gray-400 mb-2">
        Recommended: £{category.recommended}
      </p>
      <input
        type="range"
        min="0"
        max={category.max}
        step={category.step}
        value={category.value}
        onChange={(e) => onChange(category.key, parseInt(e.target.value))}
        className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#B9A7F8]"
      />
    </div>
  </div>
)
