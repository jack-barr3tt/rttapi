import { RTTServiceFull } from "./api-types"
import {
  getCallType,
  getDateForSearch,
  getRunDate,
  getServiceTime,
  parseOriginDestination,
} from "./helpers"
import { CallType, Service } from "./types"

/**
 * Facilitates service searches by ID
 */
export class ServiceSearch {
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
   * Converts an {@link RTTServiceFull} object into a {@link Service} object
   * @param rawService Data from the API
   * @returns A {@link Service} object which is easier to work with
   */
  private parseService(rawService: RTTServiceFull): Service {
    const runDate = getRunDate(rawService.runDate)

    const { origin, destination } = parseOriginDestination(
      rawService.origin[0],
      rawService.destination[0],
      runDate
    )

    for (const loc of rawService.locations) {
      if (loc.tiploc == origin.tiploc) {
        origin.crs = loc.crs
      }
      if (loc.tiploc == destination.tiploc) {
        destination.crs = loc.crs
      }
    }

    const service: Service = {
      id: rawService.serviceUid,
      runDate,
      identity: rawService.runningIdentity,
      operator: {
        code: rawService.atocCode,
        name: rawService.atocName,
      },
      type: rawService.serviceType,
      isPassenger: rawService.isPassenger,
      monitored: rawService.performanceMonitored,
      origin,
      destination,
      stops: rawService.locations.map((loc) => ({
        name: loc.description,
        crs: loc.crs,
        tiploc: loc.tiploc,
        realtime: loc.realtimeActivated,
        bookedArrival: getServiceTime(runDate, loc.gbttBookedArrival, loc.gbttBookedArrivalNextDay),
        bookedDeparture: getServiceTime(
          runDate,
          loc.gbttBookedDeparture,
          loc.gbttBookedDepartureNextDay
        ),
        realtimeArrival: getServiceTime(runDate, loc.realtimeArrival, loc.realtimeArrivalNextDay),
        realtimeDeparture: getServiceTime(
          runDate,
          loc.realtimeDeparture,
          loc.realtimeDepartureNextDay
        ),
        arrivalLateness: loc.realtimeGbttArrivalLateness,
        departureLateness: loc.realtimeGbttDepartureLateness,
        origin,
        destination,
        isCall: loc.isCall,
        isPublicCall: loc.isPublicCall,
        platform: loc.platform
          ? {
              name: loc.platform,
              confirmed: loc.platformConfirmed!,
              changed: loc.platformChanged!,
            }
          : undefined,
        line: loc.line
          ? {
              name: loc.line,
              confirmed: loc.lineConfirmed!,
            }
          : undefined,
        path: loc.path
          ? {
              name: loc.path,
              confirmed: loc.pathConfirmed!,
            }
          : undefined,
        callType: getCallType(loc.displayAs),
        atPlatform: !!loc.serviceLocation,
        cancelled: getCallType(loc.displayAs) == CallType.Cancelled,
        cancelledReason:
          getCallType(loc.displayAs) == CallType.Cancelled
            ? {
                short: loc.cancelReasonShortText,
                long: loc.cancelReasonLongText,
                code: loc.cancelReasonCode,
              }
            : undefined,
      })),
      realtime: rawService.realtimeActivated,
    }

    return service
  }

  /**
   * Gets a service by its ID
   * @param id ID of the service
   * @param date Date on which the service ran
   * @returns A promise that resolves to a {@link Service} object
   */
  async get(id: string, date = new Date()): Promise<Service> {
    const url = `https://api.rtt.io/api/v1/json/service/${id}/${getDateForSearch(date)}`
    const res = await fetch(url, {
      headers: {
        Authorization: "Basic " + this.token,
      },
    })
    const data = await res.json()

    return this.parseService(data)
  }
}
