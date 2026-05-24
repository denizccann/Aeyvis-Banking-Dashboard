import { ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: string;
  isCredit: boolean;
  date: string;
  status: "completed" | "pending";
  initials: string;
  color: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    name: "Landlord — Monthly Rent",
    category: "Housing",
    amount: "-$2,100.00",
    isCredit: false,
    date: "Today, 9:14 AM",
    status: "completed",
    initials: "LR",
    color: "hsl(346, 74%, 37%)",
  },
  {
    id: "2",
    name: "Payroll Deposit",
    category: "Income",
    amount: "+$5,800.00",
    isCredit: true,
    date: "Today, 8:00 AM",
    status: "completed",
    initials: "PD",
    color: "hsl(160, 60%, 35%)",
  },
  {
    id: "3",
    name: "Bell Canada",
    category: "Utilities",
    amount: "-$89.99",
    isCredit: false,
    date: "Yesterday, 2:30 PM",
    status: "completed",
    initials: "BC",
    color: "hsl(244, 47%, 35%)",
  },
  {
    id: "4",
    name: "Amazon Marketplace",
    category: "Shopping",
    amount: "-$243.50",
    isCredit: false,
    date: "May 22, 11:05 AM",
    status: "completed",
    initials: "AM",
    color: "hsl(38, 80%, 45%)",
  },
  {
    id: "5",
    name: "E-Transfer Received",
    category: "Transfer",
    amount: "+$350.00",
    isCredit: true,
    date: "May 22, 10:20 AM",
    status: "completed",
    initials: "ET",
    color: "hsl(200, 65%, 40%)",
  },
  {
    id: "6",
    name: "Netflix Subscription",
    category: "Entertainment",
    amount: "-$19.99",
    isCredit: false,
    date: "May 21, 12:00 AM",
    status: "pending",
    initials: "NF",
    color: "hsl(0, 70%, 40%)",
  },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(30,27,75,0.07)" }}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Recent Transactions</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Last 7 days activity</p>
        </div>
        <button className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-muted" style={{ color: "hsl(346, 74%, 37%)" }}>
          View All
        </button>
      </div>

      <div className="divide-y divide-border">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: tx.color }}
            >
              {tx.initials}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{tx.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                  style={{ background: "hsl(226, 30%, 93%)", color: "hsl(234, 40%, 40%)" }}
                >
                  {tx.category}
                </span>
                <span className="text-[11px] text-muted-foreground">{tx.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {tx.status === "pending" && (
                <div className="flex items-center gap-1 text-amber-500">
                  <RefreshCw className="w-3 h-3" />
                  <span className="text-[10px] font-medium">Pending</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                {tx.isCredit ? (
                  <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5 text-red-400" />
                )}
                <span
                  className="text-sm font-semibold"
                  style={{ color: tx.isCredit ? "#10b981" : "#374151" }}
                >
                  {tx.amount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
