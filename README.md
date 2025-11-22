<div align="center">

  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />

  <br />
  <br />

  <h1 style="font-size: 3rem; font-weight: 800;">🚀 Full Stack 60-Day Tracker</h1>

  <p>
    A gamified, data-driven dashboard to track your journey from Zero to Full Stack Master.
    <br />
    Built with <strong>React</strong>, <strong>Recharts</strong>, and <strong>Local Persistence</strong>.
  </p>

  <a href="#-features"><strong>Explore the features »</strong></a>
  <br />
  <br />
  
  <a href="https://your-live-demo-link.com">View Live Demo</a>
  ·
  <a href="https://github.com/your-username/your-repo/issues">Report Bug</a>
  ·
  <a href="https://github.com/your-username/your-repo/issues">Request Feature</a>
</div>

<br />

## ⚡ Overview

This application is not just a to-do list; it's an **accountability partner**. Designed for students undertaking the "60-Day Full Stack Challenge," this dashboard provides visual analytics, streak tracking, and a flexible scheduling system that adapts to real life.

It runs entirely on the **Frontend**, utilizing advanced LocalStorage management to persist user progress, themes, and preferences without a backend.

## ✨ Key Features

### 📊 Visual Analytics & Tracking
* **Burn-up Charts:** Real-time `Recharts` visualization of your cumulative progress vs. time.
* **Completion Ratio:** Bar charts displaying your remaining workload.
* **Daily Breakdown:** Detailed sub-topics for every single day (Day 0 - Day 59).

### 🎮 Gamification & Logic
* **Smart Skip System:** Life happens. Users can "Skip" a day, which pauses the curriculum without breaking the app logic. The UI greyscale's the day and disables interaction until "Unskipped."
* **Streak Counter:** Keeps you motivated by tracking consecutive active days.
* **Confetti Celebrations:** Visual rewards upon completing daily tasks.

### 🎨 Modern UX/UI
* **System-Sync Dark Mode:** Automatically detects OS preference (Light/Dark) on first load, with a manual toggle.
* **Custom Avatars:** Choose from Dicebear presets or upload your own image (with size validation).
* **Live News Ticker:** `Marquee` component displaying motivation and tips.
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Core** | React 18, Vite |
| **Styling** | Tailwind CSS, CLSX, Tailwind-Merge |
| **Animations** | Framer Motion, React Confetti, React Fast Marquee |
| **Visualization** | Recharts (Area & Bar Charts) |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |
| **State/Storage** | React Hooks (useState, useEffect), LocalStorage |

## 📸 Screenshots

| **Dashboard (Dark Mode)** | **Visual Analytics** |
|:---:|:---:|
| ![Dashboard](https://placehold.co/600x400/1e293b/ffffff?text=Dashboard+Preview) | ![Analytics](https://placehold.co/600x400/1e293b/ffffff?text=Charts+Preview) |

| **Onboarding Screen** | **Skip Logic (Greyscale)** |
|:---:|:---:|
| ![Onboarding](https://placehold.co/600x400/1e293b/ffffff?text=Onboarding+Flow) | ![Skip Logic](https://placehold.co/600x400/1e293b/ffffff?text=Skip+Day+Disabled) |

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/your-username/full-stack-tracker.git](https://github.com/your-username/full-stack-tracker.git)
    ```
2.  **Navigate to the directory**
    ```bash
    cd full-stack-tracker
    ```
3.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```text
src/
├── components/
│   └── Dashboard.jsx       # The monolith component containing logic & UI
├── assets/                 # Static images
├── App.jsx                 # Root entry
├── main.jsx                # React DOM render
└── index.css               # Tailwind directives & Scrollbar custom styles
