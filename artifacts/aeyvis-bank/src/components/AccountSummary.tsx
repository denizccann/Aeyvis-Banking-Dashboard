import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Account {
  label: string;
  balance: string;
  subLabel: string;
  accountNumber: string;
  change: "up" | "down" | "neutral";
  changePct: string;
  color: string;
  accent: string;
}

const accounts: Account[] = [
  {
    label: "Chequing Account",
    balance: "$24,381.50",
    subLabel: "Available balance",
    accountNumber: "•••• 4821",
    change: "up",
    changePct: "+2.4%",
    color: "hsl(244, 47%, 20%)",
    accent: "hsl(244, 47%, 35%)",
  },
  {
    label: "Savings Account",
    balance: "$87,640.00",
    subLabel: "Total savings",
    accountNumber: "•••• 7203",
    change: "up",
    changePct: "+0.8%",
    color: "hsl(346, 74%, 37%)",
    accent: "hsl(346, 74%, 50%)",
  },
  {
    label: "Investment Portfolio",
    balance: "$142,920.75",
    subLabel: "Market value",
    accountNumber: "•••• 9561",
    change: "down",
    changePct: "-1.2%",
    color: "hsl(244, 40%, 28%)",
    accent: "hsl(244, 40%, 40%)",
  },
  {
    label: "Credit Line",
    balance: "$12,500.00",
    subLabel: "Available credit",
    accountNumber: "•••• 3147",
    change: "neutral",
    changePct: "0.0%",
    color: "hsl(220, 30%, 30%)",
    accent: "hsl(220, 30%, 45%)",
  },
];

export default function AccountSummary() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {accounts.map((acc) => {
        const TrendIcon =
          acc.change === "up"
            ? TrendingUp
            : acc.change === "down"
            ? TrendingDown
            : Minus;

        const trendColor =
          acc.change === "up"
            ? "#34d399"
            : acc.change === "down"
            ? "#f87171"
            : "#94a3b8";

        return (
          <div
            key={acc.label}
            className="relative rounded-2xl p-5 overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(140deg, ${acc.color} 0%, ${acc.accent} 100%)`,
              boxShadow: "0 4px 16px rgba(30, 27, 75, 0.18)",
            }}
          >
            {/* Background texture */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)",
              }}
            />

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {acc.label}
                  </p>
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {acc.accountNumber}
                  </p>
                </div>
                <div
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-semibold"
                  style={{ background: "rgba(0,0,0,0.2)", color: trendColor }}
                >
                  <TrendIcon className="w-3 h-3" />
                  {acc.changePct}
                </div>
              </div>

              <p className="text-2xl font-bold text-white mb-0.5 tracking-tight">
                {acc.balance}
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                {acc.subLabel}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
