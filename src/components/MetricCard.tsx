import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  accent?: "primary" | "warning" | "destructive";
}

export const MetricCard = ({ label, value, change, trend, icon: Icon, accent = "primary" }: MetricCardProps) => {
  const accentClasses = {
    primary: "text-primary bg-primary/10",
    warning: "text-warning bg-warning/10",
    destructive: "text-destructive bg-destructive/10",
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 shadow-card hover:border-primary/30 transition-colors group">
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-start justify-between mb-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentClasses[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${trend === "up" ? "text-success" : "text-destructive"}`}>
          {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change}
        </div>
      </div>
      <p className="relative text-sm text-muted-foreground mb-1">{label}</p>
      <p className="relative text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
};
