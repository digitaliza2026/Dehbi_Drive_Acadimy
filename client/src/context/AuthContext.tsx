import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthCtx {
  token: string | null;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthCtx>({
  token: null,
  username: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('dehbi_token'));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('dehbi_user'));

  useEffect(() => {
    if (token) {
      fetch('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => { if (!r.ok) logout(); })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (u: string, p: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: u, password: p })
    });
    if (!res.ok) return false;
    const data = await res.json();
    localStorage.setItem('dehbi_token', data.token);
    localStorage.setItem('dehbi_user', data.username);
    setToken(data.token);
    setUsername(data.username);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('dehbi_token');
    localStorage.removeItem('dehbi_user');
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
