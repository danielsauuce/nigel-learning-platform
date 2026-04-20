import type React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../../../context/ThemeContext'
import { navigateMock } from '../../../test/routerMock'
import { describe, expect, it, vi } from 'vitest'
import { ActionBar } from '../ActionBar'
import { AchievementGrid } from '../AchievementGrid'
import { ActionButtons } from '../ActionButtons'
import { AnalyticsChartCard } from '../AnalyticsChartCard'
import { AnalyticsMetricCard } from '../AnalyticsMetricCard'
import { AnswerOption } from '../AnswerOption'
import { AppShowcase } from '../AppShowcase'
import { AuthPanel } from '../AuthPanel'
import { BadgeCard } from '../BadgeCard'
import { BadgePreview } from '../BadgePreview'
import { BudgetSlider } from '../BudgetSlider'
import { BudgetSummary } from '../BudgetSummary'
import { CategoryChip } from '../CategoryChip'
import { ChallengeExplanation } from '../ChallengeExplanation'
import { ChallengeHeader } from '../ChallengeHeader'
import { ChallengeInput } from '../ChallengeInput'
import { ChallengeNextButton } from '../ChallengeNextButton'
import { ChallengeProgress } from '../ChallengeProgress'
import { ChallengeResults } from '../ChallengeResults'
import { ChallengeStep } from '../ChallengeStep'
import { ConsentStep } from '../ConsentStep'
import { ContentHeader } from '../ContentHeader'
import { ContentTypeSelector } from '../ContentTypeSelector'
import { ConversationStarter } from '../ConversationStarter'
import { CtaBanner } from '../CtaBanner'
import { DailyChallengeCard } from '../DailyChallengeCard'
import { FamilyDataItem } from '../DataItem'
import { DashboardStatCard } from '../DashboardStatCard'
import { DetailedFeatureCard } from '../DetailedFeatureCard'
import { DetailedFeaturesGrid } from '../DetailedFeaturesGrid'
import { DownloadCTA } from '../DownloadCTA'
import { EventCard } from '../EventCard'
import { FamilyShareCard } from '../FamilyShareCard'
import { FamilyShareHeader } from '../FamilyShareHeader'
import { FamilyStatCard } from '../FamilyStatCard'
import { FeatureCard } from '../FeatureCard'
import { FeaturesCard } from '../FeaturesCard'
import { FeaturesGrid } from '../FeaturesGrid'
import { FeaturesHero } from '../FeaturesHero'
import { FeedbackForm } from '../FeedbackForm'
import { InputField } from '../InputField'
import { InsightSummaryCard } from '../InsightSummaryCard'
import { JobCard } from '../JobCard'
import { LearningPathCard } from '../LearningPathCard'
import { LessonBuilder } from '../LessonBuilder'
import { LessonProgress } from '../LessonProgress'
import { LessonResults } from '../LessonResults'
import { LessonSlide } from '../LessonSlide'
import { LinkStep } from '../LinkStep'
import { LoadingButton } from '../LoadingButton'
import { LockedLesson } from '../LockedLesson'
import { Logo, NigelBrandIcon, NigelBrandIconWhite } from '../Logo'
import { MetaBadges } from '../MetaBadges'
import { MissionCard } from '../MissionCard'
import { MissionHeader } from '../MissionHeader'
import { OverallProgressHero } from '../OverallProgressHero'
import { PageHeader } from '../PageHeader'
import { PayslipCard } from '../PayslipCard'
import { PersonCard } from '../PersonCard'
import { PreviewStep } from '../PreviewStep'
import { ProgressBar } from '../ProgressBar'
import { ProgressCircle } from '../ProgressCircle'
import { ProgressHeader } from '../ProgressHeader'
import { ProgressStatCard } from '../ProgressStatCard'
import { ProTipCard } from '../ProTipCard'
import { QuestionCard } from '../QuestionCard'
import { QuickStatTile } from '../QuickStatTile'
import { QuizBuilder } from '../QuizBuilder'
import { QuizOptions } from '../QuizOptions'
import { QuizQuestion } from '../QuizQuestion'
import { RecentActivityCard } from '../RecentActivityCard'
import { ResultCard } from '../ResultCard'
import { ResultsPanel } from '../ResultsPanel'
import { RoleCard } from '../RoleCard'
import { SectionHeader } from '../SectionHeader'
import { SettingsHeader } from '../SettingsHeader'
import { SettingsItem } from '../SettingsItem'
import { SettingsSection } from '../SettingsSection'
import { SettingsSidebar } from '../SettingsSidebar'
import { SimulatorHeader } from '../SimulatorHeader'
import { SimulatorTeaser } from '../SimulatorTeaser'
import { StatCard } from '../StatCard'
import { StatusBadge } from '../StatusBadge'
import { StudentDashboardHeader } from '../StudentDashboardHeader'
import { StudentPreviewCard } from '../StudentPreviewCard'
import { StudentRow } from '../StudentRow'
import { StudentTable } from '../StudentTable'
import { TeacherAnalyticsHeader } from '../TeacherAnalyticsHeader'
import { TeacherDashboardHeader } from '../TeacherDashboardHeader'
import { TeacherFamilyConsentCard } from '../TeacherFamilyConsentCard'
import { TeacherNotificationsCard } from '../TeacherNotificationsCard'
import { TeacherProfileCard } from '../TeacherProfileCard'
import { TeacherSecurityCard } from '../TeacherSecurityCard'
import { ThemeModeCard } from '../ThemeModeCard'
import { ThemeToggle } from '../ThemeToggle'
import { TimeLimitSelector } from '../TimeLimitSelector'
import { TopPerformerCard } from '../TopPerformerCard'
import { VideoBuilder } from '../VideoBuilder'

