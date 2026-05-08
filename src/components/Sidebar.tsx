import { LayoutDashboard, Sparkles } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-6 py-6 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">NexaAudit</h1>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Compliance</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-secondary text-foreground shadow-card">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </button>
      </nav>
      <div className="p-4 m-3 rounded-xl bg-gradient-card border border-border">
        <p className="text-xs font-semibold mb-1">Pro Plan</p>
        <p className="text-xs text-muted-foreground mb-3">Unlimited audits & priority AI processing</p>
        <button className="w-full text-xs font-medium py-2 rounded-md bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition">
          Upgrade
        </button>
      </div>
    </aside>
  );
};
