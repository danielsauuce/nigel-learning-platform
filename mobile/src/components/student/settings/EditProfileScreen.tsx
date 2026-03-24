import React, { useState } from 'react';
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ChevronLeft, Camera, PiggyBank, Flame, Star, Lightbulb } from 'lucide-react-native';
import { ScreenWrapper, GradientButton } from '@/components/ui';
import { Mascot } from '@/svg/illustrations';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

export function EditProfileScreen() {
  const { theme } = useTheme();
  const c = colors[theme];
  const router = useRouter();

  const [name, setName] = useState('Sarah Hessy');
  const [username, setUsername] = useState('sarah_learns');
  const [age, setAge] = useState('12');
  const [school, setSchool] = useState('Riverside Academy');

  const inputStyle = {
    backgroundColor: theme === 'dark' ? c.card : '#F8F6FB',
    borderRadius: 14,
    padding: 14,
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: c.foreground,
    borderWidth: 1,
    borderColor: theme === 'dark' ? c.border : '#E8E4F0',
  };

  const labelStyle = {
    fontFamily: 'Poppins_600SemiBold' as const,
    fontSize: 13,
    color: c.mutedForeground,
    marginBottom: 6,
    marginTop: 16,
  };

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={{ position: 'absolute', left: 20, padding: 4 }}
          >
            <ChevronLeft size={24} color={c.foreground} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: c.foreground }}>
            Edit Profile
          </Text>
        </View>

        {/* Avatar section with mascot */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110, delay: 100 }}
          style={{ alignItems: 'center', marginBottom: 8 }}
        >
          <View style={{ position: 'relative' }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 32,
                backgroundColor: '#B9A7F8',
                alignItems: 'center',
                justifyContent: 'center',
                ...Platform.select({
                  ios: {
                    shadowColor: '#B9A7F8',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                  },
                  android: { elevation: 6 },
                }),
              }}
            >
              <Mascot size={65} />
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: -4,
                right: -4,
                backgroundColor: c.card,
                width: 32,
                height: 32,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                borderColor: c.background,
              }}
            >
              <Camera size={14} color={c.primary} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 16,
              color: c.foreground,
              marginTop: 12,
            }}
          >
            {name}
          </Text>
          <Text
            style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: c.mutedForeground }}
          >
            @{username}
          </Text>
        </MotiView>

        {/* Form fields */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={labelStyle}>Full Name</Text>
          <TextInput
            style={inputStyle}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={c.mutedForeground}
          />

          <Text style={labelStyle}>Username</Text>
          <TextInput
            style={inputStyle}
            value={username}
            onChangeText={setUsername}
            placeholder="@username"
            placeholderTextColor={c.mutedForeground}
            autoCapitalize="none"
          />

          <Text style={labelStyle}>Age</Text>
          <TextInput
            style={inputStyle}
            value={age}
            onChangeText={setAge}
            placeholder="Your age"
            keyboardType="number-pad"
            placeholderTextColor={c.mutedForeground}
          />

          <Text style={labelStyle}>School</Text>
          <TextInput
            style={inputStyle}
            value={school}
            onChangeText={setSchool}
            placeholder="Your school"
            placeholderTextColor={c.mutedForeground}
          />

          {/* Avatar choice */}
          <Text style={labelStyle}>Choose Your Mascot Style</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 4 }}>
            {[
              { key: 'piggy', icon: <PiggyBank size={24} color="#EC4899" strokeWidth={1.5} /> },
              { key: 'flame', icon: <Flame size={24} color="#F97316" strokeWidth={1.5} /> },
              { key: 'star', icon: <Star size={24} color="#B9A7F8" strokeWidth={1.5} /> },
              { key: 'light', icon: <Lightbulb size={24} color="#F59E0B" strokeWidth={1.5} /> },
            ].map((option, i) => (
              <TouchableOpacity
                key={option.key}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor:
                    i === 0 ? `${c.primary}25` : theme === 'dark' ? c.card : c.background,
                  borderWidth: i === 0 ? 2 : 1,
                  borderColor: i === 0 ? c.primary : c.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {option.icon}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
        <GradientButton
          label="Save Changes"
          variant="primary"
          onPress={() => router.back()}
          showArrow={false}
        />
      </View>
    </ScreenWrapper>
  );
}
