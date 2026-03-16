import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';

type Props = {
  filter: 'all' | 'active';
  setFilter: (value: 'all' | 'active') => void;
};

export function StudentFilters({ filter, setFilter }: Props) {
  return (
    <View className="mb-2 flex-row items-center justify-between px-6">
      {/* Toggle */}
      <View className="flex-row overflow-hidden rounded-lg border border-border">
        {(['all', 'active'] as const).map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type)}
            activeOpacity={0.7}
            className={`px-4 py-2 ${filter === type ? 'bg-card' : ''}`}
            style={
              filter === type
                ? Platform.select({
                    ios: {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.06,
                      shadowRadius: 2,
                    },
                    android: { elevation: 1 },
                  })
                : undefined
            }
          >
            <Text
              className={`font-poppins-semibold text-xs ${
                filter === type ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {type === 'all' ? 'All' : 'Active'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sort */}
      <TouchableOpacity activeOpacity={0.7} className="flex-row items-center gap-1">
        <Text className="font-poppins-medium text-xs text-muted-foreground">Sort: Recent</Text>

        <Text className="text-[10px] text-muted-foreground">▼</Text>
      </TouchableOpacity>
    </View>
  );
}
