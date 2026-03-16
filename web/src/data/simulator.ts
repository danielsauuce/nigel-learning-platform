/**
 * Simulator Data — mirrors mobile budget simulator data exactly.
 *
 * JobRoles from mobile/src/components/student/simulator/SimulatorScreen.tsx
 * BudgetCategories from mobile/src/components/student/budget-builder/BudgetBuilderScreen.tsx
 */

import type { JobRole, BudgetCategory } from "../types";

export const TAKE_HOME = 2195; // monthly £ (matches mobile)

export const JOBS: JobRole[] = [
  {
    key: "teacher",
    title: "Teacher",
    emoji: "👩‍🏫",
    salary: "£28,000",
    description: "Educate and inspire students",
    bg: "#F3F0FF",
  },
  {
    key: "developer",
    title: "Developer",
    emoji: "💻",
    salary: "£38,000",
    description: "Build websites and apps",
    bg: "#FDE8E4",
  },
  {
    key: "nurse",
    title: "Nurse",
    emoji: "🏥",
    salary: "£30,000",
    description: "Care for patients in hospitals",
    bg: "#FFF8E8",
  },
  {
    key: "designer",
    title: "Designer",
    emoji: "🎨",
    salary: "£32,000",
    description: "Create visual experiences",
    bg: "#F3F0FF",
  },
];

export function createBudgetCategories(): BudgetCategory[] {
  return [
    {
      key: "rent",
      label: "Rent & Bills",
      emoji: "🏠",
      color: "#B9A7F8",
      max: 1200,
      step: 25,
      recommended: 770,
      value: 0,
      tip: "Try to keep housing under 35% of your income!",
    },
    {
      key: "food",
      label: "Food & Groceries",
      emoji: "🛒",
      color: "#4CAF50",
      max: 600,
      step: 10,
      recommended: 330,
      value: 0,
      tip: "Meal planning can save you £50+ per month.",
    },
    {
      key: "transport",
      label: "Transport",
      emoji: "🚌",
      color: "#2196F3",
      max: 400,
      step: 10,
      recommended: 175,
      value: 0,
      tip: "Compare bus passes vs pay-as-you-go to find the cheapest option.",
    },
    {
      key: "phone",
      label: "Phone & Internet",
      emoji: "📱",
      color: "#FF9800",
      max: 200,
      step: 5,
      recommended: 55,
      value: 0,
      tip: "SIM-only deals are much cheaper than contract phones.",
    },
    {
      key: "savings",
      label: "Savings",
      emoji: "🐷",
      color: "#F7B6B6",
      max: 800,
      step: 25,
      recommended: 440,
      value: 0,
      tip: "Aim to save at least 20% — future you will thank you!",
    },
    {
      key: "fun",
      label: "Fun & Social",
      emoji: "🎉",
      color: "#F7E6B6",
      max: 500,
      step: 10,
      recommended: 220,
      value: 0,
      tip: "Budget for fun so you don't feel guilty spending it!",
    },
    {
      key: "clothes",
      label: "Clothes & Personal",
      emoji: "👕",
      color: "#9C27B0",
      max: 300,
      step: 10,
      recommended: 110,
      value: 0,
      tip: "A capsule wardrobe can keep this cost low.",
    },
    {
      key: "emergency",
      label: "Emergency Fund",
      emoji: "🚨",
      color: "#F44336",
      max: 400,
      step: 25,
      recommended: 95,
      value: 0,
      tip: "Even £10/month builds a safety net over time.",
    },
  ];
}

/** Life events — same as mobile LifeEventScreen random events */
export const LIFE_EVENTS = [
  { title: "Phone Screen Smashed!", cost: 80, desc: "Oops! You dropped your phone. That's going to cost you." },
  { title: "Friend's Birthday!", cost: 30, desc: "You forgot you needed to buy a gift for your best mate." },
  { title: "Train Strike!", cost: 20, desc: "You had to take an expensive taxi to get to work." },
  { title: "Boiler Breakdown!", cost: 120, desc: "Your heating broke! Cold showers until it's fixed." },
  { title: "Surprise Vet Bill!", cost: 90, desc: "Your pet needed an emergency vet visit." },
];
