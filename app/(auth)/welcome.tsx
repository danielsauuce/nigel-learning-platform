<<<<<<< HEAD
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
=======
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, StatusBar, View, ViewToken } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { ONBOARDING_SLIDES, SCREEN_WIDTH } from '@/constants/app';
import { useTheme } from '@/context';
import { WelcomeHeader } from '@/components/auth/welcome/WelcomeHeader';
import { WelcomeSlide } from '@/components/auth/welcome/WelcomeSlide';
import { WelcomeFooter } from '@/components/auth/welcome/WelcomeFooter';

export default function WelcomeRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = colors[theme];

  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Viewability tracking
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const goToRoleSelect = useCallback(() => {
    router.replace('/(auth)/role-select' as any);
  }, [router]);

  const handleNext = useCallback(() => {
    if (activeIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      goToRoleSelect();
    }
  }, [activeIndex, goToRoleSelect]);

  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* background circles at the right top side and left bottom */}
      <View
        style={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 260,
          height: 260,
          borderRadius: 130,
          backgroundColor: `${c.gradientEnd}0C`,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: `${c.gradientEnd}08`,
        }}
      />

      {/* Content */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400 }}
        style={{
          flex: 1,
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 16,
        }}
      >
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <WelcomeHeader />
        </View>

        {/* Carousel */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <FlatList
            ref={flatListRef}
            data={ONBOARDING_SLIDES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            keyExtractor={(_, i) => `slide-${i}`}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            renderItem={({ item, index }) => (
              <WelcomeSlide
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                accentColor={item.accentColor}
                isActive={index === activeIndex}
              />
            )}
          />
        </View>

        <View style={{ paddingHorizontal: 32 }}>
          <WelcomeFooter
            totalSlides={ONBOARDING_SLIDES.length}
            activeIndex={activeIndex}
            isLastSlide={isLastSlide}
            onNext={handleNext}
            onSkip={goToRoleSelect}
          />
        </View>
      </MotiView>
    </View>
>>>>>>> v5
  );
}
