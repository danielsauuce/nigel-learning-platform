import React from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import { MascotWaving } from '@/svg/illustrations';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = colors[theme];
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: c.card }}>
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
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          bounces
        >
          {/* ── Greeting row with mascot ── */}
          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120 }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 14,
                  color: c.mutedForeground,
                }}
              >
                Good morning,
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 22,
                  color: c.foreground,
                  marginTop: 2,
                }}
              >
                Sarah Hessy
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <ThemeToggle variant="pill" />
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: '#22223B',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 20 }}>👩‍🎓</Text>
              </View>
            </View>
          </MotiView>

          {/* ── Featured lesson card with Mascot ── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 100 }}
            style={{
              backgroundColor: theme === 'dark' ? c.muted : '#F8F6FB',
              borderRadius: 22,
              padding: 22,
              marginTop: 22,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 20,
                  lineHeight: 26,
                  color: c.foreground,
                }}
              >
                Budget lesson{'\n'}in 30 minutes
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push('/(student)/island-landing' as any)}
                style={{
                  marginTop: 14,
                  paddingHorizontal: 22,
                  paddingVertical: 10,
                  borderRadius: 22,
                  backgroundColor: '#22223B',
                  alignSelf: 'flex-start',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Poppins_600SemiBold',
                    fontSize: 14,
                    color: '#FFFFFF',
                  }}
                >
                  Join now
                </Text>
              </TouchableOpacity>
            </View>

            {/* Mascot waving instead of emoji */}
            <MotiView
              from={{ translateY: 0 }}
              animate={{ translateY: -6 }}
              transition={{ type: 'timing', duration: 2000, loop: true, repeatReverse: true }}
            >
              <MascotWaving size={80} />
            </MotiView>
          </MotiView>

          {/* ── Category chips ── */}
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 200 }}
            style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}
          >
            {[
              { name: 'Saving', emoji: '💰', bg: '#F3F0FF' },
              { name: 'Budgets', emoji: '📊', bg: '#FDE8E4' },
              { name: 'Earning', emoji: '💼', bg: '#FFF8E8' },
            ].map((cat, i) => (
              <MotiView
                key={cat.name}
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 16, stiffness: 140, delay: 250 + i * 60 }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 22,
                    backgroundColor: theme === 'dark' ? c.muted : cat.bg,
                  }}
                >
                  <Text style={{ fontSize: 15 }}>{cat.emoji}</Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins_500Medium',
                      fontSize: 14,
                      color: c.mutedForeground,
                    }}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </MotiView>

          {/* ── "New course" section header ── */}
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 400 }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 28,
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 20,
                color: c.foreground,
              }}
            >
              New course
            </Text>
            <TouchableOpacity onPress={() => router.push('/(student)/(tabs)/map' as any)}>
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  fontSize: 14,
                  color: '#B9A7F8',
                }}
              >
                See more
              </Text>
            </TouchableOpacity>
          </MotiView>

          {/* ── Two course cards side by side ── */}
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
            <MotiView
              from={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 480 }}
              style={{ flex: 1 }}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push('/(student)/island-landing' as any)}
                style={{
                  backgroundColor: theme === 'dark' ? c.muted : '#F9D6D0',
                  borderRadius: 22,
                  padding: 16,
                  height: 180,
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Poppins_700Bold',
                    fontSize: 16,
                    lineHeight: 22,
                    color: '#22223B',
                  }}
                >
                  Saving{'\n'}basics
                </Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 40 }}>🏦</Text>
                </View>
              </TouchableOpacity>
            </MotiView>

            <MotiView
              from={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 540 }}
              style={{ flex: 1 }}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push('/(student)/simulator' as any)}
                style={{
                  backgroundColor: theme === 'dark' ? c.muted : '#E8E0FF',
                  borderRadius: 22,
                  padding: 16,
                  height: 180,
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Poppins_700Bold',
                    fontSize: 16,
                    lineHeight: 22,
                    color: '#22223B',
                  }}
                >
                  Budget{'\n'}simulator
                </Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 38 }}>💳</Text>
                </View>
              </TouchableOpacity>
            </MotiView>
          </View>

          {/* ── Quick stats ── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 600 }}
            style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}
          >
            {[
              { emoji: '🔥', value: '12d', label: 'Streak', bg: '#FDE8E4' },
              { emoji: '💰', value: '450', label: 'Coins', bg: '#FFF8E8' },
              { emoji: '🏅', value: '#4', label: 'Rank', bg: '#F3F0FF' },
            ].map((stat) => (
              <View
                key={stat.label}
                style={{
                  flex: 1,
                  backgroundColor: theme === 'dark' ? c.muted : stat.bg,
                  borderRadius: 18,
                  paddingVertical: 14,
                  alignItems: 'center',
                  ...Platform.select({
                    ios: {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.04,
                      shadowRadius: 6,
                    },
                    android: { elevation: 2 },
                  }),
                }}
              >
                <Text style={{ fontSize: 18, marginBottom: 4 }}>{stat.emoji}</Text>
                <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 17, color: c.foreground }}>
                  {stat.value}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 11,
                    color: c.mutedForeground,
                    marginTop: 2,
                  }}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </MotiView>

          {/* ── Daily challenge dark card ── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 700 }}
            style={{
              backgroundColor: '#22223B',
              borderRadius: 22,
              padding: 20,
              marginTop: 20,
              ...Platform.select({
                ios: {
                  shadowColor: '#22223B',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.2,
                  shadowRadius: 14,
                },
                android: { elevation: 6 },
              }),
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Text style={{ fontSize: 14 }}>⚡</Text>
              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 11,
                  color: '#F7E6B6',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                Daily Challenge
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 17,
                color: '#FFFFFF',
                marginBottom: 6,
              }}
            >
              Budget Builder Challenge
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 20,
                marginBottom: 16,
              }}
            >
              Allocate your monthly income using the 50/30/20 rule!
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 12 }}>⏱</Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins_500Medium',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    5 Mins
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 12 }}>✨</Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins_500Medium',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    50 XP
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push('/(student)/daily-challenge' as any)}
                style={{
                  backgroundColor: '#B9A7F8',
                  paddingHorizontal: 22,
                  paddingVertical: 10,
                  borderRadius: 20,
                }}
              >
                <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 13, color: '#FFFFFF' }}>
                  Start
                </Text>
              </TouchableOpacity>
            </View>
          </MotiView>

          {/* ── Achievements ── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 800 }}
            style={{ marginTop: 24 }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: c.foreground }}>
                Achievements
              </Text>
              <TouchableOpacity onPress={() => router.push('/(student)/progress-stats' as any)}>
                <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14, color: '#B9A7F8' }}>
                  See more
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {[
                { emoji: '🔥', label: 'Early Bird' },
                { emoji: '💰', label: 'Saver' },
                { emoji: '🏆', label: 'Champion' },
                { emoji: '⭐', label: 'Goal Setter' },
              ].map((badge) => (
                <View
                  key={badge.label}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: theme === 'dark' ? c.muted : c.card,
                    borderRadius: 18,
                    paddingVertical: 14,
                    paddingHorizontal: 4,
                    ...Platform.select({
                      ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.04,
                        shadowRadius: 6,
                      },
                      android: { elevation: 2 },
                    }),
                  }}
                >
                  <Text style={{ fontSize: 22, marginBottom: 4 }}>{badge.emoji}</Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins_500Medium',
                      fontSize: 10,
                      color: c.mutedForeground,
                      textAlign: 'center',
                    }}
                    numberOfLines={1}
                  >
                    {badge.label}
                  </Text>
                </View>
              ))}
            </View>
          </MotiView>

          {/* ── Pro tip banner ── */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 900 }}
            style={{
              backgroundColor: theme === 'dark' ? c.muted : '#FDE8E4',
              borderRadius: 18,
              padding: 18,
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 12,
            }}
          >
            <Text style={{ fontSize: 20 }}>💡</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 14,
                  color: '#22223B',
                  marginBottom: 4,
                }}
              >
                Pro Tip: 50/30/20 Rule
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 12.5,
                  color: '#6C6C80',
                  lineHeight: 19,
                }}
              >
                Divide your income into Needs (50%), Wants (30%), and Savings (20%).
              </Text>
            </View>
          </MotiView>
        </ScrollView>
      </MotiView>
    </View>
  );
}
