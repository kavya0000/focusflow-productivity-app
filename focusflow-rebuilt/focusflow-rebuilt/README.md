# FocusFlow – Productivity App

FocusFlow is a responsive productivity dashboard that combines a Pomodoro timer, a personal task list, daily focus input, and a smart task-time estimator.

## Features

- **Pomodoro timer:** 25-minute focus sessions and 5-minute short breaks, with start, pause, reset, and completion messages.
- **Task management:** Add, complete, and delete tasks.
- **Progress tracking:** Live completed-task count and progress bar.
- **Daily focus:** Save a short focus intention in the browser.
- **Smart task estimator:** Provides a local, rule-based approximate duration from task keywords and complexity cues. It works without an API key and is not a generative AI integration.
- **Local persistence:** Tasks and daily focus are saved in browser localStorage.
- **Responsive UI:** Desktop and mobile layouts.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Browser localStorage
- Vercel-ready static build

## Run Locally

1. Install Node.js (LTS).
2. Extract this repository.
3. Open a terminal in the project folder.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production Build

```bash
npm run build
npm run preview
```

The production output is generated in the `dist` folder.

## Deployment

Import the repository into Vercel. Use the following settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

No environment variables or API keys are required.

## Note on Estimates

The task estimator uses transparent, keyword-based rules to suggest an approximate duration. It does not call an external AI provider. Estimates are planning suggestions and should be adjusted to the task and the user's experience.

## License

Add a license if you intend to distribute this project publicly.
