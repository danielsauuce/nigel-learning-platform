import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { MotiView } from 'moti';
import { StudentCard } from './StudentCard';
import { STUDENTS } from './data/students';

export function StudentDirectory() {
  const [filter, setFilter] = useState<'all' | 'active'>('all');

  const filteredStudents = filter === 'active' ? STUDENTS.filter((s) => s.active) : STUDENTS;

  return (
    <View className="px-6">
      {/* Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="font-poppins-bold text-sm text-foreground">Student Directory</Text>

          <View className="rounded-md bg-muted px-2 py-0.5">
            <Text className="font-poppins-semibold text-[10px] text-muted-foreground">
              {filteredStudents.length}
            </Text>
          </View>
        </View>

        {/* Filter */}
        <View className="flex-row overflow-hidden rounded-lg bg-muted">
          {(['all', 'active'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setFilter(type)}
              activeOpacity={0.7}
              className={`px-3 py-1.5 ${filter === type ? 'bg-card' : ''}`}
              style={
                filter === type
                  ? {
                      borderRadius: 6,
                      ...Platform.select({
                        ios: {
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.08,
                          shadowRadius: 2,
                        },
                        android: { elevation: 1 },
                      }),
                    }
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
      </View>

      {/* Student List */}
      <View className="gap-2.5">
        {filteredStudents.map((student, index) => (
          <MotiView
            key={student.name}
            from={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
              type: 'spring',
              damping: 16,
              stiffness: 130,
              delay: index * 40,
            }}
          >
            <StudentCard student={student} />
          </MotiView>
        ))}
      </View>

      {/* See all */}
      <TouchableOpacity activeOpacity={0.7} className="mt-4 items-center">
        <Text className="font-poppins-semibold text-sm text-muted-foreground">
          See all students
        </Text>
      </TouchableOpacity>
    </View>
  );
}
