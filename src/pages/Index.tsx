import { useState } from "react";
import { FileStack, DollarSign, ShieldAlert, Search, Bell } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { MetricCard } from "@/components/MetricCard";
import { UploadZone } from "@/components/UploadZone";
import { RecentAudits, AuditRow } from "@/components/RecentAudits";

const Index = () => {
  const [audits, setAudits] = useState<AuditRow[]>([
    { id: "AUD-2841", document: "Q4_FinancialStatement.pdf", type: "pdf", date: "May 6, 2026", value: "$2,481,920", anomalies: 0, status: "Verified" },
    { id: "AUD-2840", document: "Invoice_Mar_2026.pdf", type: "pdf", date: "May 5, 2026", value: "$184,500", anomalies: 3, status: "Flagged" },
    { id: "AUD-2839", document: "Receipt_Vendor_887.png", type: "image", date: "May 5, 2026", value: "$12,400", anomalies: 1, status: "Review" },
    { id: "AUD-2838", document: "Audit_Report_2025.pdf", type: "pdf", date: "May 4, 2026", value: "$5,920,100", anomalies: 0, status: "Verified" },
    { id: "AUD-2837", document: "Expense_Sheet_April.pdf", type: "pdf", date: "May 3, 2026", value: "$48,720", anomalies: 0, status: "Processing" },
  ]);

  const handleUploadComplete = (filename: string) => {
    const isPdf = filename.toLowerCase().endsWith(".pdf");
    const newRow: AuditRow = {
      id: `AUD-${Math.floor(2842 + Math.random() * 100)}`,
      document: filename,
      type: isPdf ? "pdf" : "image",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      value: "$—",
      anomalies: 0,
      status: "Processing",
    };
    setAudits((prev) => [newRow, ...prev]);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-card/30 backdrop-blur-xl">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Compliance Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-0.5">AI-powered financial audit overview</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search audits..."
                className="pl-9 pr-4 py-2 bg-secondary rounded-lg text-sm w-64 border border-transparent focus:border-primary/50 focus:outline-none transition"
              />
            </div>
            <button className="relative p-2 rounded-lg bg-secondary hover:bg-secondary/70 transition">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
              JD
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 space-y-6 overflow-auto">
          <section className="grid gap-4 md:grid-cols-3">
            <MetricCard
              label="Total Documents Processed"
              value="12,847"
              change="+8.2%"
              trend="up"
              icon={FileStack}
              accent="primary"
            />
            <MetricCard
              label="Total Value Audited"
              value="$48.2M"
              change="+12.5%"
              trend="up"
              icon={DollarSign}
              accent="primary"
            />
            <MetricCard
              label="Anomalies Flagged"
              value="237"
              change="-3.4%"
              trend="down"
              icon={ShieldAlert}
              accent="destructive"
            />
          </section>

          <section>
            <UploadZone onUploadComplete={handleUploadComplete} />
          </section>

          <section>
            <RecentAudits audits={audits} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
