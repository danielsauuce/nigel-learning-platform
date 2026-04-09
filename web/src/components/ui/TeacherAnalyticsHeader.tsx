import { ArrowLeft, Calendar, Download, ChevronDown } from 'lucide-react'

type TeacherAnalyticsHeaderProps = {
  onBack: () => void
  title: string
  subtitle: string
  timeRangeLabel: string
  onExport: () => void
}

export const TeacherAnalyticsHeader = ({
  onBack,
  title,
  subtitle,
  timeRangeLabel,
  onExport,
}: TeacherAnalyticsHeaderProps) => (
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

    <div className="flex items-center gap-3">
      <button className="bg-white text-[#22223B] font-bold px-6 py-3 rounded-2xl border border-gray-200 flex items-center gap-2 shadow-sm">
        <Calendar className="w-5 h-5 text-gray-400" />
        {timeRangeLabel}
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      <button
        onClick={onExport}
        className="bg-[#22223B] text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg"
      >
        <Download className="w-5 h-5" />
        Export Report
      </button>
    </div>
  </header>
)
