import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { Copy, Lock, Share2, Users } from 'lucide-react-native';

interface FamilySharingCardProps {
  consent: boolean;
  onToggleConsent: () => void;
  primaryColor: string;
  foregroundColor: string;
}

export function FamilySharingCard({
  consent,
  onToggleConsent,
  primaryColor,
  foregroundColor,
}: FamilySharingCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 360 }}
      className="mx-6 mb-5"
    >
      <Text className="mb-2 font-poppins-bold text-xs uppercase tracking-wider text-muted-foreground">
        Family & Sharing
      </Text>
      <View
        className="rounded-2xl border border-primary/15 bg-card px-5 py-4"
        style={Platform.select({
          ios: {
            shadowColor: primaryColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
          },
          android: { elevation: 2 },
        })}
      >
        {/* Share header */}
        <View className="mb-2 flex-row items-center gap-2.5">
          <View className="bg-primary/8 h-9 w-9 items-center justify-center rounded-xl">
            <Users size={16} color={primaryColor} strokeWidth={2} />
          </View>
          <Text className="font-poppins-bold text-base text-foreground">Share Progress</Text>
        </View>

        <Text className="mb-3 font-poppins-regular text-xs leading-4 text-muted-foreground">
          Invite parents to track student progress and celebrate milestones together.
        </Text>

        {/* Consent card */}
        <TouchableOpacity activeOpacity={0.7} onPress={onToggleConsent}>
          <View className="mb-3 flex-row items-start gap-3 rounded-xl border border-border bg-muted/50 p-3">
            <View className="flex-1">
              <Text className="mb-0.5 font-poppins-bold text-xs text-foreground">
                I consent to share my data
              </Text>
              <Text className="leading-3.5 font-poppins-regular text-[10px] text-muted-foreground">
                By checking this, you allow invited family members to see daily activity, XP, and
                lesson completion status.
              </Text>
            </View>
            <View
              className={`mt-0.5 h-5 w-5 items-center justify-center rounded-md border-2 ${
                consent ? 'border-primary bg-primary' : 'border-border'
              }`}
            >
              {consent && <Text className="text-[9px] font-bold text-white">✓</Text>}
            </View>
          </View>
        </TouchableOpacity>

        {/* Invite code (revealed on consent) */}
        {consent && (
          <MotiView
            from={{ opacity: 0, translateY: 6 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120 }}
          >
            <Text className="mb-1.5 font-poppins-bold text-[10px] uppercase tracking-wider text-muted-foreground">
              Family Invite Code
            </Text>
            <View className="mb-3 flex-row items-center gap-2">
              <View className="flex-1 flex-row items-center gap-2 rounded-xl border border-primary/15 bg-primary/5 px-3 py-2.5">
                <Lock size={14} color={primaryColor} strokeWidth={2} />
                <Text
                  className="font-poppins-bold text-sm tracking-wider"
                  style={{ color: primaryColor }}
                >
                  NGL-FAM-482X-MJ
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <View className="h-10 w-10 items-center justify-center rounded-xl border border-border">
                  <Copy size={16} color={foregroundColor} strokeWidth={2} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Send button */}
            <TouchableOpacity activeOpacity={0.7}>
              <View className="flex-row items-center justify-center gap-2 rounded-xl bg-primary py-3">
                <Share2 size={15} color="#FFF" strokeWidth={2} />
                <Text className="font-poppins-bold text-sm text-white">Send Invite Link</Text>
              </View>
            </TouchableOpacity>

            <Text className="mt-2 text-center font-poppins-regular text-[10px] text-muted-foreground">
              This link expires in 24 hours. Limit 1 use.
            </Text>
          </MotiView>
        )}
      </View>
    </MotiView>
  );
}
