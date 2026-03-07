import React from 'react';
import { ScrollView, View } from 'react-native';
import { MotiView } from 'moti';

import { StudentCard } from '../StudentCard';
import { STUDENTS } from '../data/students';
import { useStudentRoster } from './hooks/useStudentRoster';

export function StudentRosterScreen() {
  const { filtered } = useStudentRoster();

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((student, index) => (
          <MotiView
            key={student.id}
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 16,
              stiffness: 120,
              delay: index * 60,
            }}
          >
            <StudentCard student={student} index={index} />
          </MotiView>
        ))}
      </ScrollView>
    </View>
  );
}
