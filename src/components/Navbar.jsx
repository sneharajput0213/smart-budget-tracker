function Navbar({ months, selectedMonth, onMonthChange }) {
  return (
    <div className="navbar">
      <h1>Smart Budget</h1>

      <div className="navbar-right">
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <div className="logo">
          <img src="/src/assets/person.png" alt="Profile" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
