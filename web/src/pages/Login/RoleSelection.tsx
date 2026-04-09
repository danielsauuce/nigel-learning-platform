import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { UserCircle, GraduationCap } from 'lucide-react'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { RoleCard } from '../../components/ui/RoleCard'

type RoleOption = {
  role: 'student' | 'teacher'
  title: string
  description: string
  cta: string
  icon: ReactNode
  panelClass: string
  accentClass: string
  iconWrapperClass: string
  textClass: string
  ctaClass: string
  delay: number
}

const roleOptions: RoleOption[] = [
  {
    role: 'student',
    title: "I'm a Student",
    description:
      'Access your courses, play educational games, and track your learning journey.',
    cta: 'Continue as Student',
    icon: (
      <UserCircle className="w-10 h-10 text-[#B9A7F8] group-hover:text-white transition-colors" />
    ),
    panelClass:
      'bg-white border-transparent hover:border-[#B9A7F8] group-hover:shadow-2xl',
    accentClass: 'bg-[#B9A7F8]/5',
    iconWrapperClass: 'w-20 h-20 bg-[#B9A7F8]/10 group-hover:bg-[#B9A7F8]',
    textClass: 'text-[#22223B] group-hover:text-[#22223B]',
    ctaClass: 'text-[#B9A7F8]',
    delay: -0.2,
  },
  {
    role: 'teacher',
    title: "I'm a Teacher",
    description:
      'Manage your classes, create new content, and monitor student performance.',
    cta: 'Continue as Teacher',
    icon: (
      <GraduationCap className="w-10 h-10 text-white group-hover:text-white transition-colors" />
    ),
    panelClass:
      'bg-[#22223B] border-transparent hover:border-[#F7B6B6] group-hover:shadow-2xl',
    accentClass: 'bg-white/5',
    iconWrapperClass: 'w-20 h-20 bg-white/10 group-hover:bg-[#F7B6B6]',
    textClass: 'text-white',
    ctaClass: 'text-[#F7B6B6]',
    delay: 0.3,
  },
]

export const RoleSelection = () => {
  const navigate = useNavigate()

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    navigate(`/login/${role}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <SectionHeader
          title="Welcome back!"
          subtitle="Please select your role to continue to the login screen"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {roleOptions.map((option) => (
            <RoleCard
              key={option.role}
              title={option.title}
              description={option.description}
              cta={option.cta}
              icon={option.icon}
              accentClass={option.accentClass}
              panelClass={option.panelClass}
              iconWrapperClass={option.iconWrapperClass}
              textClass={option.textClass}
              ctaClass={option.ctaClass}
              transitionDelay={option.delay}
              onSelect={() => handleRoleSelect(option.role)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
