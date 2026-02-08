import { useState, useMemo } from "react";
import { getDaysInMonth, buildDateString } from "../utils/storage";

export default function ExpenseModal({ onClose, onAdd, categories, selectedMonth, selectedYear }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories?.[0] ?? "Food");
  const [selectedDay, setSelectedDay] = useState("");
  const [note, setNote] = useState("");

  const isReady = Boolean(selectedMonth && selectedYear);
  const daysInMonth = useMemo(
    () => (isReady ? getDaysInMonth(selectedMonth, selectedYear) : 0),
    [isReady, selectedMonth, selectedYear]
  );
  const dayOptions = useMemo(
    () => (daysInMonth > 0 ? Array.from({ length: daysInMonth }, (_, i) => i + 1) : []),
    [daysInMonth]
  );
  const dateString = useMemo(
    () => (selectedDay && isReady ? buildDateString(Number(selectedDay), selectedMonth, selectedYear) : ""),
    [selectedDay, isReady, selectedMonth, selectedYear]
  );

  const handleSubmit = () => {
    const numAmount = Number(amount);
    if (!amount || Number.isNaN(numAmount) || numAmount <= 0 || !dateString) return;
    onAdd({
      amount: numAmount,
      category,
      date: dateString,
      note: (note || "").trim(),
    });
    setAmount("");
    setCategory(categories?.[0] ?? "Food");
    setSelectedDay("");
    setNote("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add New Expense</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              {(categories || []).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Month and Year are auto-selected from settings.
            </p>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              disabled={!isReady}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand disabled:bg-gray-100 disabled:cursor-not-allowed"
              aria-label="Select day of month"
            >
              <option value="">Select day</option>
              {dayOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!dateString}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}
