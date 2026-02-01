import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GraduationCap, TrendingUp, PoundSterling, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/src/components/Header';
import { StatsCarousel } from '@/src/components/StatsCarousel';
import { PrimaryButton } from '@/src/components/PrimaryButton';

const stats = [
  {
    icon: GraduationCap,
    stat: '73%',
    text: "of young adults wish they'd learned financial literacy in school",
    source: 'Money & Pensions Service 2023',
  },
  {
    icon: TrendingUp,
    stat: '65%',
    text: 'less likely to fall into debt when you learn budgeting',
    source: 'Financial Conduct Authority',
  },
  {
    icon: PoundSterling,
    stat: '15%',
    text: 'potential income boost from financial education',
    source: 'Cambridge University Study',
  },
];

export default function WelcomePage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pb-6">
          <TouchableOpacity
            onPress={() => router.push('/(auth)/role-selection')}
            className="self-end mb-6 mt-2"
            accessibilityLabel="Skip introduction"
            accessibilityHint="Proceed directly to personalization"
          >
            <Text className="text-base text-muted-foreground font-medium">Skip</Text>
          </TouchableOpacity>

          <Header />

          <View className="flex-shrink">
            <StatsCarousel stats={stats} />
          </View>

          <View className="mt-auto pt-6">
            <PrimaryButton
              onPress={() => router.push('/(auth)/role-selection')}
              title="Let's Get Started"
              icon={<ChevronRight size={22} color="#FFFFFF" />}
              accessibilityLabel="Start using Nigel"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
