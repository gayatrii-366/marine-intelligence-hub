import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const MOCK_DATA = [
  { id: "OBJ-001", type: "Plastic Bag", confidence: 94, status: "tracked", lastSeen: "2s ago" },
  { id: "OBJ-002", type: "Fishing Net", confidence: 87, status: "new", lastSeen: "Just now" },
  { id: "OBJ-003", type: "Bottle", confidence: 91, status: "tracked", lastSeen: "5s ago" },
  { id: "OBJ-004", type: "Tire", confidence: 78, status: "lost", lastSeen: "1m ago" },
  { id: "OBJ-005", type: "Container", confidence: 96, status: "tracked", lastSeen: "3s ago" },
];

const statusStyles = {
  new: "bg-primary/20 text-primary border-primary/50",
  tracked: "bg-accent/20 text-accent border-accent/50",
  lost: "bg-muted text-muted-foreground border-muted-foreground/50",
};

export function TrackingTable() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="border-b bg-secondary/30 px-4 py-3">
        <h3 className="font-medium">Active Tracking Objects</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs">ID</TableHead>
            <TableHead className="text-xs">Type</TableHead>
            <TableHead className="text-xs">Confidence</TableHead>
            <TableHead className="text-xs">Status</TableHead>
            <TableHead className="text-xs text-right">Last Seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_DATA.map((item) => (
            <TableRow key={item.id} className="font-mono text-sm">
              <TableCell className="text-primary">{item.id}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.confidence}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={statusStyles[item.status as keyof typeof statusStyles]}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {item.lastSeen}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
