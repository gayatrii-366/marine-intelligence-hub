import { useAuth, AppRole } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Waves, Sun, Moon, User, LogOut, Shield } from 'lucide-react';

const roleLabels: Record<AppRole, string> = {
  analyzer: 'Analyzer',
  detector: 'Detector',
  viewer: 'Viewer'
};

const roleColors: Record<AppRole, string> = {
  analyzer: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  detector: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  viewer: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

const Navbar = () => {
  const { user, role, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-glow/20 border border-cyan-glow/30">
            <Waves className="w-6 h-6 text-cyan-glow" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Marine Debris Intelligence</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Ocean Conservation</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {user && role && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium">{user.email?.split('@')[0]}</p>
                    <Badge variant="outline" className={`text-xs ${roleColors[role]}`}>
                      {roleLabels[role]}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.email}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Shield className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Role: {roleLabels[role]}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
