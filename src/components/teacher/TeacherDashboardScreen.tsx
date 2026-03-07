import { View, ScrollView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { useTheme } from '@/context';
import { TeacherHeader } from './TeacherHeader';
import { StatCard } from './StatCard';
import { QuickTools } from './QuickTools';
import { RecentActivity } from './RecentActivity';
import { StudentDirectory } from './StudentDirectory';

export function TeacherDashboardScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View className="flex-1 bg-background">
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400 }}
        style={{ flex: 1, paddingTop: insets.top + 8 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <TeacherHeader />

          <StatCard />

          <QuickTools />

          <RecentActivity />

          <StudentDirectory />
        </ScrollView>
      </MotiView>
    </View>
  );
}
