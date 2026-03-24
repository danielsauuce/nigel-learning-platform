import {
  ArrowLeft,
  Moon,
  Sun,
  User,
  Lock,
  Bell,
  Palette,
  HelpCircle,
  MessageCircle,
  LogOut,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

/** Mirrors mobile settings.config.ts SETTINGS_SECTIONS */
const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      {
        key: 'profile',
        icon: <User className="w-5 h-5" />,
        label: 'Edit Profile',
        subtitle: 'Name, avatar, and preferences',
      },
      {
        key: 'privacy',
        icon: <Lock className="w-5 h-5" />,
        label: 'Privacy & Data',
        subtitle: 'Control your data and sharing',
      },
    ],
  },
  {
    title: 'Preferences',
    items: [
      {
        key: 'notifications',
        icon: <Bell className="w-5 h-5" />,
        label: 'Notifications',
        subtitle: 'Reminders and alerts',
      },
      {
        key: 'appearance',
        icon: <Palette className="w-5 h-5" />,
        label: 'Appearance',
        subtitle: 'Theme and display settings',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        key: 'help',
        icon: <HelpCircle className="w-5 h-5" />,
        label: 'Help & Support',
        subtitle: 'FAQs and contact us',
      },
      {
        key: 'feedback',
        icon: <MessageCircle className="w-5 h-5" />,
        label: 'Send Feedback',
        subtitle: 'Help us improve',
      },
    ],
  },
  {
    title: '',
    items: [
      {
        key: 'logout',
        icon: <LogOut className="w-5 h-5" />,
        label: 'Log Out',
        subtitle: 'Sign out of your account',
      },
    ],
  },
]

export const StudentSettings = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { reset } = useAuth()
  const dark = theme === 'dark'

  const handlePress = (key: string) => {
    switch (key) {
      case 'profile':
        break // future
      case 'privacy':
        navigate('/family-share')
        break
      case 'logout':
        reset()
        navigate('/login')
        break
      default:
        break
    }
  }

  return (
    <div
      className={`min-h-screen p-6 md:p-10 transition-colors ${dark ? 'bg-[#1A1A2E]' : 'bg-[#F8F9FE]'}`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/student-dashboard')}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${dark ? 'bg-[#2A2A40] text-gray-400' : 'bg-white text-gray-400'} hover:text-[#B9A7F8]`}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1
              className={`text-3xl font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
            >
              Settings
            </h1>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div
          className={`p-5 rounded-[2rem] border mb-6 ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
        >
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {dark ? (
                <Moon className="w-5 h-5 text-[#B9A7F8]" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <div className="text-left">
                <p
                  className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
                >
                  Dark Mode
                </p>
                <p className="text-xs text-gray-400">
                  {dark ? 'On — easier on the eyes' : 'Off — bright and clean'}
                </p>
              </div>
            </div>
            <div
              className={`w-12 h-7 rounded-full relative transition-all ${dark ? 'bg-[#B9A7F8]' : 'bg-gray-200'}`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow ${dark ? 'left-6' : 'left-1'}`}
              />
            </div>
          </button>
        </div>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map((section, sIdx) => (
          <div key={sIdx} className="mb-6">
            {section.title && (
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">
                {section.title}
              </p>
            )}
            <div
              className={`rounded-[2rem] border overflow-hidden ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
            >
              {section.items.map((item, i) => (
                <button
                  key={item.key}
                  onClick={() => handlePress(item.key)}
                  className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${i < section.items.length - 1 ? (dark ? 'border-b border-[#3A3A55]' : 'border-b border-gray-50') : ''} ${item.key === 'logout' ? '' : dark ? 'hover:bg-[#1A1A2E]' : 'hover:bg-gray-50'}`}
                >
                  <span
                    className={
                      item.key === 'logout' ? 'text-rose-500' : 'text-gray-400'
                    }
                  >
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <p
                      className={`font-bold text-sm ${item.key === 'logout' ? 'text-rose-500' : dark ? 'text-white' : 'text-[#22223B]'}`}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-400">{item.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-8">
          Nigel Education App v1.0.0 · Made with love for Learners
        </p>
      </div>
    </div>
  )
}
