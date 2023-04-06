import { RTTLocationStop } from "./api-types"
import { CallType, RouteTerminator } from "./types"

/**
 * Convert a time as a string to a Date object, or undefined if there is no time given
 * @param runDate Date of the service so the time is on the correct day
 * @param time Time as a string in the format HHmm
 */
export function getServiceTime(runDate: Date, time?: string, nextDay = false): Date | undefined {
  if (!time) return undefined

  const date = new Date(runDate.getTime() + (nextDay ? 1000 * 60 * 60 * 24 : 0))
  date.setHours(+time.substring(0, 2))
  date.setMinutes(+time.substring(2, 4))
  return date
}

/**
 * Convert a string representation of the call type to an enum
 * @param type The string we got from the API
 * @returns An enum representing the call type
 */
export function getCallType(type: String): CallType {
  switch (type) {
    case "ORIGIN":
      return CallType.Origin
    case "CALL":
      return CallType.Call
    case "DESTINATION":
      return CallType.Destination
    default:
      return CallType.Call
  }
}

/**
 * Turns a string representation of a date into a Date object
 * @param runDate Date as a string in the format YYYY-MM-DD
 * @returns A Date object representing when the service ran
 */
export function getRunDate(runDate: string): Date {
  return new Date(runDate + "T00:00:00")
}

/**
 * Generate a {@link RouteTerminator} object from a stop
 * @param stop The stop data from the API
 * @param runDate The date the service ran
 * @param crs The CRS code of the stop since the API doesn't provide it here
 * @returns A {@link RouteTerminator} object representing the stop
 */
function parseStop(stop: RTTLocationStop, runDate: Date, crs?: string): RouteTerminator {
  return {
    name: stop.description,
    crs: crs || "PLACEHOLDER",
    tiploc: stop.tiploc,
    time: getServiceTime(runDate, stop.workingTime)!,
  }
}

/**
 * Generate a the origin and destination {@link RouteTerminator} for a service
 * @param origin The origin stop data from the API
 * @param destination The destination stop data from the API
 * @param runDate The date the service ran
 * @param crs The CRS code of the destination since the API doesn't provide it here
 * @returns A {@link RouteTerminator} object representing the stop
 */
export function parseOriginDestination(
  origin: RTTLocationStop,
  destination: RTTLocationStop,
  runDate: Date | string,
  crs?: string
) {
  const formattedRunDate = typeof runDate === "string" ? getRunDate(runDate) : runDate

  const originParsed = parseStop(origin, formattedRunDate, crs)

  let destinationParsed: RouteTerminator

  if (
    getServiceTime(formattedRunDate, destination.workingTime)!.getTime() <
    originParsed.time.getTime()
  )
    destinationParsed = parseStop(
      destination,
      new Date(formattedRunDate.getTime() + 1000 * 60 * 60 * 24),
      crs
    )
  else destinationParsed = parseStop(destination, formattedRunDate, crs)

  return {
    origin: originParsed,
    destination: destinationParsed,
  }
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
