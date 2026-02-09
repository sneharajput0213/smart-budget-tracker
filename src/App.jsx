import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BudgetProvider, useBudget } from "./context/BudgetContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Left from "./components/Left";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const PAGES = {
  dashboard: Dashboard,
  expenses: Expenses,
  categories: Categories,
  reports: Reports,
  settings: Settings,
};

function AppContent() {
  const [activeView, setActiveView] = useState("dashboard");
  const { selectedMonth } = useBudget();
  const Page = PAGES[activeView] ?? Dashboard;

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Left activeView={activeView} onNavigate={setActiveView} />
        <main className="flex-1 overflow-y-auto p-6">
          {activeView === "settings" ? (
            <Settings key={selectedMonth} />
          ) : (
            <Page />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BudgetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BudgetProvider>
  );
}
