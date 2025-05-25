// lib/date-utils.ts
import { toZonedTime } from 'date-fns-tz';
import { format as formatDateFns } from 'date-fns';

const timeZone = 'Europe/London';

export function formatEventDate(isoString?: string): string {
  if (!isoString) return "Date TBD";
  try {
    const date = new Date(isoString);
    const zonedDate = toZonedTime(date, timeZone);
    return formatDateFns(zonedDate, 'd MMMM yyyy');
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
}
