import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", income: 5800, expenses: 3200 },
  { month: "Feb", income: 5800, expenses: 2900 },
  { month: "Mar", income: 6100, expenses: 3800 },
  { month: "Apr", income: 5800, expenses: 3100 },
  { month: "May", income: 7200, expenses: 4200 },
  { month: "Jun", income: 5800, expenses: 2800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl p-3 shadow-lg"
        style={{
          background: "hsl(244, 47%, 18%)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p className="text-xs font-semibold text-white mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: entry.color }}
            />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
              {entry.name === "income" ? "Income" : "Expenses"}:
            </span>
            <span className="text-white font-semibold">
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function SpendingChart() {
  return (
    <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(30,27,75,0.07)" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Cash Flow</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Income vs. Expenses (2025)</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(244, 47%, 35%)" }} />
            <span className="text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(346, 74%, 50%)" }} />
            <span className="text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(244, 47%, 35%)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="hsl(244, 47%, 35%)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(346, 74%, 50%)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="hsl(346, 74%, 50%)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "hsl(226, 15%, 55%)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(226, 15%, 55%)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(30,27,75,0.08)", strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="hsl(244, 47%, 40%)"
            strokeWidth={2}
            fill="url(#incomeGrad)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="hsl(346, 74%, 50%)"
            strokeWidth={2}
            fill="url(#expenseGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
