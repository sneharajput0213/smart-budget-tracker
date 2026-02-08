import { useState } from "react";
import { useEffect } from "react";
import Budget from "./Budget";
import Cards from "./Cards";
import Graph from "./Graph";
import Details from "./Details";
import Expense from "./Expense";

function Right({ selectedMonth }) {
  const [expenses, setExpenses] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const totalBudget = 2000;
  const spent = expenses.reduce((sum, e) => sum + e.amount, 0);

  function addExpense(expense) {
    setExpenses((prev) => [expense, ...prev]); // latest first
    setOpenModal(false);
  }
  
  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  useEffect(() => {
    setExpenses([]);
  }, [selectedMonth]);

  return (
    <div className="right">
      <div className="right-header">
        <div className="content">
          <h1>Dashboard</h1>
          <p>Track your expenses and manage your budget</p>
        </div>

        <button
          className="add-btn"
          onClick={() => setOpenModal(true)}
        >
          + Add Expense
        </button>
      </div>

      {openModal && (
        <Expense
          onClose={() => setOpenModal(false)}
          onAdd={addExpense}
        />
      )}

      <Budget total={totalBudget} spent={spent} />
      <Cards expenses={expenses} />
      <Graph expenses={expenses} />
      <Details expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}

export default Right;
