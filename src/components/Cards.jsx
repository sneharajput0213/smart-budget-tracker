import { useEffect, useState } from "react";

function Cards({ expenses }) {
  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );
  const transactions = expenses.length;
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});
  const highest = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm hover:shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 md:w-7 md:h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
        <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
          ₹{totalExpenses.toFixed(2)}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm hover:shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
          {/* Prefer a PNG at /highest-spending.png if present (keeps same size/alignment); fall back to SVG icon */}
          {/** image detection uses client-side check so layout stays stable and unchanged **/}
          <HighestIcon />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Highest Spending</p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-0.5">
          {highest ? highest[0] : "—"}
        </p>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          ₹{highest ? highest[1].toFixed(2) : "0.00"}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm hover:shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 md:w-7 md:h-7 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Transactions</p>
        <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
          {transactions}
        </p>
      </div>
    </div>
  );
}

export default Cards;

function HighestIcon() {
  const [imgAvailable, setImgAvailable] = useState(false);

  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.src = "/highest-spending.png";
    img.onload = () => mounted && setImgAvailable(true);
    img.onerror = () => mounted && setImgAvailable(false);
    return () => {
      mounted = false;
    };
  }, []);

  if (imgAvailable) {
    return (
      <img
        src="/highest-spending.png"
        alt="Highest spending"
        className="w-6 h-6 md:w-7 md:h-7 object-contain"
      />
    );
  }

  return (
    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}
