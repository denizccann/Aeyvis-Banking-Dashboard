import { Settings as SettingsIcon, User, Bell, Shield, Moon, ChevronRight } from "lucide-react";
import { useState } from "react";

const sections = [
  {
    label: "Profile",
    icon: User,
    items: [
      { label: "Full Name", value: "James Donovan" },
      { label: "Email Address", value: "james.donovan@email.com" },
      { label: "Phone Number", value: "+1 (416) 555-0192" },
    ],
  },
  {
    label: "Notifications",
    icon: Bell,
    items: [
      { label: "Transaction Alerts", value: "Enabled", toggle: true },
      { label: "Security Notifications", value: "Enabled", toggle: true },
      { label: "Promotions & Offers", value: "Disabled", toggle: false },
    ],
  },
  {
    label: "Security",
    icon: Shield,
    items: [
      { label: "Two-Factor Authentication", value: "Active" },
      { label: "Biometric Login", value: "Enabled" },
      { label: "Login History", value: "View" },
    ],
  },
];

export default function Settings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Transaction Alerts": true,
    "Security Notifications": true,
    "Promotions & Offers": false,
  });

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <header className="flex items-center gap-3 px-8 py-4 border-b bg-white flex-shrink-0" style={{ borderColor: "hsl(226, 20%, 90%)" }}>
        <SettingsIcon className="w-5 h-5" style={{ color: "hsl(346, 74%, 37%)" }} />
        <div>
          <h1 className="text-lg font-bold text-foreground">Settings</h1>
          <p className="text-xs text-muted-foreground">Manage your account preferences</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-xl space-y-6">
          {sections.map(({ label, icon: Icon, items }) => (
            <div key={label} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(30,27,75,0.07)" }}>
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(346, 15%, 93%)" }}>
                  <Icon className="w-4 h-4" style={{ color: "hsl(346, 74%, 37%)" }} />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{label}</h3>
              </div>
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                    </div>
                    {"toggle" in item ? (
                      <button
                        onClick={() => setToggles((prev) => ({ ...prev, [item.label]: !prev[item.label] }))}
                        className="relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0"
                        style={{ background: toggles[item.label] ? "hsl(346, 74%, 37%)" : "hsl(226, 20%, 82%)" }}
                      >
                        <span
                          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200"
                          style={{ left: toggles[item.label] ? "calc(100% - 18px)" : "2px" }}
                        />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">{item.value}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors"
            style={{ background: "hsl(0, 72%, 96%)", color: "hsl(0, 72%, 45%)", border: "1px solid hsl(0, 72%, 88%)" }}
          >
            Sign Out of All Devices
          </button>
        </div>
      </main>
    </div>
  );
}
