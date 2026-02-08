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

  const highest = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="cards">
      <div className="card1">
        <div className="logo1">
          <img src="/src/assets/dollar.png" alt="Total Expenses" />
        </div>
        <p>Total Expenses</p>
        <h2>₹{totalExpenses.toFixed(2)}</h2>
      </div>

      <div className="card2">
        <div className="logo2">
          <img src="/src/assets/trend.png" alt="Highest Spending" />
        </div>
        <p>Highest Spending</p>
        <p>{highest ? highest[0] : "—"}</p>
        <h2>₹{highest ? highest[1].toFixed(2) : "0.00"}</h2>
      </div>

      <div className="card3">
        <div className="logo3">
          <img src="/src/assets/hashtag.png" alt="Transactions" />
        </div>
        <p>Transactions</p>
        <h2>{transactions}</h2>
      </div>
    </div>
  );
}

export default Cards;
