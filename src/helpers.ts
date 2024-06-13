/**
 * Convert a time as a string to a Date object, or undefined if there is no time given
 * @param runDate Date of the service so the time is on the correct day
 * @param time Time as a string in the format HHmm
 * @param isNextDay Whether the service runs past midnight
 */
export function getServiceTime(
  runDate: string,
  time: string | undefined,
  isNextDay: boolean | undefined
): Date | undefined {
  if (!time) return undefined

  const timeRegex = /\b(\d{4}|\d{6})\b/
  if (!timeRegex.test(time)) throw new Error("Invalid time format")

  const date = new Date(getRunDate(runDate).getTime())

  // Handle hours and minutes
  date.setHours(+time.substring(0, 2))
  date.setMinutes(+time.substring(2, 4))
  // Handle seconds if they are present
  if (time.length === 6) date.setSeconds(+time.substring(4, 6))

  // Handle services that run past midnight
  if (isNextDay) date.setDate(date.getDate() + 1)

  return date
}

/**
 * Turns a string representation of a date into a Date object
 * @param runDate Date as a string in the format YYYY-MM-DD
 * @returns A Date object representing when the service ran
 */
export function getRunDate(runDate: string): Date {
  const dateRegex = /\b(\d{4}-\d{2}-\d{2})\b/
  if (!dateRegex.test(runDate)) throw new Error("Invalid date format")

  return new Date(runDate + "T00:00:00")
}

/**
 * Convert a JavaScript Date object into a string that can be used in a search URL
 * @param date
 * @returns A string in the format YYYY/MM/DD
 */
export function getDateForSearch(date: Date): string {
  return `${date.getFullYear()}/${(date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1)}/${
    (date.getDate() < 10 ? "0" : "") + date.getDate()
  }`
}
