# Smart Budget Tracker

A production-ready, month-wise expense and budget tracking web app. Set a monthly budget, log expenses by category, and view reports—all with data persisted in the browser.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)

---

## Features

- **Month-wise workflow** – Month is selected in the navbar; year is set in Settings. When adding an expense, you only pick the day (no invalid dates).
- **Monthly budget** – Set and edit budget per month from Settings.
- **Expense tracking** – Add expenses with amount, category, date (day only), and optional note. Edit/delete from the Expenses page.
- **Categories** – Default categories (Food, Travel, Shopping, Bills, Others); add custom categories and optional per-category limits.
- **Dashboard** – Overview of spent vs budget, alerts (over budget / near limit), recent expenses, and category breakdown.
- **Reports** – Spending by category and trends across months.
- **Persistent storage** – All data stored in `localStorage` (no backend required).
- **Responsive UI** – Layout and navigation work on desktop and mobile.

---

## Tech Stack

| Layer      | Technology        |
|-----------|-------------------|
| Framework | React 19          |
| Build     | Vite 7            |
| Styling   | Tailwind CSS 4    |
| Charts    | Recharts          |
| Storage   | Browser localStorage |

---

## Prerequisites

- **Node.js** ≥ 18  
- **npm** (or yarn/pnpm)

---

## Quick Start

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs the app at [http://localhost:5173](http://localhost:5173) (or the next available port).

### Production build

```bash
npm run build
```

Output is in the `dist/` folder. Serve with any static host (e.g. `npx serve dist` or your CDN).

### Preview production build locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project structure

```
src/
├── App.jsx              # Root app, routing, BudgetProvider
├── main.jsx             # Entry point
├── index.css            # Global + Tailwind
├── context/
│   └── BudgetContext.jsx # Global state (month, year, expenses, budgets, categories)
├── components/
│   ├── Budget.jsx       # Budget summary block
│   ├── Cards.jsx        # Summary cards
│   ├── Details.jsx      # Expense list with delete
│   ├── ExpenseModal.jsx # Add-expense modal (day-only date)
│   ├── Graph.jsx        # Spending chart
│   ├── Left.jsx         # Sidebar navigation
│   └── Navbar.jsx       # Top bar + month selector
├── pages/
│   ├── Dashboard.jsx    # Overview, alerts, recent expenses
│   ├── Expenses.jsx     # Add/delete expenses
│   ├── Categories.jsx   # Categories and limits
│   ├── Reports.jsx     # Reports and trends
│   └── Settings.jsx     # Year, budget, clear/reset
└── utils/
    └── storage.js       # localStorage helpers, date helpers
```

---

## How date selection works

- **Month** – Chosen in the navbar (auto-defaults to current month).
- **Year** – Set once in **Settings** and used for all expense dates.
- **Day** – When adding an expense, you only **select the day** (e.g. 1–31). The list of days is valid for the current month/year (e.g. Feb 1–28/29, Apr/Jun/Sep/Nov 1–30).

So the app is strictly **month-wise**: no free-typing of dates, no invalid days.

---

## Deployment

1. Run `npm run build`.
2. Deploy the contents of `dist/` to any static hosting (Vercel, Netlify, GitHub Pages, S3 + CloudFront, etc.).
3. If the app is not at the domain root, set the `base` option in `vite.config.js` to match your path (e.g. `base: '/smart-budget/'`).

No environment variables or backend are required; data stays in the user’s browser.

---

## Browser support

Modern browsers that support ES modules, React 19, and the APIs used by Vite and Tailwind. Testing is recommended on recent Chrome, Firefox, Safari, and Edge.

---

## License

MIT.
