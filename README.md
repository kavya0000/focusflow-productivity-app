# FocusFlow – Productivity & Focus Management App

FocusFlow is a modern, responsive productivity dashboard designed to help users organize daily tasks, manage their time effectively, and maintain better focus through structured work sessions.

It combines a Pomodoro timer, personal task management, daily focus planning, progress tracking, and a smart task-time estimator in one simple interface.

## 🚀 Live Demo

**Live Website:** https://focusflow-app-phi.vercel.app/

**GitHub Repository:** https://github.com/kavya0000/focusflow-productivity-app

**Hosting Platform:** Vercel

**Production Deployment:** https://focusflow-8mi1ag60v-poleboina-kavyas-projects.vercel.app

## ✨ Features

### 1. Pomodoro Timer
- 25-minute focused work sessions.
- 5-minute short breaks.
- Start, pause, and reset controls.
- Countdown timer with session status.
- Completion messages to encourage productivity.

### 2. Task Management
- Add new tasks.
- Mark tasks as completed.
- Delete tasks.
- View completed and pending tasks.
- Track daily task progress.

### 3. Progress Tracking
- Real-time completed-task count.
- Total task count.
- Completion percentage.
- Visual progress indicator.

### 4. Focus of the Day
- Set a personal daily focus intention.
- Keep your most important goal visible.
- Save your focus intention in browser localStorage.

### 5. Smart Task Estimator
- Enter a task description.
- Receive an approximate time estimate.
- View an estimation confidence level.
- Uses local, rule-based keyword and complexity analysis.
- Works directly in the browser without an API key.

**Note:** The estimator is a rule-based planning tool, not a generative AI integration. Its estimates are approximate and should be adjusted according to task complexity and individual experience.

### 6. Local Data Persistence
- Tasks are saved using browser localStorage.
- Daily focus intentions are saved locally.
- Data remains available after refreshing the page in the same browser.

### 7. Responsive User Interface
- Modern and minimalist design.
- Clean typography and visual hierarchy.
- Responsive desktop and mobile layouts.
- Simple and user-friendly interactions.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic and interactions |
| Vite | Development server and build tool |
| CSS3 | Styling and responsive layouts |
| Browser localStorage | Client-side data persistence |
| Git | Version control |
| GitHub | Source code repository |
| Vercel | Production hosting and deployment |

## 📁 Project Structure

```text
focusflow-productivity-app/
│
├── src/
│   ├── main.jsx
│   └── styles.css
│
├── .gitignore
├── README.md
├── index.html
├── package.json
├── package-lock.json
└── vercel.json
```

## 💻 Run Locally

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/kavya0000/focusflow-productivity-app.git
```

### 2. Navigate to the project directory

```bash
cd focusflow-productivity-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

```text
http://localhost:5173
```

## 🏗️ Production Build

To create an optimized production build, run:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The production files are generated inside the `dist` directory.

## 🌐 Deployment

FocusFlow is deployed using **Vercel**.

### Deployment Configuration

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | npm run build |
| Output Directory | dist |
| Install Command | npm install |
| Root Directory | ./ |

### Deployment Steps

1. Push the project source code to GitHub.
2. Import the GitHub repository into Vercel.
3. Select Vite as the framework preset.
4. Configure the build command and output directory.
5. Deploy the application.

### Deploy Using Vercel CLI

Install the Vercel CLI if needed:

```bash
npm install -g vercel
```

Log in to Vercel:

```bash
vercel login
```

Deploy to production:

```bash
vercel --prod
```

No environment variables or external API keys are required for the current application.

## 🔒 Data & Privacy

- The application uses browser localStorage for task and daily focus persistence.
- No external AI API is required for task estimation.
- No backend database is configured in the current version.
- User data is stored locally in the browser.

## 🎯 Project Objectives

The main objectives of FocusFlow are:

- Encourage better time management.
- Improve concentration through structured focus sessions.
- Simplify daily task organization.
- Help users estimate task duration.
- Track productivity and daily progress.
- Provide a simple and accessible productivity experience.

## 🚀 Future Enhancements

Potential improvements include:

- Dynamic daily priority recommendations.
- Task priority categories.
- Focus session history and analytics.
- Browser notifications for completed sessions.
- Dark mode.
- Cloud-based task synchronization.
- Advanced productivity reports.

## 👩‍💻 Author

**Kavya Poleboina**

GitHub: https://github.com/kavya0000

LinkedIn: https://www.linkedin.com/in/poleboinakavya1a31a9347/

## 📄 License

This project currently does not include a formal open-source license. Add a license if you intend to distribute or permit reuse of the source code.

---

**FocusFlow – A little more focus, every day.** ✨
