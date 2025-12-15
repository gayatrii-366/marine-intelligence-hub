import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "highlight" | "warning";
}

export function MetricCard({ title, value, icon: Icon, trend, variant = "default" }: MetricCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card p-4 transition-all duration-300 hover:border-primary/50",
        variant === "highlight" && "border-primary/30 animate-pulse-glow",
        variant === "warning" && "border-warning/50"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-xs",
                trend.isPositive ? "text-accent" : "text-destructive"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last hour
            </p>
          )}
        </div>
        <div
          className={cn(
            "rounded-full p-2",
            variant === "default" && "bg-primary/10 text-primary",
            variant === "highlight" && "bg-primary/20 text-primary",
            variant === "warning" && "bg-warning/10 text-warning"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
