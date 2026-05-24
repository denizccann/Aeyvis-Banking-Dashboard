import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  ArrowLeftRight,
  CreditCard,
  Settings,
  Bell,
  Shield,
  ChevronRight,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Transfers", icon: ArrowLeftRight, href: "/transfers" },
  { label: "Cards", icon: CreditCard, href: "/cards" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [notifCount] = useState(3);

  return (
    <aside className="w-64 min-h-screen flex flex-col" style={{ background: "hsl(244, 47%, 20%)" }}>
      {/* Logo */}
      <div className="px-6 py-6 border-b" style={{ borderColor: "hsl(244, 40%, 16%)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ background: "hsl(346, 74%, 37%)" }}
          >
            A
          </div>
          <div>
            <p className="font-bold text-white text-sm tracking-wide">AEYVIS</p>
            <p className="text-xs" style={{ color: "hsl(220, 30%, 65%)" }}>
              Private Banking
            </p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-4 py-5 border-b" style={{ borderColor: "hsl(244, 40%, 16%)" }}>
        <div className="flex items-center gap-3 px-2 py-2.5 rounded-lg" style={{ background: "hsl(244, 40%, 26%)" }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
            style={{ background: "hsl(346, 74%, 37%)" }}
          >
            JD
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">James Donovan</p>
            <p className="text-xs truncate" style={{ color: "hsl(220, 30%, 65%)" }}>
              Premium Client
            </p>
          </div>
          <div className="relative ml-auto flex-shrink-0">
            <Bell className="w-4 h-4" style={{ color: "hsl(220, 30%, 65%)" }} />
            {notifCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-white text-[9px] flex items-center justify-center font-bold"
                style={{ background: "hsl(346, 74%, 37%)" }}
              >
                {notifCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-1">
        <p
          className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-3"
          style={{ color: "hsl(220, 25%, 50%)" }}
        >
          Navigation
        </p>
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = location === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive ? "text-white" : ""
              }`}
              style={
                isActive
                  ? { background: "hsl(346, 74%, 37%)" }
                  : { color: "hsl(220, 30%, 72%)" }
              }
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLElement).style.background = "hsl(244, 40%, 26%)";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 opacity-70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-5 border-t" style={{ borderColor: "hsl(244, 40%, 16%)" }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3" style={{ background: "rgba(136, 19, 55, 0.15)" }}>
          <Shield className="w-4 h-4" style={{ color: "hsl(346, 74%, 55%)" }} />
          <div>
            <p className="text-xs font-medium" style={{ color: "hsl(346, 74%, 65%)" }}>
              Security Active
            </p>
            <p className="text-[10px]" style={{ color: "hsl(346, 50%, 50%)" }}>
              256-bit encryption
            </p>
          </div>
        </div>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
          style={{ color: "hsl(220, 30%, 60%)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "hsl(244, 40%, 26%)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "transparent")
          }
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
