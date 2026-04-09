import { motion } from 'motion/react'
import { Clock } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { ProgressBar } from './ProgressBar'
import { ActionButtons } from './ActionButtons'

type Student = {
  id: string
  name: string
  missions: number
  avg: number
  simLevel: 'HIGH' | 'STEADY' | 'LOW'
  active: boolean
  lastActive: string
}

type StudentRowProps = {
  student: Student
  index: number
  onEmail?: (studentId: string) => void
  onMore?: (studentId: string) => void
}

export const StudentRow = ({
  student,
  index,
  onEmail,
  onMore,
}: StudentRowProps) => (
  <motion.tr
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className="hover:bg-gray-50/50 transition-colors group"
  >
    <td className="px-8 py-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#B9A7F8]/20 flex items-center justify-center text-[#B9A7F8] font-bold">
          {student.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-[#22223B]">{student.name}</p>
          <p className="text-xs text-gray-400 font-medium">{student.id}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-6">
      <span className="font-bold text-[#22223B]">{student.missions}</span>
      <span className="text-xs text-gray-400 ml-1">completed</span>
    </td>
    <td className="px-8 py-6">
      <ProgressBar value={student.avg} showValue />
    </td>
    <td className="px-8 py-6">
      <StatusBadge status={student.simLevel} />
    </td>
    <td className="px-8 py-6">
      <StatusBadge status={student.active ? 'active' : 'inactive'} showDot />
    </td>
    <td className="px-8 py-6">
      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
        <Clock className="w-3 h-3" />
        {student.lastActive}
      </div>
    </td>
    <td className="px-8 py-6 text-right">
      <ActionButtons
        onEmail={() => onEmail?.(student.id)}
        onMore={() => onMore?.(student.id)}
      />
    </td>
  </motion.tr>
)
