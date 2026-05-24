import AccountSummary from "@/components/AccountSummary";
import FinancialGuardian from "@/components/FinancialGuardian";
import RecentTransactions from "@/components/RecentTransactions";
import SpendingChart from "@/components/SpendingChart";
import QuickActions from "@/components/QuickActions";
import { Bell, Search, Calendar } from "lucide-react";

export default function Dashboard() {
  const today = new Date().toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Top Bar */}
      <header
        className="flex items-center justify-between px-8 py-4 border-b bg-white flex-shrink-0"
        style={{ borderColor: "hsl(226, 20%, 90%)" }}
      >
        <div>
          <h1 className="text-lg font-bold text-foreground">Good morning, James</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{today}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none"
            />
            <input
              type="search"
              placeholder="Search transactions..."
              className="w-56 pl-9 pr-4 py-2 text-xs rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>

          <button
            className="relative w-9 h-9 rounded-lg flex items-center justify-center border border-border bg-white hover:bg-muted/30 transition-colors"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "hsl(346, 74%, 37%)" }}
            />
          </button>

          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: "hsl(346, 74%, 37%)" }}
          >
            JD
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {/* Account Summary Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Account Overview</h2>
            <button
              className="text-xs font-medium hover:underline"
              style={{ color: "hsl(346, 74%, 37%)" }}
            >
              Manage Accounts
            </button>
          </div>
          <AccountSummary />
        </section>

        {/* Middle Row: Financial Guardian + Quick Actions */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Financial Guardian</h2>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
                style={{ background: "hsl(346, 15%, 93%)", color: "hsl(346, 74%, 37%)" }}
              >
                AI-Powered
              </span>
            </div>
            <FinancialGuardian />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>
            </div>
            <QuickActions />
          </div>
        </section>

        {/* Bottom Row: Chart + Transactions */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Cash Flow</h2>
            <SpendingChart />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h2>
            <RecentTransactions />
          </div>
        </section>
      </main>
    </div>
  );
}
