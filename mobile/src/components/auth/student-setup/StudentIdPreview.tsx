import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { IdCard, Info } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface StudentIdPreviewProps {
  name: string;
  studentId: string;
  visible: boolean;
}

export function StudentIdPreview({ name, studentId, visible }: StudentIdPreviewProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  if (!visible) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12, scale: 0.95 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 14, stiffness: 130 }}
      style={{ gap: 12 }}
    >
      {/* Card */}
      <View
        style={{
          backgroundColor: theme === 'dark' ? c.muted : '#F0EDFF',
          borderRadius: 16,
          padding: 18,
          borderWidth: 1.5,
          borderColor: theme === 'dark' ? c.border : '#E0DAFF',
          borderStyle: 'dashed',
          ...Platform.select({
            ios: {
              shadowColor: c.gradientStart,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            },
            android: { elevation: 2 },
          }),
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }}
        >
          <IdCard size={18} color={c.gradientStart} strokeWidth={2} />
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 12,
              color: c.gradientStart,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            Your Student ID
          </Text>
        </View>

        {/* Name + ID row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 20,
              color: c.foreground,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>

          <View
            style={{
              backgroundColor: c.gradientStart,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 13,
                color: '#FFFFFF',
                letterSpacing: 0.8,
              }}
            >
              {studentId}
            </Text>
          </View>
        </View>
      </View>

      {/* Hint */}
      <View
        style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingHorizontal: 4 }}
      >
        <Info size={14} color={c.mutedForeground} strokeWidth={2} style={{ marginTop: 1 }} />
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 12,
            color: c.mutedForeground,
            lineHeight: 18,
            flex: 1,
          }}
        >
          Share this ID with your teacher so they can add you to their class. You can also join a
          class later in Settings.
        </Text>
      </View>
    </MotiView>
  );
}
