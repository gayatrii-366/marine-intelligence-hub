import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  BarChart3, 
  Target, 
  Clock, 
  Trash2, 
  TrendingUp,
  AlertCircle,
  MapPin,
  Package,
  Timer,
  Activity,
  Image,
  Sparkles,
  Lock,
  Film
} from "lucide-react";
import { useAuth, AppRole } from "@/contexts/AuthContext";
import Navbar from "@/components/navigation/Navbar";
import { LiveVideoFeed } from "@/components/dashboard/LiveVideoFeed";
import { MediaFeed } from "@/components/dashboard/MediaFeed";
import { DetectedImagesGallery } from "@/components/dashboard/DetectedImagesGallery";
import { ImageEnhancement } from "@/components/dashboard/ImageEnhancement";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { HotspotMap } from "@/components/dashboard/HotspotMap";
import { TrackingTable } from "@/components/dashboard/TrackingTable";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { TutorialDialog } from "@/components/tutorial/TutorialDialog";

// Role permissions
const rolePermissions: Record<AppRole, {
  realtime: boolean;
  mediafeed: boolean;
  strategic: boolean;
  detected: boolean;
  enhancement: boolean;
}> = {
  analyzer: { realtime: true, mediafeed: true, strategic: true, detected: true, enhancement: true },
  detector: { realtime: true, mediafeed: true, strategic: false, detected: true, enhancement: true },
  viewer: { realtime: false, mediafeed: true, strategic: true, detected: false, enhancement: false }
};

const Index = () => {
  const { role, user } = useAuth();
  const permissions = role ? rolePermissions[role] : rolePermissions.viewer;
  
  // Determine default tab based on role
  const getDefaultTab = () => {
    if (permissions.realtime) return 'realtime';
    if (permissions.mediafeed) return 'mediafeed';
    if (permissions.strategic) return 'strategic';
    return 'realtime';
  };

  return (
    <div className="min-h-screen bg-background">
      {user && <TutorialDialog userId={user.id} />}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <Tabs defaultValue={getDefaultTab()} className="space-y-6">
          <TabsList className="bg-secondary/50 p-1 flex-wrap h-auto gap-1">
            <TabsTrigger 
              value="realtime" 
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              disabled={!permissions.realtime}
            >
              {!permissions.realtime && <Lock className="h-3 w-3" />}
              <Eye className="h-4 w-4" />
              Real-Time Monitoring
            </TabsTrigger>
            <TabsTrigger 
              value="mediafeed" 
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              disabled={!permissions.mediafeed}
            >
              {!permissions.mediafeed && <Lock className="h-3 w-3" />}
              <Film className="h-4 w-4" />
              Media Feed
            </TabsTrigger>
            <TabsTrigger 
              value="strategic" 
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              disabled={!permissions.strategic}
            >
              {!permissions.strategic && <Lock className="h-3 w-3" />}
              <BarChart3 className="h-4 w-4" />
              Strategic Insights
            </TabsTrigger>
            <TabsTrigger 
              value="detected" 
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              disabled={!permissions.detected}
            >
              {!permissions.detected && <Lock className="h-3 w-3" />}
              <Image className="h-4 w-4" />
              Detected Images
            </TabsTrigger>
            <TabsTrigger 
              value="enhancement" 
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              disabled={!permissions.enhancement}
            >
              {!permissions.enhancement && <Lock className="h-3 w-3" />}
              <Sparkles className="h-4 w-4" />
              Image Enhancement
            </TabsTrigger>
          </TabsList>

          {/* Real-Time Monitoring Tab */}
          <TabsContent value="realtime" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Debris Detected"
                value="1,247"
                icon={Target}
                variant="highlight"
                trend={{ value: 12, isPositive: false }}
              />
              <MetricCard
                title="Objects Being Tracked"
                value="23"
                icon={Activity}
                trend={{ value: 8, isPositive: true }}
              />
              <MetricCard
                title="Session Duration"
                value="02:34:18"
                icon={Timer}
              />
              <MetricCard
                title="Alert Level"
                value="MODERATE"
                icon={AlertCircle}
                variant="warning"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <LiveVideoFeed />
              </div>
              <div className="space-y-6">
                <TrackingTable />
              </div>
            </div>
          </TabsContent>

          {/* Media Feed Tab */}
          <TabsContent value="mediafeed" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <MediaFeed />
              </div>
              <div className="space-y-6">
                <TrackingTable />
              </div>
            </div>
          </TabsContent>

          {/* Strategic Insights Tab */}
          <TabsContent value="strategic" className="space-y-6">
            {/* Info banner */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
              <div className="rounded-full bg-primary/20 p-2">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Aggregated Intelligence View</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This view aggregates detection data from the DeepSORT tracking module over time 
                  to identify pollution hotspots and provide actionable intelligence for 
                  policymakers and cleanup operations.
                </p>
              </div>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <InsightCard
                title="Total Objects Tracked"
                value="3,458"
                subtitle="Last 30 days"
                icon={Package}
                change="+23% vs prev. period"
              />
              <InsightCard
                title="Hotspots Identified"
                value="5"
                subtitle="Priority zones"
                icon={MapPin}
                change="2 new this week"
              />
              <InsightCard
                title="Debris Removed"
                value="892"
                subtitle="This month"
                icon={Trash2}
                change="+45% efficiency"
              />
              <InsightCard
                title="Trend Direction"
                value="↓ 18%"
                subtitle="Debris accumulation"
                icon={TrendingUp}
                change="Improving"
              />
            </div>

            {/* Hotspot Map */}
            <HotspotMap />

            {/* Additional context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Recommended Actions
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-destructive">Critical:</strong> Deploy cleanup crew to 
                      Sector 7B - highest concentration area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-warning">High:</strong> Schedule net removal 
                      operation in coastal zone 3
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-accent">Medium:</strong> Monitor emerging pattern 
                      near harbor entrance
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Debris Composition
                </h3>
                <div className="space-y-3">
                  {[
                    { type: "Plastics", percentage: 42, color: "bg-primary" },
                    { type: "Fishing Gear", percentage: 28, color: "bg-warning" },
                    { type: "Containers", percentage: 18, color: "bg-accent" },
                    { type: "Other", percentage: 12, color: "bg-muted-foreground" },
                  ].map((item) => (
                    <div key={item.type} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.type}</span>
                        <span className="text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Detected Images Tab */}
          <TabsContent value="detected">
            <DetectedImagesGallery />
          </TabsContent>

          {/* Image Enhancement Tab */}
          <TabsContent value="enhancement">
            <ImageEnhancement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
