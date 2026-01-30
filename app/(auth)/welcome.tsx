import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GraduationCap, TrendingUp, PoundSterling, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/src/components/Header';
import { StatsCarousel } from '@/src/components/StatsCarousel';
import { IconButton } from '@/src/components/IconButton';

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
    <SafeAreaView className="flex-1 bg-background px-6 pb-6">
      <TouchableOpacity
        onPress={() => router.push('/personalization')}
        className="self-end mb-8"
        accessibilityLabel="Skip introduction"
        accessibilityHint="Proceed directly to personalization"
      >
        <Text className="text-xl text-muted-foreground font-medium no-underline">Skip</Text>
      </TouchableOpacity>

      <Header />

      <StatsCarousel stats={stats} />

      <View className="mt-auto">
        <IconButton
          onPress={() => router.push('/personalization')}
          positionClassName="bg-primary rounded-2xl py-5 px-8 items-center justify-center shadow-2xl"
          accessibilityLabel="Start using Nigel"
          icon={
            <View className="flex-row items-center">
              <Text className="text-white text-xl font-semibold mr-3">Let's Get Started</Text>
              <ChevronRight size={24} color="#FFFFFF" />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
