# Nigel Financial Literacy Frontend

This repository contains the official frontend application for **Nigel Financial Literacy**, a ring-fenced educational mobile app designed for UK secondary school students (ages 11–16) to learn practical money skills in a safe, engaging, and gamified way.

The app is built with **React Native + Expo** and styled using **NativeWind (Tailwind CSS)**, delivering a modern, accessible, and mobile-first experience that aligns with the 2028 UK curriculum readiness goals.

## Implemented Features

- **Role-based Entry**: Student and Teacher paths with secure onboarding
- **Personalized Onboarding**: Name, year group, emotional worries survey, learning style selection
- **Gamified Learning Journey**: Island-based map with progressive unlocks, interactive lessons, quizzes, and badges
- **Payslip Simulator (Core MVP)**: Realistic job selection, payslip breakdown, budget builder, random "Real Life Happens" events, and 3-month results with compound interest teaser
- **Progress & Achievements**: Skills tree, streak tracking, activity calendar, badge gallery
- **Teacher Dashboard**: Class overview, anonymized student progress, export reports
- **Parent Engagement**: "Family Money Talks" – non-shameful conversation starters with shareable packs
- **Accessibility & Inclusivity**: Dark mode, dyslexia-friendly font, high contrast, large touch targets, WCAG AA compliance
- **Additional Tools**: Daily money tips, scam awareness database, debt & credit basics education

## Tech Stack

This project is built using the following technologies:

- **Framework**: React Native with Expo SDK
- **Language**: TypeScript
- **Styling**: Tailwind CSS via NativeWind
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: Context API
- **Form Validation**: Zod + React Hook Form
- **Icons**: lucide-react-native
- **Animations**: Framer Motion / Reanimated
- **Charts**: react-native-chart-kit
- **Haptics**: expo-haptics
- **Utilities**: expo-linear-gradient

## Project Structure

The project follows a clean, scalable structure:

- `app/` – Expo Router screens and navigation logic (if using Expo Router)
- `src/`
  - `assets/` – images, fonts, icons, animations
  - `components/` – reusable UI (atoms, molecules, organisms)
  - `navigation/` – AppNavigator, screen types
  - `screens/` – all feature screens (onboarding, dashboard, simulator, etc.)
  - `features/` – domain logic slices (auth, progress, simulator, etc.)
  - `hooks/` – custom hooks (useTheme, useProgress, etc.)
  - `store/` – Zustand global state stores
  - `lib/` – constants, theme, utils
  - `types/` – shared TypeScript types

## Installation

Follow these steps to get the project running locally.

1. Clone the repository

   ```bash
   git clone https://github.com/danielsauuce/nigel-financial-literacy-frontend
