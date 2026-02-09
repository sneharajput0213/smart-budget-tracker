import { useState } from "react";
import { useBudget } from "../context/BudgetContext";
import ExpenseModal from "../components/ExpenseModal";
import Details from "../components/Details";

export default function Expenses() {
  const {
    expensesForSelectedMonth,
    selectedMonth,
    selectedYear,
    addExpense,
    deleteExpense,
    categories,
    months,
  } = useBudget();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (expense) => {
    // Derive month safely from YYYY-MM-DD string
    const [, month] = expense.date.split("-");
    const monthIndex = parseInt(month, 10) - 1;
    const monthName = months[monthIndex];

    addExpense(monthName || selectedMonth, expense);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteExpense(selectedMonth, id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Expenses</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Add and manage expenses for {selectedMonth}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand hover:bg-brand-dark text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          <span className="text-lg leading-none">+</span>
          Add Expense
        </button>
      </div>

      {modalOpen && (
        <ExpenseModal
          onClose={() => setModalOpen(false)}
          onAdd={handleAdd}
          categories={categories}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      )}

      <Details
        expenses={expensesForSelectedMonth}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
}
