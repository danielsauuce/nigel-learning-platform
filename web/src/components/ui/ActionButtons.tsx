import { Mail, MoreHorizontal } from 'lucide-react'

type ActionButtonsProps = {
  onEmail?: () => void
  onMore?: () => void
  className?: string
}

export const ActionButtons = ({
  onEmail,
  onMore,
  className = '',
}: ActionButtonsProps) => (
  <div
    className={`flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${className}`}
  >
    <button
      onClick={onEmail}
      className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-[#B9A7F8] hover:text-white transition-all"
    >
      <Mail className="w-4 h-4" />
    </button>
    <button
      onClick={onMore}
      className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-[#22223B] hover:text-white transition-all"
    >
      <MoreHorizontal className="w-4 h-4" />
    </button>
  </div>
)
