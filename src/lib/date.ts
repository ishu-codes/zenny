import { differenceInCalendarDays, format, formatRelative } from "date-fns";

export const getFormattedRelativeDateTime = (dateData: string | Date) => {
  const selectedDate = new Date(dateData);

  const daysGap = selectedDate.getDate() - new Date().getDate();
  if (Math.abs(daysGap) <= 1) {
    const date = new Intl.RelativeTimeFormat("en", {
      style: "long",
      numeric: "auto",
    }).format(daysGap, "days");
    const time = new Intl.DateTimeFormat("en", { timeStyle: "short" }).format(
      selectedDate
    );
    return `${date.charAt(0).toUpperCase() + date.slice(1)}, ${time}`;
  }

  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    selectedDate
  );
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
    selectedDate
  );
  //   const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
  //     selectedDate
  //   );
  const weekday = new Intl.DateTimeFormat("en", { weekday: "short" }).format(
    selectedDate
  );

  return `${weekday}, ${day} ${month}`;
};

export const getFormattedDateTime = (dateData: string | Date) => {
  const selectedDate = new Date(dateData);
  const year = new Intl.DateTimeFormat("en", {
    year: "numeric",
  }).format(selectedDate);
  const month = new Intl.DateTimeFormat("en", {
    month: "short",
  }).format(selectedDate);
  const day = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(selectedDate);

  const time = new Intl.DateTimeFormat("en", { timeStyle: "short" }).format(
    selectedDate
  );
  return `${day} ${month} ${year}, ${time}`;
};

export function getFormattedTime(
  date: Date | string,
  absolute: boolean = false
) {
  const targetDate = new Date(date);
  const baseDate = new Date();
  const dayDiff = Math.abs(differenceInCalendarDays(targetDate, baseDate));

  if (absolute) return format(targetDate, "d LLL y, h:mm a");
  if (dayDiff > 6) return format(targetDate, "d LLL y");
  return formatRelative(targetDate, baseDate);
}

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat.
 *
 * Supports input as Date, timestamp (number), or string (ISO or parseable format).
 */
// export function getRelativeTimeString(
//   date: Date | number | string,
//   lang = navigator.language
// ): string {
//   let timeMs: number;

//   if (typeof date === "string") {
//     const parsed = new Date(date);
//     if (isNaN(parsed.getTime())) {
//       throw new Error(`Invalid date string: "${date}"`);
//     }
//     timeMs = parsed.getTime();
//   } else if (typeof date === "number") {
//     timeMs = date;
//   } else {
//     timeMs = date.getTime();
//   }

//   const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

//   const cutoffs = [
//     60,
//     3600,
//     86400,
//     86400 * 7,
//     86400 * 30,
//     86400 * 365,
//     Infinity,
//   ];
//   const units: Intl.RelativeTimeFormatUnit[] = [
//     "second",
//     "minute",
//     "hour",
//     "day",
//     "week",
//     "month",
//     "year",
//   ];

//   const unitIndex = cutoffs.findIndex(
//     (cutoff) => cutoff > Math.abs(deltaSeconds)
//   );
//   const divisor = unitIndex > 0 ? cutoffs[unitIndex - 1] : 1;

//   const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
//   return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
// }
