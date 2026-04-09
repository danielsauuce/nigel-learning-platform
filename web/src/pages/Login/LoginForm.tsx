import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, ArrowLeft, GraduationCap, UserCircle } from 'lucide-react'
import type { FormEvent, ChangeEvent, ReactNode } from 'react'
import { useAuth } from '../../context/AuthContext'
import { AuthPanel } from '../../components/ui/AuthPanel'
import { InputField } from '../../components/ui/InputField'
import { LoadingButton } from '../../components/ui/LoadingButton'

const authHeroData = {
  teacher: {
    title: 'Empower the next generation',
    description:
      'Access your dashboard to manage curriculum and engage with students effectively.',
    icon: <GraduationCap className="w-16 h-16 text-white" />,
  },
  student: {
    title: 'Unlock your full potential',
    description:
      'Dive back into your personalized learning path and continue your adventure.',
    icon: <UserCircle className="w-16 h-16 text-white" />,
  },
}

type FieldConfig = {
  name: 'email' | 'password'
  label: string
  type: string
  placeholder: string
  icon: ReactNode
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  trailing?: ReactNode
}

export const LoginForm = () => {
  const { role } = useParams<{ role: string }>()
  const navigate = useNavigate()
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isTeacher = role === 'teacher'
  const hero = isTeacher ? authHeroData.teacher : authHeroData.student

  const fields: FieldConfig[] = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'name@example.com',
      icon: <Mail className="w-5 h-5" />,
      value: email,
      onChange: (event) => setEmail(event.target.value),
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      icon: <Lock className="w-5 h-5" />,
      value: password,
      onChange: (event) => setPassword(event.target.value),
      trailing: (
        <button type="button" className="text-xs font-bold text-[#B9A7F8]">
          Forgot password?
        </button>
      ),
    },
  ]

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    auth.setRole(isTeacher ? 'teacher' : 'student')

    setTimeout(() => {
      setIsLoading(false)
      navigate(isTeacher ? '/teacher-dashboard' : '/student-dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <AuthPanel
        isTeacher={isTeacher}
        title={hero.title}
        description={hero.description}
        icon={hero.icon}
      />

      <div className="flex-1 flex flex-col justify-center px-8 md:px-20 py-20 relative">
        <Link
          to="/login"
          className="absolute top-10 left-8 md:left-20 flex items-center gap-2 text-gray-500 font-bold hover:text-[#22223B] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to roles
        </Link>

        <div className="max-w-md w-full mx-auto space-y-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[#22223B]">
              {isTeacher ? 'Teacher Login' : 'Student Login'}
            </h1>
            <p className="text-gray-500 font-medium">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <InputField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                icon={field.icon}
                value={field.value}
                onChange={field.onChange}
                trailing={field.trailing}
              />
            ))}

            <LoadingButton
              variant={isTeacher ? 'teacher' : 'student'}
              isLoading={isLoading}
            >
              Sign In
            </LoadingButton>
          </form>

          <div className="text-center">
            <p className="text-gray-500 font-medium">
              Don&apos;t have an account?{' '}
              <button className="text-[#B9A7F8] font-bold">
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
