import {
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
import { SettingsHeader } from '../components/ui/SettingsHeader'
import { ThemeModeCard } from '../components/ui/ThemeModeCard'
import { SettingsSection } from '../components/ui/SettingsSection'

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
        <SettingsHeader
          title="Settings"
          dark={dark}
          onBack={() => navigate('/student-dashboard')}
        />

        <ThemeModeCard dark={dark} isOn={dark} onToggle={toggleTheme} />

        {SETTINGS_SECTIONS.map((section, sIdx) => (
          <SettingsSection
            key={sIdx}
            title={section.title}
            items={section.items}
            dark={dark}
            onItemPress={handlePress}
          />
        ))}

        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-8">
          Nigel Education App v1.0.0 · Made with love for Learners
        </p>
      </div>
    </div>
  )
}
