import { StudentRow } from './StudentRow'

type Student = {
  id: string
  name: string
  missions: number
  avg: number
  simLevel: 'HIGH' | 'STEADY' | 'LOW'
  active: boolean
  lastActive: string
}

type StudentTableProps = {
  students: Student[]
  onEmail?: (studentId: string) => void
  onMore?: (studentId: string) => void
}

export const StudentTable = ({
  students,
  onEmail,
  onMore,
}: StudentTableProps) => (
  <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Student
            </th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Missions
            </th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Avg Score
            </th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Sim Level
            </th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Last Active
            </th>
            <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((student, i) => (
            <StudentRow
              key={student.id}
              student={student}
              index={i}
              onEmail={onEmail}
              onMore={onMore}
            />
          ))}
        </tbody>
      </table>
    </div>
    <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
      <p className="text-xs text-gray-400 font-bold">
        Showing {students.length} students
      </p>
    </div>
  </div>
)
