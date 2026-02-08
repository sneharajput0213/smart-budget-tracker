import { useState } from "react";

function Details({ expenses = [], onDelete}) {
  const categories = ["All Categories", "Food", "Travel", "Shopping", "Bills", "Others"];
  const [selected, setSelected] = useState("All Categories");

  const filtered =
    selected === "All Categories"
      ? expenses
      : expenses.filter((e) => e.category === selected);

  return (
    <div className="details">
      {/* HEADER */}
      <div className="details-header">
        <h2>Recent Expenses</h2>

        <div className="controls">
          <div className="filter-logo">
            <img src="/src/assets/filter.png" alt="Filter" />
          </div>

          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="expense-head">
        <span>Date</span>
        <span>Category</span>
        <span>Note</span>
        <span className="amount-col">Amount</span>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-text">No expenses found</p>
      ) : (
        <div className="expense-list">
          {filtered.map((e, i) => (
            <div key={i} className="expense-item">
              <div className="expense-date">{e.date}</div>

              <div className="category-pill">{e.category}</div>

              <div className="expense-note">{e.note || "—"}</div>

              <div className="expense-amount-wrapper">
                <span className="expense-amount">
                  ₹{Number(e.amount).toFixed(2)}
                </span>

              <button onClick={() => onDelete(e.id)} className="delete-btn">
                <img src="/src/assets/trash.png" alt="Delete" />
              </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Details;
