import { Image, Calendar, Tag, Download, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_DETECTED_IMAGES = [
  { id: 1, type: "Plastic Bag", confidence: 94, timestamp: "2024-01-15 14:32:18", depth: "12.4m", thumbnail: "plastic" },
  { id: 2, type: "Fishing Net", confidence: 87, timestamp: "2024-01-15 14:30:45", depth: "8.2m", thumbnail: "net" },
  { id: 3, type: "Bottle", confidence: 91, timestamp: "2024-01-15 14:28:33", depth: "15.1m", thumbnail: "bottle" },
  { id: 4, type: "Tire", confidence: 78, timestamp: "2024-01-15 14:25:12", depth: "22.7m", thumbnail: "tire" },
  { id: 5, type: "Container", confidence: 96, timestamp: "2024-01-15 14:22:08", depth: "5.3m", thumbnail: "container" },
  { id: 6, type: "Rope", confidence: 89, timestamp: "2024-01-15 14:18:55", depth: "18.9m", thumbnail: "rope" },
  { id: 7, type: "Plastic Debris", confidence: 82, timestamp: "2024-01-15 14:15:30", depth: "11.6m", thumbnail: "plastic" },
  { id: 8, type: "Metal Can", confidence: 93, timestamp: "2024-01-15 14:12:22", depth: "9.8m", thumbnail: "can" },
];

const typeColors: Record<string, string> = {
  "Plastic Bag": "bg-primary/20 text-primary border-primary/50",
  "Fishing Net": "bg-warning/20 text-warning border-warning/50",
  "Bottle": "bg-accent/20 text-accent border-accent/50",
  "Tire": "bg-destructive/20 text-destructive border-destructive/50",
  "Container": "bg-primary/20 text-primary border-primary/50",
  "Rope": "bg-warning/20 text-warning border-warning/50",
  "Plastic Debris": "bg-primary/20 text-primary border-primary/50",
  "Metal Can": "bg-muted-foreground/20 text-muted-foreground border-muted-foreground/50",
};

export function DetectedImagesGallery() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Image className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Detected Images Archive</h2>
            <p className="text-sm text-muted-foreground">
              {MOCK_DETECTED_IMAGES.length} images captured from detection sessions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_DETECTED_IMAGES.map((image) => (
          <div
            key={image.id}
            className="group rounded-lg border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
          >
            {/* Image Preview */}
            <div className="relative aspect-video bg-ocean-deep">
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-surface/30 to-ocean-deep" />
              
              {/* Mock detection box */}
              <div className="absolute inset-4 border-2 border-primary/60 rounded flex items-center justify-center">
                <div className="text-center">
                  <Image className="h-8 w-8 text-primary/40 mx-auto mb-1" />
                  <span className="text-xs text-muted-foreground/60 font-mono">
                    DET-{String(image.id).padStart(4, "0")}
                  </span>
                </div>
              </div>

              {/* Confidence badge */}
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  {image.confidence}%
                </Badge>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Info */}
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={typeColors[image.type] || "bg-muted"}>
                  {image.type}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  {image.depth}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{image.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" className="gap-2">
          Load More Images
        </Button>
      </div>
    </div>
  );
}
