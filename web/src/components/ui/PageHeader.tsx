import { ArrowLeft, Search, Filter } from 'lucide-react'

type PageHeaderProps = {
  title: string
  subtitle: string
  onBack: () => void
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  onFilter?: () => void
}

export const PageHeader = ({
  title,
  subtitle,
  onBack,
  searchPlaceholder = 'Search...',
  onSearch,
  onFilter,
}: PageHeaderProps) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 hover:text-[#22223B] transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[#22223B]">{title}</h1>
        <p className="text-gray-500 font-medium">{subtitle}</p>
      </div>
    </div>
    <div className="flex items-center gap-3 w-full md:w-auto">
      <div className="relative flex-1 md:w-64">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full bg-white border-2 border-transparent focus:border-[#B9A7F8] rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-medium shadow-sm"
        />
      </div>
      <button
        onClick={onFilter}
        className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400"
      >
        <Filter className="w-5 h-5" />
      </button>
    </div>
  </header>
)
