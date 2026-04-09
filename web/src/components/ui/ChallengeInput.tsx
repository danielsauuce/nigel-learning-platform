import React from 'react'

interface ChallengeInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled: boolean
  inputChecked: boolean
  onCheck: () => void
  dark: boolean
}

export const ChallengeInput: React.FC<ChallengeInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  inputChecked,
  onCheck,
  dark,
}) => {
  return (
    <div className="space-y-3">
      <div
        className={`flex items-center gap-3 p-4 rounded-2xl border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
      >
        <span
          className={`font-bold text-lg ${dark ? 'text-gray-400' : 'text-gray-300'}`}
        >
          £
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 font-bold text-lg outline-none bg-transparent ${dark ? 'text-white placeholder-gray-600' : 'text-[#22223B] placeholder-gray-300'}`}
        />
      </div>
      {!inputChecked && (
        <button
          disabled={value.trim().length === 0}
          onClick={onCheck}
          className={`w-full py-3 rounded-2xl font-bold transition-all ${value.trim().length > 0 ? 'bg-[#B9A7F8] text-white' : dark ? 'bg-[#2A2A40] text-gray-500' : 'bg-gray-100 text-gray-400'}`}
        >
          Check Answer
        </button>
      )}
    </div>
  )
}
