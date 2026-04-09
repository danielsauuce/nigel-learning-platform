import type { ChangeEventHandler, ReactNode } from 'react'

type InputFieldProps = {
  name: string
  label: string
  type: string
  placeholder: string
  icon: ReactNode
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  trailing?: ReactNode
  required?: boolean
}

export const InputField = ({
  name,
  label,
  type,
  placeholder,
  icon,
  value,
  onChange,
  trailing,
  required = true,
}: InputFieldProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label htmlFor={name} className="text-sm font-bold text-[#22223B] block">
        {label}
      </label>
      {trailing ? <div>{trailing}</div> : null}
    </div>

    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#B9A7F8] focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
      />
    </div>
  </div>
)
