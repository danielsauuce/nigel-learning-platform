import React, { useState } from 'react';
import { ScrollView, Switch } from 'react-native';
import { settingsConfig } from '@/components/student/settings/config/settings.config';
import { SettingRow, SettingSection } from '@/components/student/settings/SettingSection';

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const stateMap = {
    notifications: [notifications, setNotifications],
    darkMode: [darkMode, setDarkMode],
    soundEffects: [soundEffects, setSoundEffects],
  };

  return (
    <ScrollView>
      {settingsConfig.map((section, index) => (
        <SettingSection key={section.title} title={section.title} index={index}>
          {section.items.map((item, i) => {
            const Icon = item.icon;

            let trailing = null;

            if (item.type === 'switch' && item.state) {
              const [value, setValue] = stateMap[item.state];

              trailing = <Switch value={value} onValueChange={setValue} />;
            }

            return (
              <SettingRow
                key={item.label}
                label={item.label}
                subtitle={item.subtitle}
                icon={<Icon size={18} color="rgb(108,92,231)" />}
                trailing={trailing}
                danger={item.danger}
              />
            );
          })}
        </SettingSection>
      ))}
    </ScrollView>
  );
}
