import { useState, useRef } from "react";
import { Shield, Sparkles, AlertTriangle, CheckCircle2, XCircle, Loader2 } from "lucide-react";

type AnalysisState = "idle" | "analyzing" | "confirm" | "success" | "declined";

interface ParsedCommand {
  amount: string;
  recipient: string;
  rawCommand: string;
}

function parseCommand(cmd: string): ParsedCommand | null {
  const amountMatch = cmd.match(/\$[\d,]+(?:\.\d{2})?|\d+(?:,\d{3})*(?:\.\d{2})?\s*(?:dollars?|USD)/i);
  const recipientMatch = cmd.match(/(?:to|pay)\s+(?:my\s+)?(.+?)(?:\s*$|\s+from|\s+using)/i);

  if (!amountMatch) return null;

  return {
    amount: amountMatch[0].startsWith("$") ? amountMatch[0] : `$${amountMatch[0]}`,
    recipient: recipientMatch ? recipientMatch[1].trim() : "recipient",
    rawCommand: cmd,
  };
}

const EXAMPLE_COMMANDS = [
  "Send $2000 to my landlord",
  "Pay $450 to electric company",
  "Transfer $1500 to savings",
  "Send $80 to John for dinner",
];

export default function FinancialGuardian() {
  const [command, setCommand] = useState("");
  const [state, setState] = useState<AnalysisState>("idle");
  const [parsed, setParsed] = useState<ParsedCommand | null>(null);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("low");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = () => {
    if (!command.trim()) return;

    setState("analyzing");
    const result = parseCommand(command);

    setTimeout(() => {
      setParsed(
        result || {
          amount: "Amount unclear",
          recipient: "Unknown recipient",
          rawCommand: command,
        }
      );
      const amountStr = result?.amount.replace(/[$,]/g, "") || "0";
      const amount = parseFloat(amountStr);
      setRiskLevel(amount > 5000 ? "high" : amount > 1000 ? "medium" : "low");
      setState("confirm");
    }, 1800);
  };

  const handleConfirm = () => {
    setState("success");
    setTimeout(() => {
      setState("idle");
      setCommand("");
      setParsed(null);
    }, 2500);
  };

  const handleDecline = () => {
    setState("declined");
    setTimeout(() => {
      setState("idle");
      setParsed(null);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && state === "idle") handleAnalyze();
    if (e.key === "Escape") {
      setState("idle");
      setParsed(null);
    }
  };

  const riskColors = {
    low: { bg: "rgba(16, 185, 129, 0.12)", text: "#059669", label: "Low Risk" },
    medium: { bg: "rgba(245, 158, 11, 0.12)", text: "#D97706", label: "Review Required" },
    high: { bg: "rgba(239, 68, 68, 0.12)", text: "#DC2626", label: "High Value Transfer" },
  };

  return (
    <div
      className="rounded-2xl p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(244, 47%, 20%) 0%, hsl(244, 52%, 16%) 100%)",
        boxShadow: "0 8px 32px rgba(30, 27, 75, 0.25)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: "hsl(346, 74%, 37%)", transform: "translate(30%, -30%)" }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 relative">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(136, 19, 55, 0.3)" }}
          >
            <Shield className="w-5 h-5" style={{ color: "hsl(346, 74%, 65%)" }} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Financial Guardian</h3>
            <p className="text-xs" style={{ color: "hsl(220, 30%, 65%)" }}>
              AI-powered transaction analysis
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(16, 185, 129, 0.15)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">Active</span>
        </div>
      </div>

      {/* Input Area */}
      <div className="relative mb-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Sparkles
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: "hsl(346, 74%, 55%)" }}
            />
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Try: "Send $2000 to my landlord"'
              disabled={state !== "idle"}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 disabled:opacity-60"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                fontFamily: "var(--app-font-sans)",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = "hsl(346, 74%, 45%)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.10)";
              }}
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!command.trim() || state !== "idle"}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            style={{ background: "hsl(346, 74%, 37%)" }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled)
                (e.currentTarget as HTMLElement).style.background = "hsl(346, 74%, 32%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "hsl(346, 74%, 37%)";
            }}
          >
            Analyze
          </button>
        </div>
      </div>

      {/* Example Commands */}
      {state === "idle" && !command && (
        <div className="flex flex-wrap gap-2 mb-4">
          {EXAMPLE_COMMANDS.map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setCommand(ex);
                inputRef.current?.focus();
              }}
              className="px-3 py-1.5 rounded-lg text-xs transition-all duration-150"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "hsl(220, 25%, 65%)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(136, 19, 55, 0.2)";
                (e.currentTarget as HTMLElement).style.color = "hsl(346, 74%, 65%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.color = "hsl(220, 25%, 65%)";
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Analyzing State */}
      {state === "analyzing" && (
        <div
          className="rounded-xl p-4 flex items-center gap-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" style={{ color: "hsl(346, 74%, 55%)" }} />
          <div>
            <p className="text-sm font-medium text-white">Analyzing transaction...</p>
            <p className="text-xs mt-0.5" style={{ color: "hsl(220, 25%, 55%)" }}>
              Checking recipient, risk level, and compliance
            </p>
          </div>
        </div>
      )}

      {/* Confirm Overlay */}
      {state === "confirm" && parsed && (
        <div
          className="rounded-xl p-4 relative"
          style={{
            background: "rgba(20, 17, 60, 0.95)",
            border: "1px solid rgba(136, 19, 55, 0.5)",
            boxShadow: "0 0 0 1px rgba(136, 19, 55, 0.3), 0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          {/* Risk badge */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" style={{ color: riskColors[riskLevel].text }} />
              <span className="text-xs font-semibold" style={{ color: riskColors[riskLevel].text }}>
                {riskColors[riskLevel].label}
              </span>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: riskColors[riskLevel].bg, color: riskColors[riskLevel].text }}
            >
              Verification Required
            </span>
          </div>

          <div
            className="rounded-lg p-3 mb-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs" style={{ color: "hsl(220, 25%, 55%)" }}>
                Transfer Amount
              </span>
              <span className="text-white font-bold text-lg">{parsed.amount}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs" style={{ color: "hsl(220, 25%, 55%)" }}>
                Recipient
              </span>
              <span className="text-white text-sm font-medium capitalize">{parsed.recipient}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "hsl(220, 25%, 55%)" }}>
                Source Account
              </span>
              <span className="text-white text-sm">Chequing •••• 4821</span>
            </div>
          </div>

          <p className="text-xs mb-4" style={{ color: "hsl(220, 25%, 55%)" }}>
            Guardian has verified this recipient is in your known contacts. Confirm to execute the transfer.
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleDecline}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
              style={{
                background: "rgba(239, 68, 68, 0.12)",
                color: "#F87171",
                border: "1px solid rgba(239, 68, 68, 0.25)",
              }}
            >
              <XCircle className="w-4 h-4" />
              Decline
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150"
              style={{ background: "hsl(346, 74%, 37%)", border: "1px solid hsl(346, 74%, 45%)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "hsl(346, 74%, 32%)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "hsl(346, 74%, 37%)")
              }
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm Transfer
            </button>
          </div>
        </div>
      )}

      {/* Success State */}
      {state === "success" && (
        <div
          className="rounded-xl p-4 flex items-center gap-3"
          style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.25)" }}
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-emerald-400">Transfer Executed</p>
            <p className="text-xs mt-0.5" style={{ color: "hsl(160, 40%, 55%)" }}>
              Your transfer has been successfully processed
            </p>
          </div>
        </div>
      )}

      {/* Declined State */}
      {state === "declined" && (
        <div
          className="rounded-xl p-4 flex items-center gap-3"
          style={{ background: "rgba(239, 68, 68, 0.10)", border: "1px solid rgba(239, 68, 68, 0.2)" }}
        >
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-400">Transfer Declined</p>
            <p className="text-xs mt-0.5" style={{ color: "hsl(0, 40%, 60%)" }}>
              The transaction has been cancelled
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
