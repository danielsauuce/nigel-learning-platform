# Nigel (Beyond Encryption) — Financial Literacy Module

**A gamified, mobile-first learning platform that teaches secondary school students (ages 11–16) real-world financial skills through interactive simulation.**

Nigel Junior is a ring-fenced, student-centric extension of the Nigel Smart Data agent. Developed as a Student Sprint Project and sponsored by [Beyond Encryption](https://www.beyondencryption.com/), this MVP provides a safe environment where students can practise budgeting, understand payslips, and build financial confidence — before they ever handle real money.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [User Journey](#user-journey)
- [Getting Started](#getting-started)
- [Security and Ring-Fencing](#security-and-ring-fencing)
- [Roadmap](#roadmap)
- [Project Sponsor](#project-sponsor)
- [Licence](#licence)

---

## Project Overview

Financial literacy is a critical life skill often absent from traditional education. Nigel Junior addresses this gap through four core principles:

- **Engaging and simple** — Visual-first learning designed for short attention spans
- **Relevant** — Scenarios grounded in first jobs, payslips, and realistic life events
- **Measurable** — Real-time progress tracking for students and teachers
- **Safe by design** — No real financial data; purely educational simulations

---

## Tech Stack

### Frontend (Mobile-First)

| Technology | Purpose |
|---|---|
| [React Native](https://reactnative.dev/) (Expo) | Cross-platform mobile framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe application code |
| [NativeWind](https://www.nativewind.dev/) | Tailwind CSS for React Native |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based navigation |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Performant animations |

### Backend

| Technology | Purpose |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) (Python) | REST API framework |
| PostgreSQL + SQLAlchemy | Database and ORM |
| JWT | Role-based authentication (Student vs Teacher) |

---

## User Journey

### 1. Onboarding and Personalisation

The app opens with a personalisation flow that asks students about their money worries, aligning with Nigel's mission to support vulnerable households. Responses lightly tailor the learning experience without collecting sensitive data.

### 2. The Islands (Learning Map)

The curriculum is visualised as an island map. Each island represents a topic module:

- **Budgeting Basics** — Needs vs Wants
- **The Tax Jungle** — Understanding gross vs net pay
- **Scam Reef** — Identifying fraud and digital safety

### 3. Life Simulator (MVP Centrepiece)

The simulator is the core interactive experience. Students work through four stages:

1. **Choose a role** — Apprentice, Retail, or Office entry-level
2. **Analyse a payslip** — Visual breakdown of tax and National Insurance deductions
3. **Build a budget** — Allocate take-home pay across categories (food, rent, savings) with live feedback
4. **Survive random events** — Unexpected costs (broken phone, birthday gifts) test financial resilience

---

## Getting Started

### Prerequisites

- Node.js v18+
- Python 3.10+
- Expo Go app (for mobile testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/danielsauuce/nigel-learning-platform.git
cd nigel-learning-platform

# Install workspace dependencies
npm install

# Start mobile app (Expo)
cd mobile
npx expo start
```

---

## Security and Ring-Fencing

This project adheres to strict ring-fencing requirements to ensure the student environment remains isolated and secure.

| Principle | Implementation |
|---|---|
| **Data isolation** | Student data is stored in separate database schemas, logically isolated from core Nigel production users |
| **Zero-risk environment** | Simulated balances only — no connection to real banking APIs, Open Banking protocols, or payment gateways |
| **Anonymity and privacy** | Minimal personal data collection. Progress tracking is facilitated through unique classroom codes, avoiding exposure of student PII |

---

## Roadmap

| Feature | Description |
|---|---|
| **AI Mentorship** | Integration of the core Nigel Smart Data Agent to provide proactive budgeting tips based on simulated spending habits |
| **Parent Mode** | A dedicated portal for guided conversation starters, helping bridge school learning and home finances without social stigma |
| **Accessibility** | OpenDyslexic font support and multi-language localisation to ensure no student is left behind |

---

## Project Sponsor

**Beyond Encryption**

Project Sponsor: Marketing Team
Contact: [marketing@beyondencryption.com](mailto:marketing@beyondencryption.com)

> *Nigel: Converting fragmented information into proactive, money-saving actions.*

---

## Licence

This project is part of a Student Sprint Project. The "Nigel" name and associated branding are trademarks of Beyond Encryption.
