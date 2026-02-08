function Budget({ total, spent }) {
  const remaining = total - spent;
  const percent =
    total > 0 ? Math.min((spent / total) * 100, 100).toFixed(1) : 0;

  return (
    <div className="budget">
      <h2>Monthly Budget</h2>

      <div className="budget-stats">
        <div>
          <p>Total Budget</p>
          <h3>₹{total}</h3>
        </div>

        <div>
          <p>Spent</p>
          <h3 className="spent">₹{spent.toFixed(2)}</h3>
        </div>

        <div>
          <p>Remaining</p>
          <h3 className="remaining">{remaining.toFixed(2)}</h3>
        </div>
      </div>

      <p className="used-text">{percent}% used</p>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Budget;
