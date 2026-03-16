/**
 * Learning Path Data
 * ──────────────────
 * Each path has questions/lessons. First question of each path is open.
 * Others unlock as you complete the previous one.
 * Paths unlock sequentially: Saving Basics → Smart Spending → Earning Income → Borrowing & Debt → Investing & Future
 */

export interface LessonItem {
  id: string;
  title: string;
  emoji: string;
}

export interface LearningPath {
  key: string;
  title: string;
  emoji: string;
  category: string;
  color: string;
  lessons: LessonItem[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    key: 'saving_basics',
    title: 'Saving Basics',
    emoji: '🐷',
    category: 'Foundation',
    color: '#B9A7F8',
    lessons: [
      { id: 'sb1', title: "What's Money?", emoji: '💰' },
      { id: 'sb2', title: 'Why Do We Save?', emoji: '🏦' },
      { id: 'sb3', title: 'Piggy Banks & Savings Accounts', emoji: '🐷' },
      { id: 'sb4', title: 'Setting a Savings Goal', emoji: '🎯' },
      { id: 'sb5', title: 'Needs vs Wants', emoji: '🤔' },
      { id: 'sb6', title: 'Emergency Funds', emoji: '🚨' },
      { id: 'sb7', title: 'Interest — Free Money?', emoji: '📈' },
      { id: 'sb8', title: 'Saving Basics Quiz', emoji: '✅' },
    ],
  },
  {
    key: 'smart_spending',
    title: 'Smart Spending',
    emoji: '🛒',
    category: 'Core',
    color: '#4CAF50',
    lessons: [
      { id: 'ss1', title: 'Needs vs Wants Deep Dive', emoji: '⚖️' },
      { id: 'ss2', title: 'Comparing Prices', emoji: '🏷️' },
      { id: 'ss3', title: 'Making a Shopping List', emoji: '📝' },
      { id: 'ss4', title: 'Avoiding Impulse Buys', emoji: '🛑' },
      { id: 'ss5', title: 'Online Shopping Safety', emoji: '🔒' },
      { id: 'ss6', title: 'Deals, Discounts & Tricks', emoji: '🎪' },
      { id: 'ss7', title: 'Smart Spending Quiz', emoji: '✅' },
    ],
  },
  {
    key: 'earning_income',
    title: 'Earning Income',
    emoji: '💼',
    category: 'Growth',
    color: '#FF9800',
    lessons: [
      { id: 'ei1', title: 'How People Earn Money', emoji: '💷' },
      { id: 'ei2', title: 'Jobs & Careers', emoji: '👷' },
      { id: 'ei3', title: 'Side Hustles & Pocket Money', emoji: '🌟' },
      { id: 'ei4', title: 'Understanding a Payslip', emoji: '📄' },
      { id: 'ei5', title: 'Tax Basics', emoji: '🏛️' },
      { id: 'ei6', title: 'Earning Income Quiz', emoji: '✅' },
    ],
  },
  {
    key: 'borrowing_debt',
    title: 'Borrowing & Debt',
    emoji: '💳',
    category: 'Advanced',
    color: '#F44336',
    lessons: [
      { id: 'bd1', title: 'What Is Borrowing?', emoji: '🤝' },
      { id: 'bd2', title: 'Interest on Loans', emoji: '📊' },
      { id: 'bd3', title: 'Credit Cards Explained', emoji: '💳' },
      { id: 'bd4', title: 'Good Debt vs Bad Debt', emoji: '⚖️' },
      { id: 'bd5', title: 'Avoiding Debt Traps', emoji: '🕳️' },
      { id: 'bd6', title: 'Borrowing & Debt Quiz', emoji: '✅' },
    ],
  },
  {
    key: 'investing_future',
    title: 'Investing & Future',
    emoji: '🚀',
    category: 'Expert',
    color: '#2196F3',
    lessons: [
      { id: 'if1', title: 'What Is Investing?', emoji: '🌱' },
      { id: 'if2', title: 'Stocks & Shares', emoji: '📈' },
      { id: 'if3', title: 'Compound Interest Magic', emoji: '✨' },
      { id: 'if4', title: 'Risk & Reward', emoji: '🎲' },
      { id: 'if5', title: 'Planning for the Future', emoji: '🔮' },
      { id: 'if6', title: 'Investing & Future Quiz', emoji: '✅' },
    ],
  },
];

export const BADGES = [
  { id: 'first_lesson', title: 'First Steps', emoji: '👶', desc: 'Complete your first lesson' },
  { id: 'saving_basics', title: 'Saver Starter', emoji: '🐷', desc: 'Complete Saving Basics' },
  { id: 'smart_spender', title: 'Smart Spender', emoji: '🛒', desc: 'Complete Smart Spending' },
  { id: 'earner', title: 'Income Earner', emoji: '💼', desc: 'Complete Earning Income' },
  { id: 'debt_wise', title: 'Debt Wise', emoji: '💳', desc: 'Complete Borrowing & Debt' },
  { id: 'investor', title: 'Future Investor', emoji: '🚀', desc: 'Complete Investing & Future' },
  { id: 'streak_7', title: '7-Day Streak', emoji: '🔥', desc: '7 days in a row' },
  { id: 'streak_30', title: 'Monthly Master', emoji: '🏆', desc: '30 days in a row' },
  { id: 'budget_pro', title: 'Budget Pro', emoji: '📊', desc: 'Balance a budget perfectly' },
  { id: 'quiz_ace', title: 'Quiz Ace', emoji: '🧠', desc: 'Score 100% on any quiz' },
  { id: 'money_master', title: 'Money Master', emoji: '👑', desc: 'Complete all learning paths' },
  { id: 'family_hero', title: 'Family Hero', emoji: '👨‍👩‍👧', desc: 'Share progress with family' },
];
