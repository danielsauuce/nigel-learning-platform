import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all ${
        theme === 'dark'
          ? 'bg-[#2A2A40] border-[#3A3A55] text-white'
          : 'bg-white border-gray-200 text-[#22223B]'
      } ${className}`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <Moon className="w-4 h-4 text-[#B9A7F8]" />
          <span className="text-xs font-bold">Dark</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold">Light</span>
        </>
      )}
    </button>
  )
}
