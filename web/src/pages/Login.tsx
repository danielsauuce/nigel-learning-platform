import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
} from 'lucide-react'
import { NigelBrandIcon } from '../components/ui/Logo'
import { NigelMascot } from '../components/mobile/NigelMascot'

type Role = 'student' | 'teacher' | null

export const Login = () => {
  const [role, setRole] = useState<Role>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-edulite-bg flex relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-edulite-purple/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-edulite-brand/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-edulite-yellow/10 rounded-full blur-3xl" />

      {/* Left — branding panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-edulite-navy relative flex-col items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-edulite-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-edulite-brand/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center space-y-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <NigelMascot size={160} animate={false} />
          </motion.div>

          <h2 className="text-4xl font-bold text-white leading-tight">
            Turn learning
            <br />
            into <span className="text-edulite-purple">fun!</span>
          </h2>
          <p className="text-white/50 max-w-sm mx-auto">
            Join 320k+ children building financial confidence with Nigel.
          </p>

          {/* Floating stats */}
          <div className="flex gap-4 justify-center pt-4">
            {[
              { num: '50+', label: 'Lessons' },
              { num: '98%', label: 'Satisfaction' },
              { num: '15+', label: 'Countries' },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/5 rounded-2xl px-5 py-3 text-center"
              >
                <p className="text-lg font-bold text-edulite-purple">{s.num}</p>
                <p className="text-white/40 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo + back */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <NigelBrandIcon size={32} />
              <span
                className="font-bold text-lg text-edulite-navy lowercase"
                style={{ letterSpacing: '-0.02em' }}
              >
                nigel
              </span>
            </Link>
            <Link
              to="/"
              className="text-edulite-gray text-sm hover:text-edulite-purple transition-colors"
            >
              ← Back to home
            </Link>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold text-edulite-navy">
              Welcome back
            </h1>
            <p className="text-edulite-gray mt-2">
              Sign in to continue your learning journey.
            </p>
          </div>

          {/* Role selection */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-edulite-navy">I am a...</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRole('student')}
                className={`relative p-5 rounded-2xl border-2 transition-all text-left group ${
                  role === 'student'
                    ? 'border-edulite-purple bg-edulite-purple/5 shadow-lg shadow-edulite-purple/10'
                    : 'border-gray-100 bg-white hover:border-edulite-purple/30'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    role === 'student'
                      ? 'bg-edulite-purple text-white'
                      : 'bg-edulite-purple/10 text-edulite-purple'
                  }`}
                >
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-edulite-navy">Student</h3>
                <p className="text-edulite-gray text-xs mt-1">
                  Learn & explore finances
                </p>
                {role === 'student' && (
                  <motion.div
                    layoutId="roleCheck"
                    className="absolute top-3 right-3 w-6 h-6 bg-edulite-purple rounded-full flex items-center justify-center"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </button>

              <button
                onClick={() => setRole('teacher')}
                className={`relative p-5 rounded-2xl border-2 transition-all text-left group ${
                  role === 'teacher'
                    ? 'border-edulite-brand bg-edulite-brand/5 shadow-lg shadow-edulite-brand/10'
                    : 'border-gray-100 bg-white hover:border-edulite-brand/30'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    role === 'teacher'
                      ? 'bg-edulite-brand text-white'
                      : 'bg-edulite-brand/10 text-edulite-brand'
                  }`}
                >
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-edulite-navy">Teacher</h3>
                <p className="text-edulite-gray text-xs mt-1">
                  Manage classes & content
                </p>
                {role === 'teacher' && (
                  <motion.div
                    layoutId="roleCheck"
                    className="absolute top-3 right-3 w-6 h-6 bg-edulite-brand rounded-full flex items-center justify-center"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </button>
            </div>
          </div>

          {/* Login form — appears after role selection */}
          <AnimatePresence>
            {role && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5 overflow-hidden"
              >
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-edulite-navy">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-edulite-gray" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-edulite-navy placeholder:text-gray-300 focus:outline-none focus:border-edulite-purple focus:ring-2 focus:ring-edulite-purple/10 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-edulite-navy">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-edulite-purple font-semibold hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-edulite-gray" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-edulite-navy placeholder:text-gray-300 focus:outline-none focus:border-edulite-purple focus:ring-2 focus:ring-edulite-purple/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-edulite-gray hover:text-edulite-navy transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    role === 'student'
                      ? 'bg-edulite-purple hover:bg-edulite-navy shadow-edulite-purple/25'
                      : 'bg-edulite-brand hover:bg-edulite-navy shadow-edulite-brand/25'
                  }`}
                >
                  Sign in as {role === 'student' ? 'Student' : 'Teacher'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-edulite-gray font-medium">
                    or continue with
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Social logins */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-edulite-navy hover:bg-gray-50 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-edulite-navy hover:bg-gray-50 transition-colors">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#22223B"
                    >
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.18-.04-.39-.04-.59 0-1.15.572-2.27 1.206-2.98.94-1.01 2.13-1.59 3.03-1.59.13 0 .26.02.39.04.04.18.07.35.07.53zm3.07 15.9c-.34.73-.5 1.06-.93 1.7-.61.9-1.47 2.03-2.54 2.04-.95.01-1.2-.62-2.48-.62-1.29 0-1.56.61-2.46.63-1.09.03-1.92-1.23-2.53-2.13-1.7-2.53-1.88-5.5-.83-7.08.75-1.12 1.93-1.78 3.04-1.78 1.13 0 1.84.62 2.78.62.91 0 1.46-.62 2.77-.62 .99 0 2.03.54 2.78 1.46-2.44 1.34-2.04 4.82.4 5.78z" />
                    </svg>
                    Apple
                  </button>
                </div>

                {/* Sign up link */}
                <p className="text-center text-sm text-edulite-gray">
                  Don&apos;t have an account?{' '}
                  <a
                    href="#"
                    className="text-edulite-purple font-semibold hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
