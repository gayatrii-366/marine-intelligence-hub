import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  change?: string;
  className?: string;
}

export function InsightCard({ title, value, subtitle, icon: Icon, change, className }: InsightCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-6 transition-all hover:border-primary/30", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        {change && (
          <span className="text-xs text-accent font-medium">{change}</span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
