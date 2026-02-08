import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Food: "#10B981",
  Travel: "#3B82F6",
  Shopping: "#A855F7",
  Bills: "#F59E0B",
  Others: "#6B7280",
};

function Graph({ expenses = [] }) {
  // group expenses by category
  const categoryData = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const data = Object.keys(COLORS).map((category) => ({
    name: category,
    value: categoryData[category] || 0,
    color: COLORS[category],
  })).filter(item => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="graph-card">
        <h2 className="graph-title">Category-wise Breakdown</h2>
        <p className="empty-text">No data to display</p>
      </div>
    );
  }

  return (
    <div className="graph-card">
      <h2 className="graph-title">Category-wise Breakdown</h2>

      <div className="graph-box">
        <div className="graph-content">
          <div className="chart">
            <ResponsiveContainer width={170} height={170}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [`₹${value}`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          {data.map((item) => (
            <div className="legend-item" key={item.name}>
              <span
                className="dot"
                style={{ background: item.color }}
              />
              <span className="label">{item.name}</span>
              <span className="amount">₹{item.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Graph;
