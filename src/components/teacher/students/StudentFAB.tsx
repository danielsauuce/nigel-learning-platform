import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { Plus, Import, UserPlus } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

export function StudentFAB() {
  const [open, setOpen] = useState(false);

  const { theme } = useTheme();
  const c = colors[theme];

  const insets = useSafeAreaInsets();

  return (
    <View className="absolute bottom-6 right-6" style={{ marginBottom: insets.bottom }}>
      {open && (
        <MotiView
          from={{ opacity: 0, scale: 0.8, translateY: 10 }}
          animate={{ opacity: 1, scale: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 120 }}
          className="mb-3"
        >
          <View
            className="overflow-hidden rounded-xl border border-border bg-card"
            style={Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
              },
              android: { elevation: 8 },
            })}
          >
            {/* Import */}
            <TouchableOpacity activeOpacity={0.7}>
              <View className="flex-row items-center gap-2.5 border-b border-border px-4 py-3">
                <Import size={16} color={c.foreground} strokeWidth={2} />
                <Text className="font-poppins-medium text-sm text-foreground">Import</Text>
              </View>
            </TouchableOpacity>

            {/* Add Student */}
            <TouchableOpacity activeOpacity={0.7}>
              <View className="flex-row items-center gap-2.5 px-4 py-3">
                <UserPlus size={16} color={c.foreground} strokeWidth={2} />
                <Text className="font-poppins-medium text-sm text-foreground">New Student</Text>
              </View>
            </TouchableOpacity>
          </View>
        </MotiView>
      )}

      {/* FAB Button */}
      <TouchableOpacity activeOpacity={0.85} onPress={() => setOpen(!open)}>
        <MotiView
          animate={{ rotateZ: open ? '45deg' : '0deg' }}
          transition={{ type: 'spring', damping: 14, stiffness: 120 }}
        >
          <View
            className="h-14 w-14 items-center justify-center rounded-full bg-primary"
            style={Platform.select({
              ios: {
                shadowColor: c.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
              },
              android: { elevation: 6 },
            })}
          >
            <Plus size={24} color="#FFF" strokeWidth={2.5} />
          </View>
        </MotiView>
      </TouchableOpacity>
    </View>
  );
}
