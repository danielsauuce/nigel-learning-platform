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
