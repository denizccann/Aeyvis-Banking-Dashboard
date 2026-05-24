import { CreditCard, Lock, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useState } from "react";

const cards = [
  {
    id: 1,
    name: "Aeyvis Platinum Visa",
    number: "4539 •••• •••• 2847",
    expiry: "09/28",
    limit: "$15,000",
    used: "$3,241.50",
    color: "linear-gradient(135deg, hsl(244, 47%, 20%) 0%, hsl(244, 47%, 32%) 100%)",
    type: "VISA",
  },
  {
    id: 2,
    name: "Aeyvis World Elite",
    number: "5412 •••• •••• 7391",
    expiry: "03/27",
    limit: "$25,000",
    used: "$7,100.00",
    color: "linear-gradient(135deg, hsl(346, 74%, 30%) 0%, hsl(346, 60%, 42%) 100%)",
    type: "MC",
  },
];

export default function Cards() {
  const [locked, setLocked] = useState<number[]>([]);
  const [showNum, setShowNum] = useState<number[]>([]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <header className="flex items-center gap-3 px-8 py-4 border-b bg-white flex-shrink-0" style={{ borderColor: "hsl(226, 20%, 90%)" }}>
        <CreditCard className="w-5 h-5" style={{ color: "hsl(346, 74%, 37%)" }} />
        <div>
          <h1 className="text-lg font-bold text-foreground">Cards</h1>
          <p className="text-xs text-muted-foreground">Manage your credit and debit cards</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl">
          {cards.map((card) => {
            const isLocked = locked.includes(card.id);
            const usedPct = (parseFloat(card.used.replace(/[$,]/g, "")) / parseFloat(card.limit.replace(/[$,]/g, ""))) * 100;

            return (
              <div key={card.id} className="space-y-4">
                <div
                  className="relative rounded-2xl p-6 overflow-hidden"
                  style={{
                    background: card.color,
                    boxShadow: "0 8px 24px rgba(30,27,75,0.2)",
                    minHeight: "180px",
                  }}
                >
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center">
                        <Lock className="w-8 h-8 text-white mx-auto mb-2" />
                        <p className="text-white text-sm font-semibold">Card Locked</p>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-8">
                    <p className="text-white/80 text-xs font-medium">{card.name}</p>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-white font-mono text-sm tracking-widest mb-4">
                    {showNum.includes(card.id) ? card.number.replace(/•/g, "4") : card.number}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-wider">Expires</p>
                      <p className="text-white text-sm font-medium">{card.expiry}</p>
                    </div>
                    <p className="text-white font-bold text-sm">{card.type}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4" style={{ boxShadow: "0 2px 8px rgba(30,27,75,0.07)" }}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Used: <strong className="text-foreground">{card.used}</strong></span>
                    <span className="text-muted-foreground">Limit: <strong className="text-foreground">{card.limit}</strong></span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${usedPct}%`, background: "hsl(346, 74%, 37%)" }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{usedPct.toFixed(0)}% utilized</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setShowNum((prev) => prev.includes(card.id) ? prev.filter((i) => i !== card.id) : [...prev, card.id])}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border border-border hover:bg-muted/40 transition-colors"
                    >
                      {showNum.includes(card.id) ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showNum.includes(card.id) ? "Hide" : "Show"} Number
                    </button>
                    <button
                      onClick={() => setLocked((prev) => prev.includes(card.id) ? prev.filter((i) => i !== card.id) : [...prev, card.id])}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors"
                      style={
                        isLocked
                          ? { background: "hsl(346, 74%, 37%)", color: "white" }
                          : { background: "hsl(226, 30%, 94%)", color: "hsl(234, 40%, 25%)" }
                      }
                    >
                      {isLocked ? <RefreshCw className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      {isLocked ? "Unlock" : "Lock Card"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
