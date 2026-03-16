import React from 'react';
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import { Clock, FileQuestion, Send, Zap } from 'lucide-react-native';
import { QuizHeader } from './QuizHeader';
import { QuizTitleInput } from './QuizTitleInput';
import { QuizDescriptionInput } from './QuizDescriptionInput';
import { QuizQuestionCard } from './QuizQuestionCard';
import { AddQuestionButton } from './AddQuestionButton';
import { useCreateQuiz } from './hooks/useCreateQuiz';
import { TIME_OPTIONS } from './types/quiz';

export function CreateQuizScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = colors[theme];

  const {
    title,
    setTitle,
    description,
    setDescription,
    timeLimit,
    setTimeLimit,
    questions,
    totalPoints,
    addQuestion,
    removeQuestion,
    changeQuestionType,
    toggleCorrectAnswer,
    updateAnswerText,
    updateQuestion,
  } = useCreateQuiz();

  return (
    <View className="flex-1 bg-background">
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
        <QuizHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Meta card */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 80 }}
            className="mx-6 mb-4"
          >
            <View
              className="rounded-2xl border border-border bg-card p-4"
              style={Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 8,
                },
                android: { elevation: 2 },
              })}
            >
              <QuizTitleInput value={title} onChangeText={setTitle} />
              <QuizDescriptionInput value={description} onChangeText={setDescription} />

              {/* Meta badges */}
              <View className="flex-row items-center gap-3">
                {[
                  { icon: Clock, label: `${timeLimit} min` },
                  {
                    icon: FileQuestion,
                    label: `${questions.length} Q${questions.length !== 1 ? 's' : ''}`,
                  },
                  { icon: Zap, label: `${totalPoints} pts` },
                ].map((badge) => (
                  <View
                    key={badge.label}
                    className="flex-row items-center gap-1.5 rounded-lg bg-primary/5 px-2.5 py-1.5"
                  >
                    <badge.icon size={13} color={c.primary} strokeWidth={2} />
                    <Text className="font-poppins-semibold text-xs text-primary">
                      {badge.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </MotiView>

          {/* Time limit selector */}
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 150 }}
            className="mx-6 mb-5"
          >
            <Text className="mb-2 font-poppins-bold text-xs uppercase tracking-wider text-muted-foreground">
              Time Limit
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {TIME_OPTIONS.map((mins) => {
                  const active = timeLimit === mins;
                  return (
                    <TouchableOpacity
                      key={mins}
                      onPress={() => setTimeLimit(mins)}
                      activeOpacity={0.7}
                    >
                      <View
                        className={`rounded-full border px-4 py-2 ${
                          active ? 'border-primary bg-primary' : 'border-border bg-card'
                        }`}
                      >
                        <Text
                          className={`font-poppins-semibold text-xs ${
                            active ? 'text-white' : 'text-foreground'
                          }`}
                        >
                          {mins} min
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </MotiView>

          {/* Questions label */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 300, delay: 220 }}
            className="mx-6 mb-3"
          >
            <Text className="font-poppins-bold text-xs uppercase tracking-wider text-muted-foreground">
              Questions
            </Text>
          </MotiView>

          {/* Question cards */}
          {questions.map((question, index) => (
            <MotiView
              key={question.id}
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                damping: 16,
                stiffness: 120,
                delay: 280 + index * 60,
              }}
            >
              <QuizQuestionCard
                question={question}
                index={index}
                onChangeType={(type) => changeQuestionType(question.id, question, type)}
                onChangeText={(text) => updateQuestion(question.id, { ...question, text })}
                onToggleCorrect={(answerId) => toggleCorrectAnswer(question.id, question, answerId)}
                onChangeAnswerText={(answerId, text) =>
                  updateAnswerText(question.id, question, answerId, text)
                }
                onRemove={() => removeQuestion(question.id)}
              />
            </MotiView>
          ))}

          <AddQuestionButton onPress={addQuestion} />
        </ScrollView>

        {/* Bottom action bar */}
        <View
          className="absolute bottom-0 left-0 right-0 flex-row gap-3 border-t border-border bg-card px-6"
          style={{
            paddingTop: 12,
            paddingBottom: insets.bottom + 12,
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
              },
              android: { elevation: 8 },
            }),
          }}
        >
          <TouchableOpacity activeOpacity={0.7} className="flex-1">
            <View className="items-center rounded-xl border border-border py-3">
              <Text className="font-poppins-semibold text-sm text-foreground">Save Draft</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className="flex-1">
            <View className="flex-row items-center justify-center gap-2 rounded-xl bg-primary py-3">
              <Send size={16} color="#FFF" strokeWidth={2} />
              <Text className="font-poppins-bold text-sm text-white">Publish</Text>
            </View>
          </TouchableOpacity>
        </View>
      </MotiView>
    </View>
  );
}
