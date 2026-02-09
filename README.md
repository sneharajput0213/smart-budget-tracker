# Smart Budget – Expense & Budget Tracker

Smart Budget is a production-ready, month-wise expense and budget tracking web application. It allows users to set monthly budgets, log expenses by category, and visualize spending habits with built-in reports, all while keeping data securely persisted in the browser's local storage.

## Key Features

- **Expense Management**: Log expenses with amount, category, date, and notes.
- **Budget Tracking**: Set monthly budget limits and track spending in real-time.
- **Category Limits**: Define custom categories and set specific spending limits per category.
- **Interactive Reports**: Visualize spending distribution with charts and detailed insights.
- **Dark & Light Mode**: Fully optimized UI with built-in theme support for all environments.
- **Data Persistence**: All data is stored locally in the browser, requiring no backend or account creation.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Charts**: Recharts
- **Date Handling**: date-fns

## How to Run Locally

- **Prerequisites**: Node.js 18+ and npm

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

5. **Lint the Project**:
   ```bash
   npm run lint
   ```

The development server runs at `http://localhost:5173`. Production-ready build artifacts are output to the `dist/` folder.

**Commit & Push Changes**

Set your local git identity and push to the configured remote:

```bash
# set author info (local repo)
git config user.name "ashishjha1304"
git config user.email "ashishjha1304@outlook.com"

# commit and push
git add .
git commit -m "chore: production readiness fixes (lint, build)" || true
git push origin HEAD
```

Note: ensure you have push access to the repository or correct remote configured.
