const STORAGE_PREFIX = "smart-budget";
const EXPENSES_KEY = `${STORAGE_PREFIX}-expenses`;
const BUDGET_KEY = `${STORAGE_PREFIX}-budget`;
const CATEGORIES_KEY = `${STORAGE_PREFIX}-categories`;
const CATEGORY_LIMITS_KEY = `${STORAGE_PREFIX}-category-limits`;
const YEAR_KEY = `${STORAGE_PREFIX}-year`;
const DEFAULT_BUDGET = 2000;

export function loadExpensesFromStorage() {
  try {
    const raw = localStorage.getItem(EXPENSES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveExpensesToStorage(expensesByMonth) {
  try {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expensesByMonth));
  } catch {
    // ignore
  }
}

export function loadBudgetsFromStorage() {
  try {
    const raw = localStorage.getItem(BUDGET_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveBudgetsToStorage(budgetsByMonth) {
  try {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budgetsByMonth));
  } catch {
    // ignore
  }
}

export function getDefaultBudget() {
  return DEFAULT_BUDGET;
}

export const DEFAULT_CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Others"];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Get 1-based month index (1–12) from month name. */
export function getMonthIndex(monthName) {
  const i = MONTHS.indexOf(monthName);
  return i >= 0 ? i + 1 : new Date().getMonth() + 1;
}

/** Days in month for given month name and year (handles leap year for February). */
export function getDaysInMonth(monthName, year) {
  const monthIndex = getMonthIndex(monthName);
  const y = Number(year);
  if (Number.isNaN(y) || y < 1) return 31;
  const last = new Date(y, monthIndex, 0);
  return last.getDate();
}

/** Build YYYY-MM-DD from selected day, month name, and year. */
export function buildDateString(day, monthName, year) {
  const m = getMonthIndex(monthName);
  const d = Number(day);
  const y = Number(year);
  if (Number.isNaN(d) || Number.isNaN(y) || d < 1) return "";
  const maxDay = getDaysInMonth(monthName, year);
  const safeDay = Math.min(Math.max(1, d), maxDay);
  return `${y}-${String(m).padStart(2, "0")}-${String(safeDay).padStart(2, "0")}`;
}

export function loadYearFromStorage() {
  try {
    const raw = localStorage.getItem(YEAR_KEY);
    if (raw == null || raw === "") return new Date().getFullYear();
    const y = parseInt(raw, 10);
    return Number.isInteger(y) && y >= 1970 && y <= 2100 ? y : new Date().getFullYear();
  } catch {
    return new Date().getFullYear();
  }
}

export function saveYearToStorage(year) {
  try {
    localStorage.setItem(YEAR_KEY, String(year));
  } catch {
    // ignore
  }
}

export function loadCategoriesFromStorage() {
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (!raw) return DEFAULT_CATEGORIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export function saveCategoriesToStorage(categories) {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch {
    // ignore
  }
}

export function loadCategoryLimitsFromStorage() {
  try {
    const raw = localStorage.getItem(CATEGORY_LIMITS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCategoryLimitsToStorage(limits) {
  try {
    localStorage.setItem(CATEGORY_LIMITS_KEY, JSON.stringify(limits));
  } catch {
    // ignore
  }
}

export function clearAllStorage() {
  try {
    localStorage.removeItem(EXPENSES_KEY);
    localStorage.removeItem(BUDGET_KEY);
    localStorage.removeItem(CATEGORIES_KEY);
    localStorage.removeItem(CATEGORY_LIMITS_KEY);
    localStorage.removeItem(YEAR_KEY);
  } catch {
    // ignore
  }
}

export function generateId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
