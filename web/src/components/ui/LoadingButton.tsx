import type { ReactNode } from 'react'

type LoadingButtonProps = {
  isLoading: boolean
  variant: 'teacher' | 'student'
  disabled?: boolean
  children: ReactNode
}

const variantClasses = {
  teacher: 'bg-[#22223B]',
  student: 'bg-[#B9A7F8]',
}

export const LoadingButton = ({
  isLoading,
  variant,
  disabled = false,
  children,
}: LoadingButtonProps) => (
  <button
    type="submit"
    disabled={disabled || isLoading}
    className={`w-full ${variantClasses[variant]} text-white font-bold py-5 rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed`}
  >
    {isLoading ? (
      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
    ) : (
      children
    )}
  </button>
)
