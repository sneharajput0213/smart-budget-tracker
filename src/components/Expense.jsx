import { useState } from "react";

function Expense({ onClose, onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit() {
    if (!amount || !date) return;

    onAdd({
      amount: Number(amount),
      category,
      date,
      note
    });

    setAmount("");
    setDate("");
    setNote("");
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h3>Add New Expense</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Others</option>
          </select>

          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />


          <label>Note (Optional)</label>
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note..." />
        </div>

        <div className="modal-footer">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="submit-btn" onClick={handleSubmit}>
            + Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default Expense;
