// Simple validators used by react-hook-form resolvers
export const validators = {
  required: (msg = 'This is required') => (v) => (v && String(v).trim() ? undefined : msg),
  email: (msg = 'Enter a valid email') => (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? undefined : msg,
  phone: (msg = 'Enter a valid 10-digit phone') => (v) =>
    /^\d{10}$/.test(String(v).replace(/\D/g, '')) ? undefined : msg,
  minLen: (n, msg) => (v) =>
    String(v).length >= n ? undefined : (msg || `Must be at least ${n} characters`),
  password: (msg = 'At least 6 characters') => (v) =>
    String(v).length >= 6 ? undefined : msg,
};
