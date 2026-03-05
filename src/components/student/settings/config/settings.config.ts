import { User, Bell, Moon, Volume2, Share2, HelpCircle, Shield, LogOut } from 'lucide-react-native';

export const settingsConfig = [
  {
    title: 'Account',
    items: [
      {
        label: 'Profile',
        subtitle: 'Name, age, avatar',
        icon: User,
      },
      {
        label: 'Share with Family',
        subtitle: 'Generate progress link',
        icon: Share2,
      },
    ],
  },

  {
    title: 'Preferences',
    items: [
      {
        label: 'Notifications',
        icon: Bell,
        type: 'switch',
        state: 'notifications',
      },
      {
        label: 'Dark Mode',
        icon: Moon,
        type: 'switch',
        state: 'darkMode',
      },
      {
        label: 'Sound Effects',
        icon: Volume2,
        type: 'switch',
        state: 'soundEffects',
      },
    ],
  },

  {
    title: 'Support',
    items: [
      {
        label: 'Help Centre',
        icon: HelpCircle,
      },
      {
        label: 'Privacy Policy',
        icon: Shield,
      },
    ],
  },

  {
    title: 'Danger',
    items: [
      {
        label: 'Log Out',
        icon: LogOut,
        danger: true,
      },
    ],
  },
];
