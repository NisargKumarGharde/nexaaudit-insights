import { FileText, Image as ImageIcon, MoreHorizontal } from "lucide-react";

export interface AuditRow {
  id: string;
  document: string;
  type: "pdf" | "image";
  date: string;
  value: string;
  anomalies: number;
  status: "Verified" | "Flagged" | "Processing" | "Review";
}

const defaultAudits: AuditRow[] = [
  { id: "AUD-2841", document: "Q4_FinancialStatement.pdf", type: "pdf", date: "May 6, 2026", value: "$2,481,920", anomalies: 0, status: "Verified" },
  { id: "AUD-2840", document: "Invoice_Mar_2026.pdf", type: "pdf", date: "May 5, 2026", value: "$184,500", anomalies: 3, status: "Flagged" },
  { id: "AUD-2839", document: "Receipt_Vendor_887.png", type: "image", date: "May 5, 2026", value: "$12,400", anomalies: 1, status: "Review" },
  { id: "AUD-2838", document: "Audit_Report_2025.pdf", type: "pdf", date: "May 4, 2026", value: "$5,920,100", anomalies: 0, status: "Verified" },
  { id: "AUD-2837", document: "Expense_Sheet_April.pdf", type: "pdf", date: "May 3, 2026", value: "$48,720", anomalies: 0, status: "Processing" },
];

const statusStyles: Record<AuditRow["status"], string> = {
  Verified: "bg-success/10 text-success border-success/20",
  Flagged: "bg-destructive/10 text-destructive border-destructive/20",
  Review: "bg-warning/10 text-warning border-warning/20",
  Processing: "bg-primary/10 text-primary border-primary/20",
};

interface Props {
  audits?: AuditRow[];
}

export const RecentAudits = ({ audits = defaultAudits }: Props) => {
  return (
    <div className="rounded-2xl border border-border bg-gradient-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h2 className="text-base font-semibold">Recent Audits</h2>
          <p className="text-xs text-muted-foreground">Latest documents processed by NexaAudit AI</p>
        </div>
        <button className="text-xs font-medium text-primary hover:underline">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-muted-foreground bg-secondary/30">
              <th className="text-left font-medium px-6 py-3">Document</th>
              <th className="text-left font-medium px-6 py-3">Audit ID</th>
              <th className="text-left font-medium px-6 py-3">Date</th>
              <th className="text-right font-medium px-6 py-3">Value</th>
              <th className="text-center font-medium px-6 py-3">Anomalies</th>
              <th className="text-left font-medium px-6 py-3">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {audits.map((row) => (
              <tr key={row.id} className="border-t border-border hover:bg-secondary/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      {row.type === "pdf" ? (
                        <FileText className="h-4 w-4 text-primary" />
                      ) : (
                        <ImageIcon className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <span className="font-medium truncate max-w-[220px]">{row.document}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{row.id}</td>
                <td className="px-6 py-4 text-muted-foreground">{row.date}</td>
                <td className="px-6 py-4 text-right font-semibold">{row.value}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 rounded-md text-xs font-semibold ${
                    row.anomalies > 0 ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"
                  }`}>
                    {row.anomalies}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-secondary">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
