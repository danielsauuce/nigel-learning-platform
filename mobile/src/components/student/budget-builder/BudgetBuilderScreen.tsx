import React, { useCallback, useMemo, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import {
  Mascot,
  MascotThinking,
  MascotCelebrating,
  MascotSad,
  MascotWaving,
} from '@/svg/illustrations';
import {
  ChevronLeft,
  RotateCcw,
  Home,
  ShoppingCart,
  Bus,
  Gamepad2,
  PiggyBank,
  AlertTriangle,
  Lock,
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

const TAKE_HOME = 2195;

interface BudgetCategory {
  key: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  max: number;
  step: number;
  recommended: number;
  value: number;
  tip: string;
}

function createCategories(): BudgetCategory[] {
  return [
    {
      key: 'rent',
      label: 'Rent & Bills',
      icon: <Home size={20} color="#B9A7F8" strokeWidth={2} />,
      color: '#B9A7F8',
      max: 1200,
      step: 25,
      recommended: 770,
      value: 0,
      tip: 'Try to keep housing under 35% of your income!',
    },
    {
      key: 'food',
      label: 'Food & Groceries',
      icon: <ShoppingCart size={20} color="#4CAF50" strokeWidth={2} />,
      color: '#4CAF50',
      max: 600,
      step: 10,
      recommended: 330,
      value: 0,
      tip: 'Meal planning can save you £50+ per month.',
    },
    {
      key: 'transport',
      label: 'Transport',
      icon: <Bus size={20} color="#2196F3" strokeWidth={2} />,
      color: '#2196F3',
      max: 400,
      step: 10,
      recommended: 175,
      value: 0,
      tip: 'Walking or cycling saves money AND is healthy!',
    },
    {
      key: 'fun',
      label: 'Fun & Social',
      icon: <Gamepad2 size={20} color="#FF9800" strokeWidth={2} />,
      color: '#FF9800',
      max: 500,
      step: 10,
      recommended: 220,
      value: 0,
      tip: "Budget for fun so you don't feel deprived.",
    },
    {
      key: 'savings',
      label: 'Savings',
      icon: <PiggyBank size={20} color="#E91E63" strokeWidth={2} />,
      color: '#E91E63',
      max: 800,
      step: 25,
      recommended: 440,
      value: 0,
      tip: 'Pay yourself first — even £10 counts!',
    },
    {
      key: 'other',
      label: 'Emergency',
      icon: <AlertTriangle size={20} color="#9C27B0" strokeWidth={2} />,
      color: '#9C27B0',
      max: 400,
      step: 10,
      recommended: 110,
      value: 0,
      tip: 'Emergency funds prevent debt spirals.',
    },
  ];
}

function SliderBar({
  value,
  max,
  color,
  onChange,
}: {
  value: number;
  max: number;
  color: string;
  onChange: (v: number) => void;
}) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <TouchableOpacity
        onPress={() => onChange(Math.max(0, value - 25))}
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          backgroundColor: color + '20',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 18, color, fontWeight: '700' }}>−</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, height: 12, borderRadius: 6, backgroundColor: color + '20' }}>
        <View
          style={{
            width: `${percent}%` as any,
            height: 12,
            borderRadius: 6,
            backgroundColor: color,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => onChange(Math.min(max, value + 25))}
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          backgroundColor: color + '20',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 18, color, fontWeight: '700' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export function BudgetBuilderScreen() {
  const { theme } = useTheme();
  const c = colors[theme];
  const router = useRouter();
  const [categories, setCategories] = useState<BudgetCategory[]>(createCategories);
  const [showTip, setShowTip] = useState<string | null>(null);

  const totalAllocated = useMemo(
    () => categories.reduce((s, cat) => s + cat.value, 0),
    [categories],
  );
  const remaining = TAKE_HOME - totalAllocated;
  const savingsAmount = categories.find((cat) => cat.key === 'savings')?.value ?? 0;
  const percent = Math.min(Math.round((totalAllocated / TAKE_HOME) * 100), 100);

  const handleChange = useCallback((key: string, value: number) => {
    setCategories((prev) => prev.map((cat) => (cat.key === key ? { ...cat, value } : cat)));
  }, []);

  const handleReset = useCallback(() => {
    setCategories(createCategories());
    setShowTip(null);
  }, []);

  // Dynamic mascot based on budget state
  const getMascotAndMessage = () => {
    if (totalAllocated === 0)
      return {
        mascot: <MascotWaving size={60} />,
        msg: "Let's build your budget! Tap + to allocate money.",
        mood: 'wave',
      };
    if (remaining < 0)
      return {
        mascot: <MascotSad size={60} />,
        msg: `Oops! You're £${Math.abs(remaining)} over budget. Reduce some categories.`,
        mood: 'sad',
      };
    if (remaining === 0 && savingsAmount > 0)
      return {
        mascot: <MascotCelebrating size={60} />,
        msg: "Perfect budget! You've allocated everything wisely! 🎉",
        mood: 'celebrate',
      };
    if (remaining === 0 && savingsAmount === 0)
      return {
        mascot: <MascotThinking size={60} />,
        msg: "Budget's full but no savings — try to save at least a little!",
        mood: 'think',
      };
    if (savingsAmount === 0 && totalAllocated > TAKE_HOME * 0.5)
      return {
        mascot: <MascotThinking size={60} />,
        msg: "Don't forget to save! Even a small amount helps.",
        mood: 'think',
      };
    return {
      mascot: <MascotThinking size={60} />,
      msg: `£${remaining} left to allocate. Keep going!`,
      mood: 'think',
    };
  };

  const { mascot, msg, mood } = getMascotAndMessage();

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={{ padding: 4 }}
          >
            <ChevronLeft size={24} color={c.foreground} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Fredoka_700Bold', fontSize: 22, color: c.foreground }}>
            Budget Builder
          </Text>
          <TouchableOpacity
            onPress={handleReset}
            activeOpacity={0.7}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
          >
            <RotateCcw size={15} color={c.mutedForeground} strokeWidth={2} />
            <Text
              style={{ fontFamily: 'Poppins_500Medium', fontSize: 12, color: c.mutedForeground }}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        {/* Mascot advisor card */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110 }}
          style={{ paddingHorizontal: 20, marginBottom: 20 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
              padding: 16,
              borderRadius: 20,
              backgroundColor:
                mood === 'sad'
                  ? '#FDE8E8'
                  : mood === 'celebrate'
                    ? '#E8F5E9'
                    : theme === 'dark'
                      ? c.card
                      : '#F3F0FF',
              borderWidth: 1.5,
              borderColor:
                mood === 'sad' ? '#F4A0A0' : mood === 'celebrate' ? '#A5D6A7' : '#B9A7F830',
            }}
          >
            {mascot}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: 'Poppins_600SemiBold',
                  fontSize: 13,
                  color: c.foreground,
                  lineHeight: 20,
                }}
              >
                {msg}
              </Text>
            </View>
          </View>
        </MotiView>

        {/* Income & balance overview */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View
            style={{
              borderRadius: 20,
              padding: 20,
              backgroundColor: theme === 'dark' ? c.card : '#FFFFFF',
              borderWidth: 1,
              borderColor: theme === 'dark' ? c.border : '#F0EDF5',
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.06,
                  shadowRadius: 10,
                },
                android: { elevation: 2 },
              }),
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 11,
                    color: c.mutedForeground,
                  }}
                >
                  Take-Home Pay
                </Text>
                <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 24, color: c.foreground }}>
                  £{TAKE_HOME.toLocaleString()}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text
                  style={{
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 11,
                    color: remaining < 0 ? '#F44336' : c.mutedForeground,
                  }}
                >
                  Remaining
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins_700Bold',
                    fontSize: 24,
                    color: remaining < 0 ? '#F44336' : remaining === 0 ? '#4CAF50' : c.foreground,
                  }}
                >
                  £{Math.abs(remaining).toLocaleString()}
                </Text>
              </View>
            </View>
            {/* Overall bar */}
            <View style={{ height: 10, borderRadius: 5, backgroundColor: c.border }}>
              <View
                style={{
                  height: 10,
                  borderRadius: 5,
                  width: `${Math.min(percent, 100)}%` as any,
                  backgroundColor:
                    remaining < 0 ? '#F44336' : remaining === 0 ? '#4CAF50' : '#B9A7F8',
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 11,
                color: c.mutedForeground,
                textAlign: 'center',
                marginTop: 6,
              }}
            >
              {percent}% allocated
            </Text>
          </View>
        </View>

        {/* Category sliders */}
        <View style={{ paddingHorizontal: 20 }}>
          {categories.map((cat, idx) => (
            <MotiView
              key={cat.key}
              from={{ opacity: 0, translateY: 12 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 100 + idx * 60 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowTip(showTip === cat.key ? null : cat.key)}
                style={{
                  backgroundColor: theme === 'dark' ? c.card : '#FFFFFF',
                  borderRadius: 18,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: theme === 'dark' ? c.border : '#F0EDF5',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        backgroundColor: cat.color + '18',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {cat.icon}
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Poppins_600SemiBold',
                          fontSize: 14,
                          color: c.foreground,
                        }}
                      >
                        {cat.label}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins_400Regular',
                          fontSize: 10,
                          color: c.mutedForeground,
                        }}
                      >
                        Suggested: £{cat.recommended}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Poppins_700Bold',
                      fontSize: 18,
                      color: cat.value > 0 ? cat.color : c.mutedForeground,
                    }}
                  >
                    £{cat.value}
                  </Text>
                </View>

                <SliderBar
                  value={cat.value}
                  max={cat.max}
                  color={cat.color}
                  onChange={(v) => handleChange(cat.key, v)}
                />

                {/* Mascot tip */}
                {showTip === cat.key && (
                  <MotiView
                    from={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' as any }}
                    transition={{ type: 'timing', duration: 250 }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      marginTop: 12,
                      paddingTop: 12,
                      borderTopWidth: 1,
                      borderTopColor: c.border,
                    }}
                  >
                    <Mascot size={32} />
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: 'Poppins_400Regular',
                        fontSize: 12,
                        color: c.mutedForeground,
                        lineHeight: 18,
                      }}
                    >
                      {cat.tip}
                    </Text>
                  </MotiView>
                )}
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>

        {/* Breakdown visualization */}
        {totalAllocated > 0 && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 300 }}
            style={{ paddingHorizontal: 20, marginTop: 8 }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 14,
                color: c.foreground,
                marginBottom: 10,
              }}
            >
              Breakdown
            </Text>
            <View style={{ flexDirection: 'row', height: 16, borderRadius: 8, overflow: 'hidden' }}>
              {categories
                .filter((cat) => cat.value > 0)
                .map((cat) => (
                  <View
                    key={cat.key}
                    style={{ flex: cat.value, backgroundColor: cat.color, height: 16 }}
                  />
                ))}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 10 }}>
              {categories
                .filter((cat) => cat.value > 0)
                .map((cat) => (
                  <View
                    key={cat.key}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                  >
                    <View
                      style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: cat.color }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      {cat.icon}
                      <Text
                        style={{
                          fontFamily: 'Poppins_400Regular',
                          fontSize: 11,
                          color: c.mutedForeground,
                        }}
                      >
                        {Math.round((cat.value / TAKE_HOME) * 100)}%
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          </MotiView>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
        <GradientButton
          label="Lock In Budget"
          variant="primary"
          onPress={() => router.push('/(student)/life-event' as any)}
          disabled={totalAllocated === 0 || remaining < 0}
        />
      </View>
    </ScreenWrapper>
  );
}
