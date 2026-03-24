export const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      {
        key: 'profile',
        icon: 'user',
        label: 'Edit Profile',
        subtitle: 'Name, avatar, and preferences',
      },
      {
        key: 'privacy',
        icon: 'lock',
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
        icon: 'bell',
        label: 'Notifications',
        subtitle: 'Reminders and alerts',
      },
      {
        key: 'appearance',
        icon: 'palette',
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
        icon: 'help',
        label: 'Help & Support',
        subtitle: 'FAQs and contact us',
      },
      {
        key: 'feedback',
        icon: 'feedback',
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
        icon: 'logout',
        label: 'Log Out',
        subtitle: 'Sign out of your account',
      },
    ],
  },
];
