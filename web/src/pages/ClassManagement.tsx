import { useNavigate } from 'react-router-dom'
import { TeacherSidebar } from '../components/TeacherSidebar'
import { STUDENTS } from '../data/teachers'
import { PageHeader } from '../components/ui/PageHeader'
import { StudentTable } from '../components/ui/StudentTable'

export const ClassManagement = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <TeacherSidebar />
      <div className="flex-1 lg:ml-80 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <PageHeader
            title="Student Roster"
            subtitle={`${STUDENTS.length} students enrolled`}
            onBack={() => navigate('/teacher-dashboard')}
            searchPlaceholder="Search students..."
          />

          <StudentTable students={STUDENTS} />
        </div>
      </div>
    </div>
  )
}
