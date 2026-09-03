import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const TOKEN_KEY = 'compliance_token';

const api = async (path, opts = {}) => {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(path, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    throw err;
  }
  return data;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setLoading(false); return; }
    api('/api/auth/me')
      .then(({ user }) => setUser(user))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const changePassword = (currentPassword, newPassword) =>
    api('/api/auth/password', { method: 'POST', body: JSON.stringify({ currentPassword, newPassword }) });

  const value = { user, loading, login, logout, changePassword, api };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
