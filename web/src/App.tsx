import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
// import { Features } from "./pages/Features"
// import { About } from "./pages/About"
// import { RoleSelection } from "./pages/Login/RoleSelection"
// import { LoginForm } from "./pages/Login/LoginForm"
// import { Dashboard } from "./pages/Dashboard"
// import { TeacherDashboard } from "./pages/TeacherDashboard"
// import { ContentCreation } from "./pages/ContentCreation"
// import { ClassManagement } from "./pages/ClassManagement"
// import { TeacherAnalytics } from "./pages/TeacherAnalytics"
// import { TeacherSettings } from "./pages/TeacherSettings"
// import { StudentDashboard } from "./pages/StudentDashboard"
// import { BudgetSimulator } from "./pages/BudgetSimulator"
// import { MissionPage } from "./pages/MissionPage"

// scroll to top
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// App content
function AppContent() {
  const location = useLocation()

  const dashboardRoutes = [
    '/dashboard',
    '/teacher-dashboard',
    '/create-content',
    '/manage-classes',
    '/teacher-analytics',
    '/teacher-settings',
    '/student-dashboard',
    '/simulator',
  ]

  const isAuthPage = location.pathname.startsWith('/login')
  const isDashboard =
    dashboardRoutes.includes(location.pathname) ||
    location.pathname.startsWith('/mission/')

  const hideLayout = isAuthPage || isDashboard

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />

      {!hideLayout && <Navbar />}

      <main>
        <Routes>
          {/* PUBLIC PAGES */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} /> */}

          {/* AUTH */}
          {/* <Route path="/login" element={<RoleSelection />} />
          <Route path="/login/:role" element={<LoginForm />} />

          {/* DASHBOARD */}
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/create-content" element={<ContentCreation />} />
          <Route path="/manage-classes" element={<ClassManagement />} />
          <Route path="/teacher-analytics" element={<TeacherAnalytics />} />
          <Route path="/teacher-settings" element={<TeacherSettings />} /> */}

          {/* STUDENT */}
          {/* <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/simulator" element={<BudgetSimulator />} />
          <Route path="/mission/:id" element={<MissionPage />} /> */}
        </Routes>
      </main>

      {!hideLayout && <Footer />}

      {/* Utility styles */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  )
}

// Root app
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
