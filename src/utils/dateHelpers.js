import { format } from 'date-fns';

/** Format a number as INR currency. */
export function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

/** Format an ISO date (YYYY-MM-DD) as "dd MMM yyyy". */
export function formatDate(iso, fmt = 'dd MMM yyyy') {
  if (!iso) return '';
  try {
    const d = iso.includes('T') ? new Date(iso) : new Date(iso + 'T00:00:00');
    return format(d, fmt);
  } catch {
    return iso;
  }
}

/** Today's date as YYYY-MM-DD (local). */
export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

/** Add days to an ISO date string, return ISO. */
export function addDaysISO(iso, days) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Short day label e.g. "Mon 24". */
export function shortDay(iso) {
  return formatDate(iso, 'EEE dd');
}
