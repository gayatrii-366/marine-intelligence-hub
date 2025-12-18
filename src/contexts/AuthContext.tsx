import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'analyzer' | 'detector' | 'viewer';

interface StoredSession {
  email: string;
  userId: string;
  role?: AppRole;
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  loading: boolean;
  storedAccounts: StoredSession[];
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string, role?: AppRole) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  switchAccount: (account: StoredSession) => Promise<{ error: Error | null }>;
  removeStoredAccount: (userId: string) => void;
}

const STORED_SESSIONS_KEY = 'mdi_stored_sessions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [storedAccounts, setStoredAccounts] = useState<StoredSession[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORED_SESSIONS_KEY);
    if (stored) {
      setStoredAccounts(JSON.parse(stored));
    }
  }, []);

  const saveSession = (session: Session, userRole?: AppRole) => {
    const newAccount: StoredSession = {
      email: session.user.email || '',
      userId: session.user.id,
      role: userRole,
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };
    
    const existing = JSON.parse(localStorage.getItem(STORED_SESSIONS_KEY) || '[]') as StoredSession[];
    const filtered = existing.filter(a => a.userId !== session.user.id);
    const updated = [newAccount, ...filtered].slice(0, 5);
    localStorage.setItem(STORED_SESSIONS_KEY, JSON.stringify(updated));
    setStoredAccounts(updated);
  };

  const removeStoredAccount = (userId: string) => {
    const existing = JSON.parse(localStorage.getItem(STORED_SESSIONS_KEY) || '[]') as StoredSession[];
    const updated = existing.filter(a => a.userId !== userId);
    localStorage.setItem(STORED_SESSIONS_KEY, JSON.stringify(updated));
    setStoredAccounts(updated);
  };

  const fetchUserRole = async (userId: string): Promise<AppRole | null> => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (data && !error) {
      return data.role as AppRole;
    }
    return null;
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(async () => {
            const userRole = await fetchUserRole(session.user.id);
            setRole(userRole);
            if (userRole) {
              saveSession(session, userRole);
            }
          }, 0);
        } else {
          setRole(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const userRole = await fetchUserRole(session.user.id);
        setRole(userRole);
        if (userRole) {
          saveSession(session, userRole);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string, role: AppRole = 'viewer') => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: fullName, role }
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setRole(null);
  };

  const switchAccount = async (account: StoredSession) => {
    try {
      const { error } = await supabase.auth.setSession({
        access_token: account.accessToken,
        refresh_token: account.refreshToken,
      });
      
      if (error) {
        // Token might be expired, remove from stored accounts
        removeStoredAccount(account.userId);
        return { error };
      }
      
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      role, 
      loading, 
      storedAccounts,
      signIn, 
      signUp, 
      signOut,
      switchAccount,
      removeStoredAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};
