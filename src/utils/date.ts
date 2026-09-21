/**
 * Date utility functions for booking and calendar date blocking
 */

/**
 * Returns today's date formatted as YYYY-MM-DD in local time
 */
export const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Returns tomorrow or a date offset by N days formatted as YYYY-MM-DD
 */
export const getNextDayDateString = (dateStr?: string, daysOffset = 1): string => {
  if (!dateStr) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Parse YYYY-MM-DD cleanly without timezone drift
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const targetDate = new Date(year, month, day + daysOffset);
    const resYear = targetDate.getFullYear();
    const resMonth = String(targetDate.getMonth() + 1).padStart(2, '0');
    const resDay = String(targetDate.getDate()).padStart(2, '0');
    return `${resYear}-${resMonth}-${resDay}`;
  }

  const baseDate = new Date(dateStr);
  baseDate.setDate(baseDate.getDate() + daysOffset);
  const year = baseDate.getFullYear();
  const month = String(baseDate.getMonth() + 1).padStart(2, '0');
  const day = String(baseDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Checks whether a given YYYY-MM-DD date string is in the past
 */
export const isDateInPast = (dateStr: string): boolean => {
  if (!dateStr) return false;
  const today = getTodayDateString();
  return dateStr < today;
};
