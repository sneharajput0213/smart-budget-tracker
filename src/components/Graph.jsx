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
  const categoryData = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const data = Object.keys(COLORS)
    .map((category) => ({
      name: category,
      value: categoryData[category] || 0,
      color: COLORS[category],
    }))
    .filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
          Category-wise Breakdown
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
          No data to display
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
        Category-wise Breakdown
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <ResponsiveContainer width={180} height={180}>
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
            <Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)}`]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className="inline-block w-3 h-3 rounded-full shrink-0"
                style={{ background: item.color }}
              />
              <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ₹{item.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Graph;
