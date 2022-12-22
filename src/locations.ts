import { RTTLocationSearch } from "./api-types"
import { getCallType, getRunDate, getServiceTime, parseStop } from "./helpers"
import { Location } from "./types"

/**
 * Facilitates location-based service searches
 */
export class LocationSearch {
  /**
   * Base64 encoded token for the API
   */
  private token: string

  /**
   * @param token token provided by the client
   */
  constructor(token: string) {
    this.token = token
  }

  /**
   * Converts an {@link RTTLocationSearch} object into a {@link Location} object
   * @param rawLocation Data from the API
   * @returns A {@link Location} object which is easier to work with
   */
  private parseLocation(rawLocation: RTTLocationSearch): Location {
    const location: Location = {
      name: rawLocation.location.name,
      crs: rawLocation.location.crs,
      tiploc: rawLocation.location.tiploc,
      services: rawLocation.services
        ? rawLocation.services.map((service) => {
            const origin = parseStop(
              service.locationDetail.origin[0],
              service.runDate,
              rawLocation.location.crs
            )
            const destination = parseStop(
              service.locationDetail.destination[0],
              service.runDate,
              rawLocation.location.crs
            )

            return {
              id: service.serviceUid,
              runDate: new Date(service.runDate + "T00:00:00"),
              identity: service.runningIdentity,
              origin,
              destination,
              operator: {
                name: service.atocName,
                code: service.atocCode,
              },
              type: service.serviceType,
              isPassenger: service.isPassenger,

              name: service.locationDetail.description,
              crs: service.locationDetail.crs,
              tiploc: service.locationDetail.tiploc,
              realtime: service.locationDetail.realtimeActivated,
              bookedArrival: getServiceTime(
                getRunDate(service.runDate),
                service.locationDetail.gbttBookedArrival
              )!,
              bookedDeparture: getServiceTime(
                getRunDate(service.runDate),
                service.locationDetail.gbttBookedDeparture
              )!,
              realtimeArrival: getServiceTime(
                getRunDate(service.runDate),
                service.locationDetail.realtimeArrival
              )!,
              realtimeDeparture: getServiceTime(
                getRunDate(service.runDate),
                service.locationDetail.realtimeDeparture
              )!,
              callType: getCallType(service.locationDetail.displayAs),
              isCall: service.locationDetail.isCall,
              isPublicCall: service.locationDetail.isPublicCall,
            }
          })
        : [],
    }

    return location
  }

  /**
   * Search for services at a given location
   * @param station The CRS code of the station to search
   * @param date The date to search for services on
   * @returns A promise that resolves to a {@link Location} object
   */
  async at(station: string, date?: Date): Promise<Location> {
    const url =
      `https://api.rtt.io/api/v1/json/search/${station}` +
      (date ? `/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` : "")
    const res = await fetch(url, {
      headers: {
        Authorization: "Basic " + this.token,
      },
    })
    const data = await res.json()

    return this.parseLocation(data)
  }

  /**
   * Search for services between two given locations
   * @param from The CRS code of the origin station
   * @param to The CRS code of the destination station
   * @param date The date to search for services on
   * @returns A promise that resolves to a {@link Location} object
   */
  async between(from: string, to: string, date?: Date): Promise<Location> {
    const url =
      `https://api.rtt.io/api/v1/json/search/${from}/to/${to}` +
      (date ? `/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` : "")
    const res = await fetch(url, {
      headers: {
        Authorization: "Basic " + this.token,
      },
    })
    const data = await res.json()

    return this.parseLocation(data)
  }
}
