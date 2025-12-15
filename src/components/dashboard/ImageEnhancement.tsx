import { Sparkles, ArrowRight, Download, RefreshCw, ZoomIn, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_ENHANCED_IMAGES = [
  { 
    id: 1, 
    name: "Debris Cluster A", 
    timestamp: "2024-01-15 14:32:18",
    enhancementType: "Contrast Enhancement",
    improvement: "+42%",
  },
  { 
    id: 2, 
    name: "Fishing Net Detection", 
    timestamp: "2024-01-15 14:28:45",
    enhancementType: "Dehazing",
    improvement: "+58%",
  },
  { 
    id: 3, 
    name: "Deep Zone Scan", 
    timestamp: "2024-01-15 14:22:33",
    enhancementType: "Low-Light Enhancement",
    improvement: "+67%",
  },
  { 
    id: 4, 
    name: "Coral Debris Area", 
    timestamp: "2024-01-15 14:15:12",
    enhancementType: "Color Correction",
    improvement: "+35%",
  },
];

export function ImageEnhancement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent/10 p-2">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Image Enhancement</h2>
            <p className="text-sm text-muted-foreground">
              Before and after comparison of enhanced underwater images
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Process New Batch
        </Button>
      </div>

      {/* Info Banner */}
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 flex items-start gap-3">
        <div className="rounded-full bg-accent/20 p-2">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-medium">AI-Powered Enhancement</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Underwater images are automatically enhanced using deep learning algorithms to improve 
            visibility, contrast, and color accuracy for better debris detection accuracy.
          </p>
        </div>
      </div>

      {/* Enhancement Grid */}
      <div className="space-y-6">
        {MOCK_ENHANCED_IMAGES.map((image) => (
          <div
            key={image.id}
            className="rounded-lg border bg-card overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-secondary/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="font-medium">{image.name}</span>
                <Badge variant="outline" className="text-xs">
                  {image.enhancementType}
                </Badge>
                <Badge variant="secondary" className="text-xs text-accent">
                  Visibility {image.improvement}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{image.timestamp}</span>
              </div>
            </div>

            {/* Before/After Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Original Image */}
              <div className="relative">
                <div className="aspect-video bg-ocean-deep relative overflow-hidden">
                  {/* Simulated murky underwater image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ocean-surface/40 via-ocean-deep to-ocean-deep" />
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `
                        radial-gradient(circle at 30% 40%, hsl(var(--ocean-surface) / 0.4) 0%, transparent 50%),
                        radial-gradient(circle at 70% 60%, hsl(var(--muted) / 0.3) 0%, transparent 40%)
                      `
                    }}
                  />
                  
                  {/* Noise/grain overlay for murky effect */}
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay" 
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }} 
                  />

                  {/* Faint debris shapes */}
                  <div className="absolute left-[20%] top-[30%] h-12 w-16 border border-muted-foreground/20 rounded opacity-50" />
                  <div className="absolute right-[25%] top-[50%] h-8 w-20 border border-muted-foreground/20 rounded opacity-40" />

                  {/* Label */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">(a) Original Image</p>
                        <p className="text-xs text-muted-foreground">Low visibility, color distortion</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow Divider (visible on md+) */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="rounded-full bg-accent p-2">
                  <ArrowRight className="h-4 w-4 text-accent-foreground" />
                </div>
              </div>

              {/* Enhanced Image */}
              <div className="relative border-l border-border">
                <div className="aspect-video bg-ocean-deep relative overflow-hidden">
                  {/* Simulated clear enhanced underwater image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-ocean-surface/30 to-ocean-deep/80" />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `
                        radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.3) 0%, transparent 40%),
                        radial-gradient(circle at 70% 60%, hsl(var(--accent) / 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, hsl(var(--cyan-glow) / 0.1) 0%, transparent 60%)
                      `
                    }}
                  />

                  {/* Clear debris detection boxes */}
                  <div className="absolute left-[20%] top-[30%] h-12 w-16 border-2 border-primary rounded">
                    <span className="absolute -top-4 left-0 text-xs text-primary font-mono bg-background/80 px-1 rounded">
                      DEBRIS 94%
                    </span>
                  </div>
                  <div className="absolute right-[25%] top-[50%] h-8 w-20 border-2 border-warning rounded">
                    <span className="absolute -top-4 left-0 text-xs text-warning font-mono bg-background/80 px-1 rounded">
                      NET 87%
                    </span>
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">(b) Enhanced Image</p>
                        <p className="text-xs text-muted-foreground">Improved clarity & detection</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" className="gap-2">
          Load More Comparisons
        </Button>
      </div>
    </div>
  );
}
