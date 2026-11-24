// Skip / pause cut-off logic
import { SKIP_CUTOFF_HOUR, SKIP_STATUS } from './constants';
import { todayISO, addDaysISO } from './dateHelpers';

/**
 * A skip is only eligible for a credit (CONFIRMED) if it is requested
 * before SKIP_CUTOFF_HOUR (9 PM) on the day before the skipped meal.
 * Same-day or late skips are marked TOO_LATE (no refund — food already being prepped).
 */
export function evaluateSkipStatus(fromDate) {
  const today = new Date(todayISO() + 'T00:00:00');
  const target = new Date(fromDate + 'T00:00:00');
  const diffDays = Math.round((target - today) / 86400000);

  if (diffDays > 1) return SKIP_STATUS.CONFIRMED;
  if (diffDays === 1) {
    // Need to check before 9 PM today
    return new Date().getHours() < SKIP_CUTOFF_HOUR
      ? SKIP_STATUS.CONFIRMED
      : SKIP_STATUS.TOO_LATE;
  }
  return SKIP_STATUS.TOO_LATE;
}

/** Is the given target date too late to skip (for UI disabling)? */
export function isTooLateForDate(targetISO) {
  return evaluateSkipStatus(targetISO) === SKIP_STATUS.TOO_LATE;
}

/** Number of meals between two ISO dates (inclusive) for given meal list. */
export function countMealsInRange(fromISO, toISO, meals) {
  const from = new Date(fromISO + 'T00:00:00');
  const to = new Date(toISO + 'T00:00:00');
  const days = Math.round((to - from) / 86400000) + 1;
  return Math.max(0, days) * meals.length;
}

/** Tomorrow's ISO date. */
export function tomorrowISO() {
  return addDaysISO(todayISO(), 1);
}
