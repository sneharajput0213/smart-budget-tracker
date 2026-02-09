/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import {
  loadExpensesFromStorage,
  saveExpensesToStorage,
  loadBudgetsFromStorage,
  saveBudgetsToStorage,
  loadCategoriesFromStorage,
  saveCategoriesToStorage,
  loadCategoryLimitsFromStorage,
  saveCategoryLimitsToStorage,
  loadYearFromStorage,
  saveYearToStorage,
  clearAllStorage,
  getDefaultBudget,
  DEFAULT_CATEGORIES,
  generateId,
  MONTHS,
} from "../utils/storage";

const BudgetContext = createContext(null);

function budgetReducer(state, action) {
  switch (action.type) {
    case "LOAD": {
      return {
        ...state,
        expensesByMonth: action.payload.expensesByMonth ?? state.expensesByMonth,
        budgetsByMonth: action.payload.budgetsByMonth ?? state.budgetsByMonth,
        categories: action.payload.categories ?? state.categories,
        categoryLimits: action.payload.categoryLimits ?? state.categoryLimits,
        selectedYear: action.payload.selectedYear ?? state.selectedYear,
      };
    }
    case "SET_SELECTED_MONTH": {
      return { ...state, selectedMonth: action.payload };
    }
    case "SET_SELECTED_YEAR": {
      const year = action.payload;
      if (typeof year === "number" && year >= 1970 && year <= 2100) {
        saveYearToStorage(year);
        return { ...state, selectedYear: year };
      }
      return state;
    }
    case "SET_BUDGET": {
      const { month, amount } = action.payload;
      const next = {
        ...state.budgetsByMonth,
        [month]: typeof amount === "number" && amount > 0 ? amount : getDefaultBudget(),
      };
      saveBudgetsToStorage(next);
      return { ...state, budgetsByMonth: next };
    }
    case "ADD_EXPENSE": {
      const { month, expense } = action.payload;
      const list = state.expensesByMonth[month] ?? [];
      const withId = { ...expense, id: expense.id || generateId() };
      const nextList = [withId, ...list];
      const next = { ...state.expensesByMonth, [month]: nextList };
      saveExpensesToStorage(next);
      return { ...state, expensesByMonth: next };
    }
    case "DELETE_EXPENSE": {
      const { month, id } = action.payload;
      const list = state.expensesByMonth[month] ?? [];
      const nextList = list.filter(
        (e) => (e.id != null ? e.id !== id : `${e.date}-${e.amount}` !== id)
      );
      const next = { ...state.expensesByMonth, [month]: nextList };
      saveExpensesToStorage(next);
      return { ...state, expensesByMonth: next };
    }
    case "ADD_CATEGORY": {
      const { category } = action.payload;
      if (state.categories.includes(category)) return state;
      const next = [...state.categories, category];
      saveCategoriesToStorage(next);
      return { ...state, categories: next };
    }
    case "DELETE_CATEGORY": {
      const { category } = action.payload;
      if (DEFAULT_CATEGORIES.includes(category)) return state; // Can't delete default
      const next = state.categories.filter((c) => c !== category);
      saveCategoriesToStorage(next);
      const nextLimits = { ...state.categoryLimits };
      delete nextLimits[category];
      saveCategoryLimitsToStorage(nextLimits);
      return { ...state, categories: next, categoryLimits: nextLimits };
    }
    case "SET_CATEGORY_LIMIT": {
      const { category, limit } = action.payload;
      const next = {
        ...state.categoryLimits,
        [category]: typeof limit === "number" && limit > 0 ? limit : null,
      };
      if (!next[category]) delete next[category];
      saveCategoryLimitsToStorage(next);
      return { ...state, categoryLimits: next };
    }
    case "CLEAR_MONTH_EXPENSES": {
      const { month } = action.payload;
      const next = { ...state.expensesByMonth };
      delete next[month];
      saveExpensesToStorage(next);
      return { ...state, expensesByMonth: next };
    }
    case "RESET_ALL": {
      clearAllStorage();
      return {
        ...initialState,
        selectedMonth: state.selectedMonth,
        selectedYear: loadYearFromStorage(),
      };
    }
    default:
      return state;
  }
}

const initialState = {
  selectedMonth: MONTHS[new Date().getMonth()],
  selectedYear: loadYearFromStorage(),
  expensesByMonth: {},
  budgetsByMonth: {},
  categories: DEFAULT_CATEGORIES,
  categoryLimits: {},
};

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOAD",
      payload: {
        expensesByMonth: loadExpensesFromStorage(),
        budgetsByMonth: loadBudgetsFromStorage(),
        categories: loadCategoriesFromStorage(),
        categoryLimits: loadCategoryLimitsFromStorage(),
        selectedYear: loadYearFromStorage(),
      },
    });
  }, []);

  const expensesForSelectedMonth = useMemo(() => {
    const monthExpenses = state.expensesByMonth[state.selectedMonth] ?? [];
    const monthIndex = MONTHS.indexOf(state.selectedMonth);

    // Filter expenses by both year and month from their date field
    return monthExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === state.selectedYear &&
        expenseDate.getMonth() === monthIndex
      );
    });
  }, [state.expensesByMonth, state.selectedMonth, state.selectedYear]);

  const budgetForSelectedMonth = useMemo(() => {
    const val = state.budgetsByMonth[state.selectedMonth];
    return typeof val === "number" && val > 0 ? val : getDefaultBudget();
  }, [state.budgetsByMonth, state.selectedMonth]);

  const value = useMemo(
    () => ({
      months: MONTHS,
      selectedMonth: state.selectedMonth,
      selectedYear: state.selectedYear,
      setSelectedMonth: (month) => dispatch({ type: "SET_SELECTED_MONTH", payload: month }),
      setSelectedYear: (year) => dispatch({ type: "SET_SELECTED_YEAR", payload: year }),
      expensesByMonth: state.expensesByMonth,
      budgetsByMonth: state.budgetsByMonth,
      expensesForSelectedMonth,
      budgetForSelectedMonth,
      categories: state.categories,
      categoryLimits: state.categoryLimits,
      setBudget: (month, amount) => dispatch({ type: "SET_BUDGET", payload: { month, amount } }),
      addExpense: (month, expense) =>
        dispatch({ type: "ADD_EXPENSE", payload: { month, expense } }),
      deleteExpense: (month, id) =>
        dispatch({ type: "DELETE_EXPENSE", payload: { month, id } }),
      addCategory: (category) => dispatch({ type: "ADD_CATEGORY", payload: { category } }),
      deleteCategory: (category) => dispatch({ type: "DELETE_CATEGORY", payload: { category } }),
      setCategoryLimit: (category, limit) =>
        dispatch({ type: "SET_CATEGORY_LIMIT", payload: { category, limit } }),
      clearMonthExpenses: (month) =>
        dispatch({ type: "CLEAR_MONTH_EXPENSES", payload: { month } }),
      resetAll: () => dispatch({ type: "RESET_ALL" }),
    }),
    [
      state.selectedMonth,
      state.selectedYear,
      state.expensesByMonth,
      state.budgetsByMonth,
      state.categories,
      state.categoryLimits,
      expensesForSelectedMonth,
      budgetForSelectedMonth,
    ]
  );

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error("useBudget must be used within BudgetProvider");
  return ctx;
}
