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
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Waves, Sun, Moon, User, LogOut, Shield, UserPlus, Upload, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
  const { user, role, signOut, storedAccounts, switchAccount, removeStoredAccount } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const otherAccounts = storedAccounts.filter(a => a.userId !== user?.id);

  const handleAddAccount = async () => {
    await signOut();
    navigate('/auth');
    toast({
      title: 'Add New Account',
      description: 'Sign in or create a new account to add it to this device.'
    });
  };

  const handleSwitchAccount = async (account: typeof storedAccounts[0]) => {
    const { error } = await switchAccount(account);
    if (error) {
      toast({
        title: 'Session expired',
        description: 'Please sign in again to this account.',
        variant: 'destructive'
      });
      navigate('/auth');
    } else {
      toast({
        title: 'Account switched',
        description: `Now signed in as ${account.email}`
      });
    }
  };

  const handleRemoveAccount = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    removeStoredAccount(userId);
    toast({
      title: 'Account removed',
      description: 'Account has been removed from this device.'
    });
  };

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
            onClick={() => document.getElementById('navbar-file-upload')?.click()}
            className="rounded-full"
            aria-label="Upload images or videos"
          >
            <Upload className="h-5 w-5" />
          </Button>
          <input
            id="navbar-file-upload"
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                toast({
                  title: 'Files selected',
                  description: `${files.length} file(s) selected for upload.`
                });
              }
            }}
          />
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
              <DropdownMenuContent align="end" className="w-64">
                <div className="px-2 py-1.5">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 ml-6">
                    <Shield className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Role: {roleLabels[role]}
                    </span>
                  </div>
                </div>

                {otherAccounts.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Switch Account
                    </DropdownMenuLabel>
                    {otherAccounts.map((account) => (
                      <DropdownMenuItem 
                        key={account.userId} 
                        onClick={() => handleSwitchAccount(account)}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-3 h-3" />
                          </div>
                          <div>
                            <p className="text-sm">{account.email}</p>
                            {account.role && (
                              <span className="text-xs text-muted-foreground">
                                {roleLabels[account.role]}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-destructive/20"
                          onClick={(e) => handleRemoveAccount(e, account.userId)}
                        >
                          <X className="w-3 h-3 text-destructive" />
                        </Button>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAddAccount}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Account
                </DropdownMenuItem>
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
