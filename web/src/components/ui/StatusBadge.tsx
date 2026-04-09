type StatusBadgeProps = {
  status: 'active' | 'inactive' | 'HIGH' | 'STEADY' | 'LOW'
  showDot?: boolean
}

export const StatusBadge = ({ status, showDot = false }: StatusBadgeProps) => {
  const getBadgeStyles = () => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-600'
      case 'inactive':
        return 'bg-red-50 text-red-600'
      case 'HIGH':
        return 'bg-emerald-50 text-emerald-600'
      case 'STEADY':
        return 'bg-amber-50 text-amber-600'
      case 'LOW':
        return 'bg-rose-50 text-rose-600'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  const getDotColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-600'
      case 'inactive':
        return 'bg-red-600'
      default:
        return ''
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${getBadgeStyles()}`}
    >
      {showDot && (
        <div className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`} />
      )}
      {status === 'active'
        ? 'Active'
        : status === 'inactive'
          ? 'Inactive'
          : status}
    </span>
  )
}
