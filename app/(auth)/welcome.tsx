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
  );
}