type CaseRunner = () => Promise<void> | void

const icon = (label = 'icon') => <span>{label}</span>

const renderWithProviders = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>)

const renderTableRow = (ui: React.ReactElement) =>
  renderWithProviders(
    <table>
      <tbody>{ui}</tbody>
    </table>
  )

const learningPaths = [
  { key: 'save', emoji: '💰', title: 'Saving', color: '#B9A7F8' },
  { key: 'spend', emoji: '🛒', title: 'Spending', color: '#F7B6B6' },
]

const sampleQuestion = {
  id: 'q1',
  text: 'What is budgeting?',
  type: 'multiple_choice' as const,
  answers: [
    { id: 'a1', text: 'Planning money', correct: true },
    { id: 'a2', text: 'Ignoring bills', correct: false },
  ],
  points: 10,
}

const sampleStudent = {
  id: 'STU-1',
  name: 'Sarah Johnson',
  missions: 4,
  avg: 82,
  simLevel: 'HIGH' as const,
  active: true,
  lastActive: '2h ago',
}

const testCases: Record<string, CaseRunner> = {
  ActionBar: async () => {
    const onSaveDraft = vi.fn()
    const onPublish = vi.fn()
    renderWithProviders(
      <ActionBar onSaveDraft={onSaveDraft} onPublish={onPublish} dark />
    )
    await userEvent.click(screen.getByRole('button', { name: /save draft/i }))
    await userEvent.click(screen.getByRole('button', { name: /publish/i }))
    expect(onSaveDraft).toHaveBeenCalledOnce()
    expect(onPublish).toHaveBeenCalledOnce()
  },
  AchievementGrid: () => {
    renderWithProviders(
      <AchievementGrid
        items={[
          { icon: icon('star'), label: 'Goal Setter' },
          { icon: icon('fire'), label: 'Streak' },
        ]}
        dark={false}
      />
    )
    expect(screen.getByText('Achievements')).toBeInTheDocument()
    expect(screen.getByText('Goal Setter')).toBeInTheDocument()
  },
  ActionButtons: async () => {
    const onEmail = vi.fn()
    const onMore = vi.fn()
    renderWithProviders(
      <ActionButtons
        onEmail={onEmail}
        onMore={onMore}
        className="opacity-100"
      />
    )
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])
    await userEvent.click(buttons[1])
    expect(onEmail).toHaveBeenCalledOnce()
    expect(onMore).toHaveBeenCalledOnce()
  },
  AnalyticsChartCard: () => {
    renderWithProviders(
      <AnalyticsChartCard title="Performance" legend={<span>Legend</span>}>
        <div>Chart content</div>
      </AnalyticsChartCard>
    )
    expect(screen.getByText('Performance')).toBeInTheDocument()
    expect(screen.getByText('Chart content')).toBeInTheDocument()
  },
  AnalyticsMetricCard: () => {
    renderWithProviders(
      <AnalyticsMetricCard
        icon={icon()}
        label="Completion"
        value="92%"
        trend="+8%"
        positive
      />
    )
    expect(screen.getByText('Completion')).toBeInTheDocument()
    expect(screen.getByText('92%')).toBeInTheDocument()
  },
  AnswerOption: async () => {
    const onTextChange = vi.fn()
    const onToggleCorrect = vi.fn()
    renderWithProviders(
      <AnswerOption
        answer={{ id: 'a1', text: 'Planning money', correct: false }}
        onTextChange={onTextChange}
        onToggleCorrect={onToggleCorrect}
      />
    )
    await userEvent.click(screen.getByRole('button'))
    await userEvent.type(screen.getByPlaceholderText(/answer option/i), '!')
    expect(onToggleCorrect).toHaveBeenCalledOnce()
    expect(onTextChange).toHaveBeenCalled()
  },
  AppShowcase: () => {
    renderWithProviders(<AppShowcase />)
    expect(screen.getByText(/designed for kids/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /download app/i })
    ).toBeInTheDocument()
  },
  AuthPanel: () => {
    renderWithProviders(
      <AuthPanel
        isTeacher
        title="Teacher Login"
        description="Secure access for educators."
        icon={icon()}
      />
    )
    expect(screen.getByText('Teacher Login')).toBeInTheDocument()
  },
  BadgeCard: () => {
    renderWithProviders(
      <BadgeCard emoji="🏅" title="Saver" earned dark={false} />
    )
    expect(screen.getByText('Saver')).toBeInTheDocument()
    expect(screen.getByText('Earned')).toBeInTheDocument()
  },
  BadgePreview: () => {
    renderWithProviders(<BadgePreview emoji="🏅" title="Saver" dark />)
    expect(screen.getByText('Saver')).toBeInTheDocument()
  },
  BudgetSlider: async () => {
    const onChange = vi.fn()
    renderWithProviders(
      <BudgetSlider
        category={
          {
            key: 'food',
            label: 'Food',
            emoji: '🍎',
            value: 120,
            recommended: 100,
            max: 300,
            step: 10,
          } as never
        }
        onChange={onChange}
      />
    )
    fireEvent.change(screen.getByRole('slider'), { target: { value: '150' } })
    expect(screen.getByText('Food')).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledWith('food', 150)
  },
  BudgetSummary: async () => {
    const onFinish = vi.fn()
    renderWithProviders(
      <BudgetSummary
        moneyLeft={200}
        totalSpent={800}
        takeHome={1000}
        onFinish={onFinish}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /finish month/i }))
    expect(onFinish).toHaveBeenCalledOnce()
  },
  CategoryChip: () => {
    renderWithProviders(
      <CategoryChip
        name="Budgeting"
        icon={icon()}
        bgClass="bg-gray-100"
        dark={false}
      />
    )
    expect(
      screen.getByRole('button', { name: /budgeting/i })
    ).toBeInTheDocument()
  },
  ChallengeExplanation: () => {
    renderWithProviders(
      <ChallengeExplanation explanation="Great work." isCorrect dark={false} />
    )
    expect(screen.getByText('Great work.')).toBeInTheDocument()
  },
  ChallengeHeader: async () => {
    const onBack = vi.fn()
    renderWithProviders(
      <ChallengeHeader
        onBack={onBack}
        timer={75}
        formatTime={(s) => `${s}s`}
        dark={false}
      />
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onBack).toHaveBeenCalledOnce()
    expect(screen.getByText('75s')).toBeInTheDocument()
  },
  ChallengeInput: async () => {
    const onChange = vi.fn()
    const onCheck = vi.fn()
    renderWithProviders(
      <ChallengeInput
        value="100"
        onChange={onChange}
        disabled={false}
        inputChecked={false}
        onCheck={onCheck}
        dark={false}
      />
    )
    await userEvent.type(screen.getByRole('textbox'), '5')
    await userEvent.click(screen.getByRole('button', { name: /check answer/i }))
    expect(onChange).toHaveBeenCalled()
    expect(onCheck).toHaveBeenCalledOnce()
  },
  ChallengeNextButton: async () => {
    const onNext = vi.fn()
    renderWithProviders(
      <ChallengeNextButton onNext={onNext} isLastStep={false} />
    )
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(onNext).toHaveBeenCalledOnce()
  },
  ChallengeProgress: () => {
    const { container } = renderWithProviders(
      <ChallengeProgress steps={[1, 2, 3]} currentStep={1} dark={false} />
    )
    expect(container.querySelectorAll('.h-1\\.5').length).toBe(3)
  },
  ChallengeResults: async () => {
    const onBack = vi.fn()
    renderWithProviders(
      <ChallengeResults
        score={4}
        totalQuestions={5}
        timer={30}
        streak={3}
        xpEarned={90}
        dark={false}
        onBack={onBack}
      />
    )
    expect(screen.getByText(/challenge complete/i)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button'))
    expect(onBack).toHaveBeenCalledOnce()
  },
  ChallengeStep: async () => {
    const onSelectOption = vi.fn()
    renderWithProviders(
      <ChallengeStep
        stepData={{
          type: 'quiz',
          title: 'Quick check',
          content: 'Choose the best answer.',
          options: [
            { key: 'a', text: 'Save first' },
            { key: 'b', text: 'Spend all' },
          ],
          correctKey: 'a',
          explanation: 'Saving builds resilience.',
        }}
        stepNumber={0}
        totalSteps={3}
        selectedKey={null}
        answered={false}
        inputValue=""
        inputChecked={false}
        onSelectOption={onSelectOption}
        onInputChange={vi.fn()}
        onCheckInput={vi.fn()}
        dark={false}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /save first/i }))
    expect(onSelectOption).toHaveBeenCalledWith('a')
  },
  ConsentStep: async () => {
    const onAgreeChange = vi.fn()
    const onContinue = vi.fn()
    renderWithProviders(
      <ConsentStep
        sharedItems={[{ key: 'progress', icon: icon(), label: 'Progress' }]}
        notSharedItems={[{ key: 'password', icon: icon(), label: 'Password' }]}
        agreed
        onAgreeChange={onAgreeChange}
        onContinue={onContinue}
        dark={false}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /i understand/i }))
    await userEvent.click(
      screen.getByRole('button', { name: /generate link/i })
    )
    expect(onAgreeChange).toHaveBeenCalledWith(false)
    expect(onContinue).toHaveBeenCalledOnce()
  },
  ContentHeader: async () => {
    const onBack = vi.fn()
    const onPreview = vi.fn()
    const onSaveDraft = vi.fn()
    renderWithProviders(
      <ContentHeader
        onBack={onBack}
        onPreview={onPreview}
        onSaveDraft={onSaveDraft}
      />
    )
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])
    await userEvent.click(buttons[1])
    await userEvent.click(buttons[2])
    expect(onBack).toHaveBeenCalledOnce()
    expect(onPreview).toHaveBeenCalledOnce()
    expect(onSaveDraft).toHaveBeenCalledOnce()
  },
  ContentTypeSelector: async () => {
    const onSelect = vi.fn()
    renderWithProviders(<ContentTypeSelector onSelect={onSelect} />)
    await userEvent.click(
      screen.getByRole('button', { name: /interactive lesson/i })
    )
    expect(onSelect).toHaveBeenCalledWith('lesson')
  },
  ConversationStarter: () => {
    renderWithProviders(
      <ConversationStarter
        icon={icon()}
        prompt="Ask about saving"
        detail="What did you learn today?"
        dark={false}
      />
    )
    expect(screen.getByText('Ask about saving')).toBeInTheDocument()
  },
  CtaBanner: async () => {
    const onClick = vi.fn()
    renderWithProviders(
      <CtaBanner
        title="Start today"
        description="Build money confidence."
        buttonLabel="Join now"
        buttonIcon={icon('go')}
        mascot={icon('mascot')}
        onClick={onClick}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /join now/i }))
    expect(onClick).toHaveBeenCalledOnce()
  },
  DailyChallengeCard: async () => {
    const onStart = vi.fn()
    renderWithProviders(
      <DailyChallengeCard
        title="Daily saver"
        desc="A quick challenge."
        time="2 min"
        xp="+20 XP"
        onStart={onStart}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /start/i }))
    expect(onStart).toHaveBeenCalledOnce()
  },
  DataItem: () => {
    renderWithProviders(
      <FamilyDataItem
        item={{ key: 'progress', icon: icon(), label: 'Progress summary' }}
        isShared
        dark={false}
      />
    )
    expect(screen.getByText('Progress summary')).toBeInTheDocument()
  },
  DashboardStatCard: () => {
    renderWithProviders(
      <DashboardStatCard
        icon={icon()}
        label="Learners"
        value="42"
        trend="+5%"
        colorClass="bg-[#B9A7F8]"
        dark={false}
      />
    )
    expect(screen.getByText('Learners')).toBeInTheDocument()
  },
  DetailedFeatureCard: () => {
    renderWithProviders(
      <DetailedFeatureCard
        icon={icon()}
        title="Mobile First"
        desc="Built for kids."
        color="bg-purple-100"
      />
    )
    expect(screen.getByText('Mobile First')).toBeInTheDocument()
  },
  DetailedFeaturesGrid: () => {
    renderWithProviders(<DetailedFeaturesGrid />)
    expect(screen.getByText(/everything your child needs/i)).toBeInTheDocument()
  },
  DownloadCTA: () => {
    renderWithProviders(<DownloadCTA />)
    expect(screen.getByText(/download the app now/i)).toBeInTheDocument()
  },
  EventCard: async () => {
    const onContinue = vi.fn()
    renderWithProviders(
      <EventCard
        title="Unexpected bill"
        description="Something came up."
        cost={120}
        onContinue={onContinue}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /see results/i }))
    expect(onContinue).toHaveBeenCalledOnce()
  },
  FamilyShareCard: async () => {
    const onShare = vi.fn()
    renderWithProviders(<FamilyShareCard onShare={onShare} dark={false} />)
    await userEvent.click(
      screen.getByRole('button', { name: /share progress/i })
    )
    expect(onShare).toHaveBeenCalledOnce()
  },
  FamilyShareHeader: async () => {
    const onBack = vi.fn()
    renderWithProviders(<FamilyShareHeader onBack={onBack} dark />)
    await userEvent.click(screen.getByRole('button'))
    expect(onBack).toHaveBeenCalledOnce()
  },
  FamilyStatCard: () => {
    renderWithProviders(
      <FamilyStatCard
        icon={icon()}
        label="Missions"
        value="12/20"
        dark={false}
      />
    )
    expect(screen.getByText('Missions')).toBeInTheDocument()
  },
  FeatureCard: () => {
    renderWithProviders(
      <FeatureCard
        icon={icon()}
        title="Playful lessons"
        description="Short and fun."
        accentClass="bg-purple-100"
        textClass="text-black"
      />
    )
    expect(screen.getByText('Playful lessons')).toBeInTheDocument()
  },
  FeaturesCard: () => {
    renderWithProviders(
      <FeaturesCard
        icon={icon()}
        title="Interactive Games"
        desc="Learn by doing."
        accent="bg-purple-200"
      />
    )
    expect(screen.getByText('Interactive Games')).toBeInTheDocument()
  },
  FeaturesGrid: () => {
    renderWithProviders(<FeaturesGrid />)
    expect(screen.getByText(/what we offer/i)).toBeInTheDocument()
  },
  FeaturesHero: () => {
    renderWithProviders(<FeaturesHero />)
    expect(screen.getByText(/very friendly user/i)).toBeInTheDocument()
  },
  FeedbackForm: async () => {
    const onFeedbackChange = vi.fn()
    const onSendFeedback = vi.fn()
    renderWithProviders(
      <FeedbackForm
        feedback="Helpful lesson"
        onFeedbackChange={onFeedbackChange}
        feedbackSent={false}
        onSendFeedback={onSendFeedback}
        dark={false}
      />
    )
    await userEvent.type(screen.getByRole('textbox'), '!')
    await userEvent.click(
      screen.getByRole('button', { name: /send anonymously/i })
    )
    expect(onFeedbackChange).toHaveBeenCalled()
    expect(onSendFeedback).toHaveBeenCalledOnce()
  },
  InputField: async () => {
    const onChange = vi.fn()
    renderWithProviders(
      <InputField
        name="email"
        label="Email"
        type="email"
        placeholder="name@example.com"
        icon={icon()}
        value=""
        onChange={onChange}
      />
    )
    await userEvent.type(screen.getByLabelText('Email'), 'a')
    expect(onChange).toHaveBeenCalled()
  },
  InsightSummaryCard: async () => {
    const onAction = vi.fn()
    renderWithProviders(
      <InsightSummaryCard
        title="Classroom insights"
        description="A quick snapshot."
        actionLabel="View report"
        onAction={onAction}
        items={[
          { label: 'Completion', value: '89%' },
          { label: 'Active', value: '24' },
        ]}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /view report/i }))
    expect(onAction).toHaveBeenCalledOnce()
  },
  JobCard: async () => {
    const onSelect = vi.fn()
    renderWithProviders(
      <JobCard
        emoji="💼"
        title="Engineer"
        description="Builds products."
        salary="£45,000"
        onSelect={onSelect}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /engineer/i }))
    expect(onSelect).toHaveBeenCalledOnce()
  },
  LearningPathCard: () => {
    renderWithProviders(
      <LearningPathCard
        path={learningPaths[0] as never}
        completed={2}
        total={4}
        status="active"
        dark={false}
      />
    )
    expect(screen.getByText('Saving')).toBeInTheDocument()
  },
  LessonBuilder: async () => {
    const onTitleChange = vi.fn()
    const onContentChange = vi.fn()
    const onEmojiChange = vi.fn()
    const onTargetPathChange = vi.fn()
    renderWithProviders(
      <LessonBuilder
        title="Money basics"
        content="Lesson copy"
        emoji="💡"
        targetPath="save"
        learningPaths={learningPaths}
        onTitleChange={onTitleChange}
        onContentChange={onContentChange}
        onEmojiChange={onEmojiChange}
        onTargetPathChange={onTargetPathChange}
      />
    )
    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[0], '!')
    await userEvent.type(inputs[1], '!')
    await userEvent.selectOptions(screen.getByRole('combobox'), 'spend')
    expect(onEmojiChange).toHaveBeenCalled()
    expect(onTitleChange).toHaveBeenCalled()
    expect(onTargetPathChange).toHaveBeenCalledWith('spend')
  },
  LessonProgress: () => {
    const { container } = renderWithProviders(
      <LessonProgress
        lessons={[{ id: 'l1' }, { id: 'l2' }, { id: 'l3' }]}
        completedLessons={new Set(['l1'])}
        currentLessonIdx={1}
      />
    )
    expect(container.querySelectorAll('.h-2').length).toBe(3)
  },
  LessonResults: async () => {
    renderWithProviders(<LessonResults score={4} completedInSession={5} />)
    await userEvent.click(
      screen.getByRole('button', { name: /back to dashboard/i })
    )
    expect(navigateMock).toHaveBeenCalledWith('/student-dashboard')
  },
  LessonSlide: async () => {
    const onNext = vi.fn()
    renderWithProviders(
      <LessonSlide
        emoji="💡"
        title="Smart Saving"
        content="Pay yourself first."
        lessonNumber={1}
        totalLessons={3}
        hasQuiz
        onNext={onNext}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /take quiz/i }))
    expect(onNext).toHaveBeenCalledOnce()
  },
  LinkStep: async () => {
    const onCopy = vi.fn()
    const onPreview = vi.fn()
    const onDone = vi.fn()
    renderWithProviders(
      <LinkStep
        link="https://example.com/family"
        copied={false}
        onCopy={onCopy}
        onPreview={onPreview}
        onDone={onDone}
        overallProgress={74}
        earnedBadges={3}
        streak={8}
        dark={false}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /copy/i }))
    await userEvent.click(
      screen.getByRole('button', { name: /preview what they'll see/i })
    )
    await userEvent.click(screen.getByRole('button', { name: /^done$/i }))
    expect(onCopy).toHaveBeenCalledOnce()
    expect(onPreview).toHaveBeenCalledOnce()
    expect(onDone).toHaveBeenCalledOnce()
  },
  LoadingButton: () => {
    renderWithProviders(
      <LoadingButton isLoading={false} variant="teacher">
        Save changes
      </LoadingButton>
    )
    expect(
      screen.getByRole('button', { name: /save changes/i })
    ).toBeInTheDocument()
  },
  LockedLesson: () => {
    renderWithProviders(<LockedLesson />)
    expect(
      screen.getByText(/complete the previous lesson to unlock this one/i)
    ).toBeInTheDocument()
  },
  Logo: () => {
    renderWithProviders(
      <>
        <Logo />
        <NigelBrandIcon />
        <NigelBrandIconWhite />
      </>
    )
    expect(screen.getByRole('link', { name: /nigel/i })).toHaveAttribute(
      'href',
      '/'
    )
    expect(screen.getAllByAltText('Nigel').length).toBeGreaterThan(0)
  },
  MetaBadges: () => {
    renderWithProviders(
      <MetaBadges timeLimit={10} questionCount={3} totalPoints={30} />
    )
    expect(screen.getByText('10 min')).toBeInTheDocument()
  },
  MissionCard: async () => {
    const onAction = vi.fn()
    renderWithProviders(
      <MissionCard
        id="m1"
        title="Budget Builder"
        emoji="💸"
        desc="Practice a monthly plan."
        icon={icon()}
        colorClass="bg-[#B9A7F8]"
        progress={60}
        status="active"
        dark={false}
        onAction={onAction}
      />
    )
    await userEvent.click(
      screen.getByRole('button', { name: /start mission/i })
    )
    expect(onAction).toHaveBeenCalledWith('m1')
  },
  MissionHeader: async () => {
    renderWithProviders(<MissionHeader emoji="💰" title="Saving" />)
    await userEvent.click(screen.getByRole('button'))
    expect(navigateMock).toHaveBeenCalledWith('/student-dashboard')
  },
  OverallProgressHero: () => {
    renderWithProviders(
      <OverallProgressHero
        overallPercent={75}
        completedCount={9}
        totalLessons={12}
        dark={false}
      />
    )
    expect(screen.getByText('75%')).toBeInTheDocument()
  },
  PageHeader: async () => {
    const onBack = vi.fn()
    const onSearch = vi.fn()
    const onFilter = vi.fn()
    renderWithProviders(
      <PageHeader
        title="Students"
        subtitle="Track learner activity."
        onBack={onBack}
        onSearch={onSearch}
        onFilter={onFilter}
      />
    )
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])
    await userEvent.type(screen.getByPlaceholderText(/search/i), 'sa')
    await userEvent.click(buttons[1])
    expect(onBack).toHaveBeenCalledOnce()
    expect(onSearch).toHaveBeenCalled()
    expect(onFilter).toHaveBeenCalledOnce()
  },
  PayslipCard: async () => {
    const onContinue = vi.fn()
    renderWithProviders(
      <PayslipCard
        jobTitle="Engineer"
        takeHome={2500}
        onContinue={onContinue}
      />
    )
    await userEvent.click(
      screen.getByRole('button', { name: /start budgeting/i })
    )
    expect(onContinue).toHaveBeenCalledOnce()
  },
  PersonCard: () => {
    renderWithProviders(<PersonCard name="Nigel" role="Guide" icon={icon()} />)
    expect(screen.getByText('Nigel')).toBeInTheDocument()
  },
  PreviewStep: async () => {
    const onFeedbackChange = vi.fn()
    const onSendFeedback = vi.fn()
    const onBack = vi.fn()
    renderWithProviders(
      <PreviewStep
        overallProgress={72}
        completedLessons={12}
        level={3}
        streak={5}
        conversationStarters={[
          {
            icon: icon(),
            prompt: 'Talk about saving',
            detail: 'What was fun?',
          },
        ]}
        feedback="Great work"
        onFeedbackChange={onFeedbackChange}
        feedbackSent={false}
        onSendFeedback={onSendFeedback}
        onBack={onBack}
        dark={false}
      />
    )
    expect(screen.getByText(/family progress summary/i)).toBeInTheDocument()
    await userEvent.click(
      screen.getByRole('button', { name: /send anonymously/i })
    )
    await userEvent.click(screen.getByRole('button', { name: /back to link/i }))
    expect(onSendFeedback).toHaveBeenCalledOnce()
    expect(onBack).toHaveBeenCalledOnce()
  },
  ProgressBar: () => {
    renderWithProviders(<ProgressBar value={70} showValue />)
    expect(screen.getByText('70%')).toBeInTheDocument()
  },
  ProgressCircle: () => {
    renderWithProviders(<ProgressCircle progress={55} dark={false} />)
    expect(screen.getByText('55%')).toBeInTheDocument()
  },
  ProgressHeader: async () => {
    const onBack = vi.fn()
    renderWithProviders(
      <ProgressHeader title="Progress" onBack={onBack} dark />
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onBack).toHaveBeenCalledOnce()
  },
  ProgressStatCard: () => {
    renderWithProviders(
      <ProgressStatCard icon={icon()} label="XP" value="120" dark={false} />
    )
    expect(screen.getByText('120')).toBeInTheDocument()
  },
  ProTipCard: () => {
    renderWithProviders(
      <ProTipCard title="Tip" desc="Keep an emergency fund." dark={false} />
    )
    expect(screen.getByText('Keep an emergency fund.')).toBeInTheDocument()
  },
  QuestionCard: async () => {
    const onTypeChange = vi.fn()
    const onRemove = vi.fn()
    renderWithProviders(
      <QuestionCard
        question={sampleQuestion}
        index={0}
        onTextChange={vi.fn()}
        onTypeChange={onTypeChange}
        onAnswerTextChange={vi.fn()}
        onToggleCorrect={vi.fn()}
        onRemove={onRemove}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /t\/f/i }))
    await userEvent.click(screen.getAllByRole('button')[3])
    expect(onTypeChange).toHaveBeenCalledWith('true_false')
    expect(onRemove).toHaveBeenCalledOnce()
  },
  QuickStatTile: () => {
    renderWithProviders(
      <QuickStatTile
        label="Streak"
        value="5 days"
        icon={icon()}
        bgClass="bg-purple-50"
        dark={false}
      />
    )
    expect(screen.getByText('5 days')).toBeInTheDocument()
  },
  QuizBuilder: async () => {
    const onAddQuestion = vi.fn()
    renderWithProviders(
      <QuizBuilder
        title="Budget Quiz"
        description="Core concepts"
        timeLimit={10}
        questions={[sampleQuestion]}
        targetPath="save"
        learningPaths={learningPaths}
        onTitleChange={vi.fn()}
        onDescriptionChange={vi.fn()}
        onTimeLimitChange={vi.fn()}
        onTargetPathChange={vi.fn()}
        onAddQuestion={onAddQuestion}
        onRemoveQuestion={vi.fn()}
        onQuestionTextChange={vi.fn()}
        onQuestionTypeChange={vi.fn()}
        onAnswerTextChange={vi.fn()}
        onToggleCorrect={vi.fn()}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /add question/i }))
    expect(onAddQuestion).toHaveBeenCalledOnce()
  },
  QuizOptions: async () => {
    const onSelect = vi.fn()
    renderWithProviders(
      <QuizOptions
        options={[
          { key: 'a', text: 'Save first' },
          { key: 'b', text: 'Spend all' },
        ]}
        selectedKey={null}
        correctKey="a"
        answered={false}
        onSelect={onSelect}
        dark={false}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /save first/i }))
    expect(onSelect).toHaveBeenCalledWith('a')
  },
  QuizQuestion: async () => {
    const onAnswer = vi.fn()
    const onComplete = vi.fn()
    renderWithProviders(
      <QuizQuestion
        question="Why save money?"
        options={['For emergencies', 'To spend instantly']}
        correct={0}
        explanation="Savings help with unexpected costs."
        selectedOption={0}
        isCorrect={true}
        onAnswer={onAnswer}
        onComplete={onComplete}
        isLastLesson={false}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /next lesson/i }))
    expect(onComplete).toHaveBeenCalledOnce()
  },
  RecentActivityCard: () => {
    renderWithProviders(
      <RecentActivityCard
        icon={icon()}
        name="Sarah"
        action="Finished a quiz"
        time="5 min ago"
        dark={false}
      />
    )
    expect(screen.getByText('Finished a quiz')).toBeInTheDocument()
  },
  ResultCard: () => {
    renderWithProviders(
      <ResultCard
        value="£200"
        label="Total Saved"
        bgClass="bg-green-50"
        borderClass="border-green-100"
        textClass="text-green-600"
      />
    )
    expect(screen.getByText('Total Saved')).toBeInTheDocument()
  },
  ResultsPanel: async () => {
    const onTryAgain = vi.fn()
    const onBackToDashboard = vi.fn()
    renderWithProviders(
      <ResultsPanel
        savingsAmount={150}
        emergencyAmount={50}
        finalBalance={100}
        advice="Build an emergency buffer."
        onTryAgain={onTryAgain}
        onBackToDashboard={onBackToDashboard}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /try again/i }))
    await userEvent.click(
      screen.getByRole('button', { name: /back to dashboard/i })
    )
    expect(onTryAgain).toHaveBeenCalledOnce()
    expect(onBackToDashboard).toHaveBeenCalledOnce()
  },
  RoleCard: async () => {
    const onSelect = vi.fn()
    renderWithProviders(
      <RoleCard
        title="Teacher"
        description="Create content."
        cta="Continue"
        icon={icon()}
        accentClass="bg-purple-100"
        panelClass="bg-white"
        iconWrapperClass="w-12 h-12"
        textClass="text-black"
        ctaClass="text-purple-600"
        transitionDelay={0.1}
        onSelect={onSelect}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /teacher/i }))
    expect(onSelect).toHaveBeenCalledOnce()
  },
  SectionHeader: () => {
    renderWithProviders(
      <SectionHeader title="Welcome" subtitle="Let’s get started." />
    )
    expect(screen.getByText('Welcome')).toBeInTheDocument()
  },
  SettingsHeader: async () => {
    const onBack = vi.fn()
    renderWithProviders(
      <SettingsHeader title="Settings" dark={false} onBack={onBack} />
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onBack).toHaveBeenCalledOnce()
  },
  SettingsItem: async () => {
    const onClick = vi.fn()
    renderWithProviders(
      <SettingsItem
        icon={icon()}
        label="Profile"
        subtitle="Manage account details."
        dark={false}
        showDivider
        onClick={onClick}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /profile/i }))
    expect(onClick).toHaveBeenCalledOnce()
  },
  SettingsSection: async () => {
    const onItemPress = vi.fn()
    renderWithProviders(
      <SettingsSection
        title="General"
        items={[
          {
            key: 'profile',
            icon: icon(),
            label: 'Profile',
            subtitle: 'Update details',
          },
        ]}
        dark={false}
        onItemPress={onItemPress}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /profile/i }))
    expect(onItemPress).toHaveBeenCalledWith('profile')
  },
  SettingsSidebar: async () => {
    const onTabSelect = vi.fn()
    const onToggleTheme = vi.fn()
    const onLogout = vi.fn()
    renderWithProviders(
      <SettingsSidebar
        tabs={[{ id: 'profile', label: 'Profile', icon: icon() }]}
        activeTab="profile"
        dark={false}
        isDark={false}
        onTabSelect={onTabSelect}
        onToggleTheme={onToggleTheme}
        onLogout={onLogout}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /profile/i }))
    await userEvent.click(screen.getByRole('button', { name: /dark mode/i }))
    await userEvent.click(screen.getByRole('button', { name: /log out/i }))
    expect(onTabSelect).toHaveBeenCalledWith('profile')
    expect(onToggleTheme).toHaveBeenCalledOnce()
    expect(onLogout).toHaveBeenCalledOnce()
  },
  SimulatorHeader: async () => {
    const onBack = vi.fn()
    renderWithProviders(
      <SimulatorHeader
        title="Budget Builder"
        subtitle="Practice real trade-offs."
        onBack={onBack}
      />
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onBack).toHaveBeenCalledOnce()
  },
  SimulatorTeaser: async () => {
    const onEnter = vi.fn()
    renderWithProviders(<SimulatorTeaser onEnter={onEnter} />)
    await userEvent.click(
      screen.getByRole('button', { name: /enter simulator/i })
    )
    expect(onEnter).toHaveBeenCalledOnce()
  },
  StatCard: () => {
    renderWithProviders(<StatCard num="24" label="Lessons" />)
    expect(screen.getByText('24')).toBeInTheDocument()
  },
  StatusBadge: () => {
    renderWithProviders(<StatusBadge status="active" showDot />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  },
  StudentDashboardHeader: async () => {
    const onSettings = vi.fn()
    renderWithProviders(
      <StudentDashboardHeader
        level={4}
        xp={240}
        streak={7}
        dark={false}
        onSettings={onSettings}
      />
    )
    await userEvent.click(screen.getAllByRole('button')[1])
    expect(screen.getByText(/your level/i)).toBeInTheDocument()
    expect(onSettings).toHaveBeenCalledOnce()
  },
  StudentPreviewCard: () => {
    renderWithProviders(
      <StudentPreviewCard
        name="Sarah"
        missions={6}
        badges={2}
        avg={88}
        simLevel="HIGH"
        active
        dark={false}
      />
    )
    expect(screen.getByText(/6 missions/i)).toBeInTheDocument()
  },
  StudentRow: async () => {
    const onEmail = vi.fn()
    const onMore = vi.fn()
    renderTableRow(
      <StudentRow
        student={sampleStudent}
        index={0}
        onEmail={onEmail}
        onMore={onMore}
      />
    )
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])
    await userEvent.click(buttons[1])
    expect(onEmail).toHaveBeenCalledWith('STU-1')
    expect(onMore).toHaveBeenCalledWith('STU-1')
  },
  StudentTable: () => {
    renderWithProviders(<StudentTable students={[sampleStudent]} />)
    expect(screen.getByText(/showing 1 students/i)).toBeInTheDocument()
  },
  TeacherAnalyticsHeader: async () => {
    const onBack = vi.fn()
    const onExport = vi.fn()
    renderWithProviders(
      <TeacherAnalyticsHeader
        onBack={onBack}
        title="Analytics"
        subtitle="Performance overview."
        timeRangeLabel="Last 30 days"
        onExport={onExport}
      />
    )
    await userEvent.click(screen.getAllByRole('button')[0])
    await userEvent.click(
      screen.getByRole('button', { name: /export report/i })
    )
    expect(onBack).toHaveBeenCalledOnce()
    expect(onExport).toHaveBeenCalledOnce()
  },
  TeacherDashboardHeader: async () => {
    const onStudentView = vi.fn()
    const onCreateContent = vi.fn()
    const onSettings = vi.fn()
    renderWithProviders(
      <TeacherDashboardHeader
        activeCount={12}
        totalStudents={20}
        dark={false}
        onStudentView={onStudentView}
        onCreateContent={onCreateContent}
        onSettings={onSettings}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /student view/i }))
    await userEvent.click(
      screen.getByRole('button', { name: /create content/i })
    )
    await userEvent.click(screen.getAllByRole('button').at(-1) as HTMLElement)
    expect(onStudentView).toHaveBeenCalledOnce()
    expect(onCreateContent).toHaveBeenCalledOnce()
    expect(onSettings).toHaveBeenCalledOnce()
  },
  TeacherFamilyConsentCard: async () => {
    const onToggleConsent = vi.fn()
    const onCopy = vi.fn()
    const onShare = vi.fn()
    renderWithProviders(
      <TeacherFamilyConsentCard
        dark={false}
        familyConsent={true}
        onToggleConsent={onToggleConsent}
        onCopy={onCopy}
        onShare={onShare}
        inviteCode="ABC123"
      />
    )
    await userEvent.click(
      screen.getByRole('button', { name: /i consent to share my data/i })
    )
    await userEvent.click(screen.getAllByRole('button')[1])
    await userEvent.click(
      screen.getByRole('button', { name: /send invite link/i })
    )
    expect(onToggleConsent).toHaveBeenCalledOnce()
    expect(onCopy).toHaveBeenCalledOnce()
    expect(onShare).toHaveBeenCalledOnce()
  },
  TeacherNotificationsCard: async () => {
    const onToggle = vi.fn()
    renderWithProviders(
      <TeacherNotificationsCard
        dark={false}
        preferences={[
          {
            id: 'alerts',
            label: 'Alerts',
            desc: 'Daily updates',
            enabled: true,
          },
        ]}
        onToggle={onToggle}
      />
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledWith('alerts')
  },
  TeacherProfileCard: () => {
    renderWithProviders(
      <TeacherProfileCard
        dark={false}
        initials="NY"
        name="Nigel Yukari"
        email="teacher@example.com"
        fields={[{ label: 'School', value: 'Nigel Academy' }]}
      />
    )
    expect(screen.getByDisplayValue('Nigel Academy')).toBeInTheDocument()
  },
  TeacherSecurityCard: async () => {
    const onChange = vi.fn()
    const onSubmit = vi.fn()
    renderWithProviders(
      <TeacherSecurityCard
        dark={false}
        fields={[{ label: 'Password', type: 'password', value: 'secret' }]}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    )
    await userEvent.type(screen.getByPlaceholderText(/••••••••/i), '!')
    await userEvent.click(
      screen.getByRole('button', { name: /update password/i })
    )
    expect(onChange).toHaveBeenCalled()
    expect(onSubmit).toHaveBeenCalledOnce()
  },
  ThemeModeCard: async () => {
    const onToggle = vi.fn()
    renderWithProviders(
      <ThemeModeCard dark={false} isOn={false} onToggle={onToggle} />
    )
    await userEvent.click(screen.getByRole('button', { name: /dark mode/i }))
    expect(onToggle).toHaveBeenCalledOnce()
  },
  ThemeToggle: async () => {
    renderWithProviders(<ThemeToggle className="extra-class" />)
    await userEvent.click(screen.getByRole('button', { name: /light/i }))
    expect(screen.getByRole('button')).toHaveAttribute(
      'title',
      expect.stringMatching(/switch to/i)
    )
  },
  TimeLimitSelector: async () => {
    const onTimeChange = vi.fn()
    renderWithProviders(
      <TimeLimitSelector selectedTime={10} onTimeChange={onTimeChange} />
    )
    await userEvent.click(screen.getByRole('button', { name: /15 min/i }))
    expect(onTimeChange).toHaveBeenCalledWith(15)
  },
  TopPerformerCard: () => {
    renderWithProviders(
      <TopPerformerCard
        rank={1}
        name="Sarah"
        missions={12}
        avg={94}
        dark={false}
      />
    )
    expect(screen.getByText('Sarah')).toBeInTheDocument()
  },
  VideoBuilder: async () => {
    const onTargetPathChange = vi.fn()
    renderWithProviders(
      <VideoBuilder
        title="Money video"
        url="https://example.com"
        notes="Watch from 2:00"
        targetPath="save"
        learningPaths={learningPaths}
        onTitleChange={vi.fn()}
        onUrlChange={vi.fn()}
        onNotesChange={vi.fn()}
        onTargetPathChange={onTargetPathChange}
      />
    )
    await userEvent.selectOptions(screen.getByRole('combobox'), 'spend')
    expect(onTargetPathChange).toHaveBeenCalledWith('spend')
  },
}

export function runComponentCase(name: string) {
  describe(name, () => {
    it('renders and handles its primary behavior', async () => {
      const testCase = testCases[name]

      if (!testCase) {
        throw new Error(`Missing test case for ${name}`)
      }

      await testCase()
    })
  })
}
