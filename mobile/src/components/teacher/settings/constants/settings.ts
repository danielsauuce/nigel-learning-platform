import { Bell, Globe, Shield, Moon, Sun, HelpCircle, FileText, LogOut } from 'lucide-react-native';

export type SettingItemType = 'row' | 'switch';

export interface SettingItem {
  key: string;
  label: string;
  subtitle?: string;
  icon: any;
  type?: SettingItemType;
  stateKey?: string;
  danger?: boolean;
  trailing?: 'language';
}

export interface SettingsSectionConfig {
  title: string;
  items: SettingItem[];
}

export const GENERAL_SETTINGS: SettingItem[] = [
  {
    key: 'notifications',
    label: 'Notifications',
    subtitle: 'Manage alerts, streaks, and updates',
    icon: Bell,
    type: 'switch',
    stateKey: 'notifications',
  },
  {
    key: 'language',
    label: 'App Language',
    subtitle: 'Currently set to English (US)',
    icon: Globe,
    trailing: 'language',
  },
  {
    key: 'privacy',
    label: 'Privacy & Data',
    subtitle: 'Your data control and visibility',
    icon: Shield,
  },
];

export const APPEARANCE_SETTINGS: SettingItem[] = [
  {
    key: 'darkMode',
    label: 'Dark Mode',
    icon: Moon,
    type: 'switch',
    stateKey: 'darkMode',
  },
];

export const SUPPORT_SETTINGS: SettingItem[] = [
  {
    key: 'help',
    label: 'Help Center',
    subtitle: 'Guides, tutorials and contact us',
    icon: HelpCircle,
  },
  {
    key: 'privacyPolicy',
    label: 'Privacy Policy',
    icon: FileText,
  },
  {
    key: 'logout',
    label: 'Logout',
    icon: LogOut,
    danger: true,
  },
];

export const APP_VERSION = 'Nigel Education App v1.0.0 (Build 101)';
export const APP_TAGLINE = 'MADE WITH LOVE FOR EDUCATORS';
