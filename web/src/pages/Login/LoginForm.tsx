import { motion } from 'motion/react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, ArrowLeft, GraduationCap, UserCircle } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'

export const LoginForm = () => {
  const { role } = useParams<{ role: string }>()
  const navigate = useNavigate()
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isTeacher = role === 'teacher'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Set role in AuthContext (mirrors mobile AuthContext.setRole)
    auth.setRole(isTeacher ? 'teacher' : 'student')
    setTimeout(() => {
      setIsLoading(false)
      if (isTeacher) {
        navigate('/teacher-dashboard')
      } else {
        navigate('/student-dashboard')
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Side - Visual */}
      <div
        className={`hidden md:flex flex-1 ${
          isTeacher ? 'bg-[#22223B]' : 'bg-[#B9A7F8]'
        } items-center justify-center p-20 relative overflow-hidden`}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-96 h-96 border-4 border-white rounded-[4rem] rotate-12" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 relative z-10"
        >
          <div className="w-32 h-32 bg-white/20 rounded-[2.5rem] flex items-center justify-center mx-auto backdrop-blur-md">
            {isTeacher ? (
              <GraduationCap className="w-16 h-16 text-white" />
            ) : (
              <UserCircle className="w-16 h-16 text-white" />
            )}
          </div>
          <h2 className="text-5xl font-bold text-white leading-tight">
            {isTeacher
              ? 'Empower the next generation'
              : 'Unlock your full potential'}
          </h2>
          <p className="text-white/70 text-lg max-w-md mx-auto font-medium">
            {isTeacher
              ? 'Access your dashboard to manage curriculum and engage with students effectively.'
              : 'Dive back into your personalized learning path and continue your adventure.'}
          </p>
        </motion.div>
      </div>

      {/* Right Side - Form */}
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
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#22223B] block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#B9A7F8] focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[#22223B] block">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-bold text-[#B9A7F8]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#B9A7F8] focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              className={`w-full ${
                isTeacher ? 'bg-[#22223B]' : 'bg-[#B9A7F8]'
              } text-white font-bold py-5 rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
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
