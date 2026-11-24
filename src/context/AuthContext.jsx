import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService } from '@/services/authService';
import { ROLES } from '@/utils/constants';

const AuthContext = createContext(null);

const TOKEN_KEY = 'nivaala_token';
const USER_KEY = 'nivaala_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedToken && savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setToken(savedToken);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persist = useCallback((tok, usr) => {
    localStorage.setItem(TOKEN_KEY, tok);
    localStorage.setItem(USER_KEY, JSON.stringify(usr));
    setToken(tok);
    setUser(usr);
  }, []);

  const login = useCallback(async (email, password) => {
    const { token: tok, user: usr } = await authService.login({ email, password });
    persist(tok, usr);
    return usr;
  }, [persist]);

  const signup = useCallback(async (data) => {
    const { token: tok, user: usr } = await authService.signup(data);
    persist(tok, usr);
    return usr;
  }, [persist]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      localStorage.setItem(USER_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = {
    user, token, loading,
    isAuthenticated: !!user,
    isStudent: user?.role === ROLES.STUDENT,
    isAdmin: user?.role === ROLES.ADMIN,
    login, signup, logout, updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
