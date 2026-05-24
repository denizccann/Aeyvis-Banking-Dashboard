import { ArrowLeftRight, Send, Clock, CheckCircle2 } from "lucide-react";

const recent = [
  { name: "Landlord", amount: "$2,100.00", date: "May 24, 2025", status: "completed" },
  { name: "Bell Canada", amount: "$89.99", date: "May 23, 2025", status: "completed" },
  { name: "E-Transfer — Sarah K.", amount: "$350.00", date: "May 22, 2025", status: "completed" },
  { name: "Investment Transfer", amount: "$1,000.00", date: "May 20, 2025", status: "pending" },
];

export default function Transfers() {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <header className="flex items-center gap-3 px-8 py-4 border-b bg-white flex-shrink-0" style={{ borderColor: "hsl(226, 20%, 90%)" }}>
        <ArrowLeftRight className="w-5 h-5" style={{ color: "hsl(346, 74%, 37%)" }} />
        <div>
          <h1 className="text-lg font-bold text-foreground">Transfers</h1>
          <p className="text-xs text-muted-foreground">Move money between accounts or to others</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-2xl space-y-6">
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(30,27,75,0.07)" }}>
            <h3 className="font-semibold text-sm text-foreground mb-4">New Transfer</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">From Account</label>
                <select className="w-full px-3 py-2.5 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                  <option>Chequing •••• 4821 — $24,381.50</option>
                  <option>Savings •••• 7203 — $87,640.00</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">To</label>
                <input type="text" placeholder="Recipient name or account number" className="w-full px-3 py-2.5 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <input type="number" placeholder="0.00" className="w-full pl-7 pr-4 py-2.5 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2" style={{ background: "hsl(346, 74%, 37%)" }}>
                <Send className="w-4 h-4" />
                Send Transfer
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(30,27,75,0.07)" }}>
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-semibold text-sm text-foreground">Recent Transfers</h3>
            </div>
            <div className="divide-y divide-border">
              {recent.map((tx) => (
                <div key={tx.name + tx.date} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "hsl(346, 15%, 93%)" }}>
                    <Send className="w-4 h-4" style={{ color: "hsl(346, 74%, 37%)" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{tx.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{tx.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {tx.status === "completed" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                    )}
                    <span className="text-sm font-semibold text-foreground">{tx.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
