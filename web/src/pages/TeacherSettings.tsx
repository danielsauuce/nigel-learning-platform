import { useState } from 'react'
import { User, Bell, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TeacherSidebar } from '../components/TeacherSidebar'
import { useTheme } from '../context/ThemeContext'
import { SettingsHeader } from '../components/ui/SettingsHeader'
import { SettingsSidebar } from '../components/ui/SettingsSidebar'
import { TeacherProfileCard } from '../components/ui/TeacherProfileCard'
import { TeacherFamilyConsentCard } from '../components/ui/TeacherFamilyConsentCard'
import { TeacherNotificationsCard } from '../components/ui/TeacherNotificationsCard'
import { TeacherSecurityCard } from '../components/ui/TeacherSecurityCard'

const initialNotificationPreferences = [
  {
    id: 'activity',
    label: 'Student activity alerts',
    desc: 'Get notified when students complete missions',
    enabled: true,
  },
  {
    id: 'quiz',
    label: 'Quiz submission alerts',
    desc: 'Receive alerts when quizzes are submitted',
    enabled: true,
  },
  {
    id: 'weekly',
    label: 'Weekly summary email',
    desc: 'Receive a weekly report of class progress',
    enabled: false,
  },
  {
    id: 'streaks',
    label: 'Streak reminders',
    desc: 'Alert when students might lose their streak',
    enabled: true,
  },
]

const initialSecurityFields = [
  { label: 'Current Password', type: 'password', value: '' },
  { label: 'New Password', type: 'password', value: '' },
  { label: 'Confirm Password', type: 'password', value: '' },
]

export const TeacherSettings = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  const [activeTab, setActiveTab] = useState('profile')
  const [familyConsent, setFamilyConsent] = useState(false)
  const [notificationPreferences, setNotificationPreferences] = useState(
    initialNotificationPreferences
  )
  const [securityFields, setSecurityFields] = useState(initialSecurityFields)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
    },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
  ]

  const handlePreferenceToggle = (id: string) => {
    setNotificationPreferences((prefs) =>
      prefs.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    )
  }

  const handleSecurityFieldChange = (label: string, value: string) => {
    setSecurityFields((fields) =>
      fields.map((field) =>
        field.label === label ? { ...field, value } : field
      )
    )
  }

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText('NGL-FAM-482X-MJ').catch(() => {})
  }

  const handleShareInvite = () => {
    navigator.clipboard
      .writeText('https://nigel.app/invite/NGL-FAM-482X-MJ')
      .catch(() => {})
  }

  return (
    <div
      className={`min-h-screen flex ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
    >
      <TeacherSidebar />
      <div className="flex-1 lg:ml-80 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <SettingsHeader
            title="Settings"
            dark={dark}
            onBack={() => navigate('/teacher-dashboard')}
          />
          <p className={`mb-10 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your account and preferences.
          </p>

          <div className="grid lg:grid-cols-4 gap-12">
            <div>
              <SettingsSidebar
                tabs={tabs}
                activeTab={activeTab}
                dark={dark}
                isDark={dark}
                onTabSelect={setActiveTab}
                onToggleTheme={toggleTheme}
                onLogout={() => navigate('/login')}
              />
            </div>

            <div className="lg:col-span-3 space-y-8">
              {activeTab === 'profile' && (
                <>
                  <TeacherProfileCard
                    dark={dark}
                    initials="YS"
                    name="Teacher Yukari Sato"
                    email="yukari.sato@school.edu"
                    fields={[
                      { label: 'Full Name', value: 'Yukari Sato' },
                      { label: 'Email', value: 'yukari.sato@school.edu' },
                      { label: 'School', value: 'Nigel Academy' },
                      { label: 'Subject', value: 'Financial Literacy' },
                    ]}
                  />
                  <TeacherFamilyConsentCard
                    dark={dark}
                    familyConsent={familyConsent}
                    onToggleConsent={() => setFamilyConsent((prev) => !prev)}
                    onCopy={handleCopyInviteCode}
                    onShare={handleShareInvite}
                    inviteCode="NGL-FAM-482X-MJ"
                  />
                </>
              )}

              {activeTab === 'notifications' && (
                <TeacherNotificationsCard
                  dark={dark}
                  preferences={notificationPreferences}
                  onToggle={handlePreferenceToggle}
                />
              )}

              {activeTab === 'security' && (
                <TeacherSecurityCard
                  dark={dark}
                  fields={securityFields}
                  onChange={handleSecurityFieldChange}
                  onSubmit={() => {}}
                />
              )}
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-12">
            Nigel Education App v1.0.0 (Build 101) · Made with love for
            Educators
          </p>
        </div>
      </div>
    </div>
  )
}
