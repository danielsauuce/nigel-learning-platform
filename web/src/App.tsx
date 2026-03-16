import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Features } from './pages/Features'
import { About } from './pages/About'
import { RoleSelection } from './pages/Login/RoleSelection'
import { LoginForm } from './pages/Login/LoginForm'
import { StudentDashboard } from './pages/StudentDashboard'
import { TeacherDashboard } from './pages/TeacherDashboard'
import { ContentCreation } from './pages/ContentCreation'
import { ClassManagement } from './pages/ClassManagement'
import { TeacherAnalytics } from './pages/TeacherAnalytics'
import { TeacherSettings } from './pages/TeacherSettings'
import { BudgetSimulator } from './pages/BudgetSimulator'
import { MissionPage } from './pages/MissionPage'
import { DailyChallenge } from './pages/DailyChallenge'
import { StudentSettings } from './pages/StudentSettings'
import { ProgressStats } from './pages/ProgressStats'
import { FamilyShare } from './pages/FamilyShare'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  const isAuthPage = location.pathname.startsWith('/login')
  const isDashboard =
    location.pathname === '/student-dashboard' ||
    location.pathname === '/teacher-dashboard' ||
    location.pathname === '/create-content' ||
    location.pathname === '/manage-classes' ||
    location.pathname === '/teacher-analytics' ||
    location.pathname === '/teacher-settings' ||
    location.pathname === '/simulator' ||
    location.pathname === '/daily-challenge' ||
    location.pathname === '/student-settings' ||
    location.pathname === '/progress-stats' ||
    location.pathname === '/family-share' ||
    location.pathname.startsWith('/mission/')

  const hideLayout = isAuthPage || isDashboard

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A2E]">
      <ScrollToTop />
      {!hideLayout && <Navbar />}

      <main>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />

          {/* AUTH */}
          <Route path="/login" element={<RoleSelection />} />
          <Route path="/login/:role" element={<LoginForm />} />

          {/* STUDENT */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/simulator" element={<BudgetSimulator />} />
          <Route path="/mission/:id" element={<MissionPage />} />
          <Route path="/daily-challenge" element={<DailyChallenge />} />
          <Route path="/student-settings" element={<StudentSettings />} />
          <Route path="/progress-stats" element={<ProgressStats />} />
          <Route path="/family-share" element={<FamilyShare />} />

          {/* TEACHER */}
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/create-content" element={<ContentCreation />} />
          <Route path="/manage-classes" element={<ClassManagement />} />
          <Route path="/teacher-analytics" element={<TeacherAnalytics />} />
          <Route path="/teacher-settings" element={<TeacherSettings />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}

      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </div>
  )
}
