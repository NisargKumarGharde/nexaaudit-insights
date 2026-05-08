import { useCallback, useEffect, useState } from "react";
import { FileStack, DollarSign, ShieldAlert, Search } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { MetricCard } from "@/components/MetricCard";
import { UploadZone } from "@/components/UploadZone";
import { RecentAudits, AuditRow } from "@/components/RecentAudits";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/UserAvatar";

const API_URL = "https://nexaaudit-api.onrender.com/api/v1/dashboard";

interface RecentFile {
  id: string;
  file_name: string;
  status: string;
  total_amount: number;
  uploaded_at: string;
}

interface DashboardData {
  total_documents: number;
  total_value: number;
  anomalies: number;
  recent_files: RecentFile[];
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n ?? 0);

const formatCompact = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n ?? 0);

const mapStatus = (s: string): AuditRow["status"] => {
  const v = (s || "").toLowerCase();
  if (v === "flagged") return "Flagged";
  if (v === "review") return "Review";
  if (v === "processing") return "Processing";
  return "Verified";
};

const mapFiles = (files: RecentFile[] = []): AuditRow[] =>
  files.map((f) => ({
    id: f.id,
    document: f.file_name,
    type: f.file_name?.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
    date: f.uploaded_at
      ? new Date(f.uploaded_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "—",
    value: formatCurrency(f.total_amount),
    anomalies: mapStatus(f.status) === "Flagged" ? 1 : 0,
    status: mapStatus(f.status),
  }));

const Index = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const json = (await res.json()) as DashboardData;
      setData(json);
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const allAudits = mapFiles(data?.recent_files);
  const q = search.trim().toLowerCase();
  const audits = q ? allAudits.filter((a) => a.document.toLowerCase().includes(q)) : allAudits;

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="relative z-50 flex items-center justify-between px-8 py-5 border-b border-border bg-card/30 backdrop-blur-xl">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Compliance Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-0.5">AI-powered financial audit overview</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by file name..."
                className="pl-9 pr-4 py-2 bg-secondary rounded-lg text-sm w-64 border border-transparent focus:border-primary/50 focus:outline-none transition"
              />
            </div>
            <UserAvatar />
          </div>
        </header>

        <div className="flex-1 p-8 space-y-6 overflow-auto">
          <section className="grid gap-4 md:grid-cols-3">
            {loading || !data ? (
              <>
                <Skeleton className="h-[140px] rounded-2xl" />
                <Skeleton className="h-[140px] rounded-2xl" />
                <Skeleton className="h-[140px] rounded-2xl" />
              </>
            ) : (
              <>
                <MetricCard
                  label="Total Documents Processed"
                  value={data.total_documents.toLocaleString()}
                  change="Live"
                  trend="up"
                  icon={FileStack}
                  accent="primary"
                />
                <MetricCard
                  label="Total Value Audited"
                  value={`$${formatCompact(data.total_value)}`}
                  change="Live"
                  trend="up"
                  icon={DollarSign}
                  accent="primary"
                />
                <MetricCard
                  label="Anomalies Flagged"
                  value={data.anomalies.toLocaleString()}
                  change="Live"
                  trend={data.anomalies > 0 ? "down" : "up"}
                  icon={ShieldAlert}
                  accent="destructive"
                />
              </>
            )}
          </section>

          <section>
            <UploadZone onUploadComplete={() => fetchDashboard()} />
          </section>

          <section>
            {loading ? (
              <Skeleton className="h-[300px] rounded-2xl" />
            ) : (
              <RecentAudits audits={audits} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
