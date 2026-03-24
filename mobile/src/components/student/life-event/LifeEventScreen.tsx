import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import {
  Zap,
  Smartphone,
  Bike,
  Cake,
  Plane,
  Briefcase,
  PawPrint,
  Dice6,
} from 'lucide-react-native';
import { LifeEventReveal, type LifeEvent } from './LifeEventReveal';

const LIFE_EVENTS: LifeEvent[] = [
  {
    key: 'phone_repair',
    icon: <Smartphone size={40} color="#6366F1" strokeWidth={1.5} />,
    title: 'Cracked Phone Screen!',
    description:
      'You dropped your phone on the way to school. The repair costs £120 — do you have enough saved?',
    amount: 120,
    type: 'expense',
    tip: 'This is why an emergency fund matters! Even £50 set aside can help cover surprises like this.',
  },
  {
    key: 'bike_stolen',
    icon: <Bike size={40} color="#EF4444" strokeWidth={1.5} />,
    title: 'Bike Got Stolen!',
    description:
      'Your bike was taken from outside the shop. A replacement will cost £200. Time to dip into savings.',
    amount: 200,
    type: 'expense',
    tip: 'Insurance and locks help, but having savings is your real safety net when things go wrong.',
  },
  {
    key: 'birthday_money',
    icon: <Cake size={40} color="#10B981" strokeWidth={1.5} />,
    title: 'Birthday Cash!',
    description:
      'Happy birthday! Your grandparents sent you £75. What will you do — spend it or save it?',
    amount: 75,
    type: 'windfall',
    tip: 'A good rule: save at least half of any unexpected money. Your future self will thank you!',
  },
  {
    key: 'school_trip',
    icon: <Plane size={40} color="#F59E0B" strokeWidth={1.5} />,
    title: 'School Trip Announced!',
    description:
      "There's an amazing school trip to Paris next term. The deposit is £150 and it's due in 2 weeks.",
    amount: 150,
    type: 'expense',
    tip: "Planning ahead for big expenses means you won't need to scramble at the last minute.",
  },
  {
    key: 'side_hustle',
    icon: <Briefcase size={40} color="#10B981" strokeWidth={1.5} />,
    title: 'Side Hustle Paid Off!',
    description: 'Your weekend car-washing business earned you an extra £95 this month. Nice work!',
    amount: 95,
    type: 'windfall',
    tip: 'Earning extra income is great! Consider putting some towards savings and some towards fun.',
  },
  {
    key: 'pet_vet',
    icon: <PawPrint size={40} color="#EF4444" strokeWidth={1.5} />,
    title: 'Pet Needs the Vet!',
    description: "Your dog isn't feeling well and needs a vet visit. The bill comes to £85.",
    amount: 85,
    type: 'expense',
    tip: 'Pet costs are often unexpected. Responsible pet owners budget for vet visits in advance.',
  },
];

export function LifeEventScreen() {
  const router = useRouter();
  const [revealed, setRevealed] = useState(false);

  const event = useMemo(() => LIFE_EVENTS[Math.floor(Math.random() * LIFE_EVENTS.length)], []);

  const handleReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  const handleContinue = useCallback(() => {
    router.push('/(student)/sim-results' as any);
  }, [router]);

  return (
    <ScreenWrapper topPadding={16} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 130 }}
          className="mb-6 items-center px-6"
        >
          <View className="mb-4 flex-row items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
            <Zap size={14} color="#B9A7F8" strokeWidth={2.5} />
            <Text className="font-poppins-bold text-xs uppercase tracking-wider text-primary">
              Life Happens!
            </Text>
          </View>
          <Text className="mb-2 text-center font-fredoka text-2xl text-foreground">
            Random Life Event
          </Text>
          <Text className="text-center font-poppins-regular text-sm leading-5 text-muted-foreground">
            Real life throws curveballs. Let's see how your budget holds up!
          </Text>
        </MotiView>

        {!revealed ? (
          /* Mystery card before reveal */
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 200 }}
            className="px-6"
          >
            <View className="items-center rounded-3xl border-2 border-dashed border-primary/30 bg-card py-16">
              <MotiView
                from={{ rotateZ: '0deg' }}
                animate={{ rotateZ: ['0deg', '-8deg', '8deg', '-4deg', '0deg'] }}
                transition={{
                  type: 'timing',
                  duration: 600,
                  loop: true,
                  repeatReverse: false,
                  delay: 500,
                }}
                style={{ marginBottom: 16 }}
              >
                <Dice6 size={60} color="#B9A7F8" strokeWidth={1.5} />
              </MotiView>
              <Text className="mb-1 font-poppins-semibold text-base text-foreground">
                What will happen?
              </Text>
              <Text className="font-poppins-regular text-xs text-muted-foreground">
                Tap below to find out...
              </Text>
            </View>
          </MotiView>
        ) : (
          <LifeEventReveal event={event} />
        )}
      </ScrollView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: revealed ? 1200 : 300 }}
      >
        <View className="px-6 pt-2">
          {!revealed ? (
            <GradientButton
              label="Roll the Dice"
              variant="purple"
              onPress={handleReveal}
              showArrow={false}
            />
          ) : (
            <GradientButton
              label="See My Results"
              variant="purple"
              onPress={handleContinue}
              showArrow
            />
          )}
        </View>
      </MotiView>
    </ScreenWrapper>
  );
}
