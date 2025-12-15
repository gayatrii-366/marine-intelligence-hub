import { MapPin, Layers, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HOTSPOTS = [
  { id: 1, x: 25, y: 35, intensity: "high", count: 847 },
  { id: 2, x: 45, y: 55, intensity: "critical", count: 1243 },
  { id: 3, x: 70, y: 40, intensity: "medium", count: 423 },
  { id: 4, x: 60, y: 70, intensity: "high", count: 756 },
  { id: 5, x: 30, y: 65, intensity: "low", count: 189 },
];

const intensityColors = {
  low: "bg-accent/40 border-accent",
  medium: "bg-warning/40 border-warning",
  high: "bg-destructive/50 border-destructive",
  critical: "bg-destructive/70 border-destructive animate-pulse",
};

const intensitySizes = {
  low: "h-8 w-8",
  medium: "h-12 w-12",
  high: "h-16 w-16",
  critical: "h-20 w-20",
};

export function HotspotMap() {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-secondary/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">Pollution Hotspots Map</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Last 30 Days
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative aspect-[16/9] bg-ocean-deep">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ocean gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-surface/30 via-transparent to-ocean-deep/50" />

        {/* Coastline mock */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 0 30 Q 20 35 30 25 Q 40 15 50 20 Q 60 25 70 15 Q 80 5 100 10 L 100 0 L 0 0 Z"
            fill="hsl(var(--secondary))"
            opacity="0.5"
          />
        </svg>

        {/* Hotspot markers */}
        {HOTSPOTS.map((spot) => (
          <div
            key={spot.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <div
              className={`
                ${intensitySizes[spot.intensity as keyof typeof intensitySizes]}
                ${intensityColors[spot.intensity as keyof typeof intensityColors]}
                rounded-full border-2 transition-transform duration-300 group-hover:scale-110
              `}
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-popover text-popover-foreground rounded px-2 py-1 text-xs font-mono whitespace-nowrap">
                {spot.count} objects detected
              </div>
            </div>
          </div>
        ))}

        {/* Zoom controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-1">
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between border-t bg-secondary/20 px-4 py-3">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-accent/40 border border-accent" />
            <span className="text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-warning/40 border border-warning" />
            <span className="text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/50 border border-destructive" />
            <span className="text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/70 border border-destructive animate-pulse" />
            <span className="text-muted-foreground">Critical</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          Total: 3,458 objects tracked
        </span>
      </div>
    </div>
  );
}
