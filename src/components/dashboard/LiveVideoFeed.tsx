import { Video, Circle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function LiveVideoFeed() {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-secondary/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <Video className="h-4 w-4 text-primary" />
          <span className="font-medium">Live Video Feed</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="h-2 w-2 animate-pulse fill-destructive text-destructive" />
          <span className="text-xs text-muted-foreground">LIVE</span>
          <Badge variant="outline" className="text-xs">
            ROV-01
          </Badge>
        </div>
      </div>

      {/* Video Area */}
      <div className="relative aspect-video bg-ocean-deep">
        {/* Placeholder with ocean gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-surface/20 to-ocean-deep" />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-line" />
        </div>

        {/* Mock detection overlays */}
        <div className="absolute left-[20%] top-[30%] h-16 w-20 border-2 border-primary rounded animate-pulse">
          <span className="absolute -top-5 left-0 text-xs text-primary font-mono">
            PLASTIC 94%
          </span>
        </div>
        <div className="absolute right-[25%] top-[50%] h-12 w-24 border-2 border-warning rounded">
          <span className="absolute -top-5 left-0 text-xs text-warning font-mono">
            NET 87%
          </span>
        </div>
        <div className="absolute left-[45%] bottom-[20%] h-10 w-14 border-2 border-accent rounded">
          <span className="absolute -top-5 left-0 text-xs text-accent font-mono">
            BOTTLE 91%
          </span>
        </div>

        {/* Center placeholder text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Video className="h-16 w-16 text-muted-foreground/20 mb-2" />
          <p className="text-sm text-muted-foreground/40">
            Underwater Camera Feed
          </p>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/80 to-transparent p-4">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>Depth: 12.4m</span>
            <span>Temp: 18.2°C</span>
            <span>Visibility: Good</span>
            <span>GPS: 34.0522°N, 118.2437°W</span>
          </div>
        </div>
      </div>

      {/* Alert bar */}
      <div className="flex items-center gap-2 border-t bg-warning/10 px-4 py-2">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <span className="text-sm text-warning">
          High debris concentration detected in sector 7B
        </span>
      </div>
    </div>
  );
}
