import { Send, Download, PlusCircle, FileText, Globe, Phone } from "lucide-react";

const actions = [
  { label: "Send Money", icon: Send, color: "hsl(346, 74%, 37%)" },
  { label: "Deposit", icon: Download, color: "hsl(244, 47%, 35%)" },
  { label: "New Account", icon: PlusCircle, color: "hsl(160, 60%, 32%)" },
  { label: "Statement", icon: FileText, color: "hsl(38, 80%, 40%)" },
  { label: "International", icon: Globe, color: "hsl(200, 65%, 40%)" },
  { label: "Support", icon: Phone, color: "hsl(280, 50%, 45%)" },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(30,27,75,0.07)" }}>
      <h3 className="font-semibold text-foreground text-sm mb-4">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-150 hover:-translate-y-0.5 group"
            style={{ background: "hsl(226, 30%, 97%)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "hsl(226, 20%, 93%)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "hsl(226, 30%, 97%)")
            }
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${color}18` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <span className="text-[11px] font-medium text-center leading-tight" style={{ color: "hsl(234, 30%, 35%)" }}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
