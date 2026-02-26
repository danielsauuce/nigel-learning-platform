<<<<<<< HEAD
# Nigel Junior | Financial Literacy Module

[![Beyond Encryption](https://img.shields.io/badge/Project%20Sponsor-Beyond%20Encryption-blue)](https://www.beyondencryption.com/)
[![Target Curriculum](https://img.shields.io/badge/Curriculum%20Ready-2028-green)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20Native%20%7C%20FastAPI-orange)](#)

> **Nigel Junior** is a ring-fenced, student-centric extension of the Nigel Smart Data agent. Developed as a Student Sprint Project, this MVP empowers secondary school students (ages 11–16) to master real-world financial concepts through gamified learning and interactive simulation.

---

## 📖 Project Overview

Financial literacy is a critical life skill often missing from traditional education. This module provides a safe, "ring-fenced" environment where students can fail safely and learn effectively before they handle real money.

### Core Objectives:

- **Engaging & Simple:** Visual-first learning designed for short attention spans.
- **Relevant:** Scenarios based on first jobs, payslips, and realistic "life shocks."
- **Measurable:** Real-time progress tracking for both students and teachers.
- **Safe-by-Design:** No real financial data; purely educational simulations.

---

## 🛠 Tech Stack

### Frontend (Mobile-First)

- **Framework:** [React Native](https://reactnative.dev/) (Expo)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based)
- **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

### Backend

- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database:** PostgreSQL with SQLAlchemy ORM
- **Auth:** JWT-based role separation (Student vs. Teacher)

---

## 🗺 User Journey & Architecture

### 1. Onboarding & Empathy

Unlike standard banking apps, we start with a **Personalization Flow** (Screens 2-4) that asks students about their "Money Worries." This aligns with the Nigel mission of supporting vulnerable households.

### 2. The Islands (Learning Map)

The curriculum is visualized as a map. Each island represents a module:

- **Budgeting Basics:** Needs vs. Wants.
- **The Tax Jungle:** Understanding Gross vs. Net pay.
- **Scam Reef:** Identifying fraud and digital safety.

### 3. The MVP Simulator

The "Life Simulator" (Screens 12-16) is the project's centerpiece. Students:

1.  **Choose a Role:** Apprentice, Retail, or Office Entry-level.
2.  **Analyze a Payslip:** Visual breakdown of Tax and National Insurance.
3.  **Build a Budget:** Distribute "Take-home pay" across food, rent, and savings.
4.  **Survive Random Events:** Unexpected costs (broken phone, birthday gifts) test their resilience.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.10+
- Expo Go App (for mobile testing)

### Installation

1. **Clone the repository**

   ```bash
   git clone [https://github.com/your-username/nigel-financial-literacy.git](https://github.com/your-username/nigel-financial-literacy.git)
   cd nigel-financial-literacy

   ```

2. **cd frontend**
   npm install
   npx expo start

## 🛡️ Security & Ring-Fencing

This project strictly adheres to the "Ring-Fenced" requirement, ensuring the student environment is isolated and secure:

- **Data Isolation:** Student data is stored in separate database schemas or tables, physically and logically isolated from core Nigel production users.
- **Zero-Risk Environment:** The app uses simulated balances only. There is **no connection** to real banking APIs, Open Banking protocols, or payment gateways.
- **Anonymity & Privacy:** We collect minimal personal data. Teacher assessment is facilitated through unique **Classroom Codes**, allowing progress tracking without compromising Student PII (Personally Identifiable Information).

---

## 📈 Future Roadmap

- **AI Mentorship:** Integration of the core **Nigel "Smart Data Agent"** to provide proactive, automated budgeting tips based on simulated spending habits.
- **Parent Mode:** A dedicated portal for guided "Conversation Starters" to help bridge the gap between school learning and home finances without social stigma.
- **Accessibility First:** Implementation of **OpenDyslexic** font support and multi-language localization to ensure no student is left behind.

---

## 🤝 Project Sponsor

**Beyond Encryption** **Project Sponsor:** Emily Plummer – Marketing Director  
**Contact:** [emily.plummer@beyondencryption.com](mailto:emily.plummer@beyondencryption.com)

> _Nigel: Converting fragmented information into proactive, money-saving actions._

---

_This project is part of a Student Sprint Project. The "Nigel" name and associated branding are trademarks of Beyond Encryption._
=======
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
git clone https://github.com/your-username/nigel-financial-literacy.git
cd nigel-financial-literacy

# Install frontend dependencies and start
cd frontend
npm install
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

Project Sponsor: Emily Plummer — Marketing Director
Contact: [emily.plummer@beyondencryption.com](mailto:emily.plummer@beyondencryption.com)

> *Nigel: Converting fragmented information into proactive, money-saving actions.*

---

## Licence

This project is part of a Student Sprint Project. The "Nigel" name and associated branding are trademarks of Beyond Encryption.
>>>>>>> v5
