import { getDateForSearch } from "./helpers"
import { handleError, mapService, mapServiceDetailed } from "./mapping"
import { Service, ServiceDetailed } from "./types"

/**
 * Facilitates service searches by ID
 */
abstract class ServiceSearch {
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
   * Get raw data from the API for a service
   * @param id ID of the service
   * @param date Date to search for services on
   * @returns Raw JSON data from the API
   */
  protected async getRaw(id: string, date = new Date()) {
    const url = `https://api.rtt.io/api/v1/json/service/${id}/${getDateForSearch(date)}`
    const res = await fetch(url, {
      headers: {
        Authorization: "Basic " + this.token,
      },
    })
    const data = await res.json()
    return handleError(data)
  }
}

export class ServiceSearchSimple extends ServiceSearch {
  /**
   * Gets a service by its ID
   * @param id ID of the service
   * @param date Date on which the service ran
   * @returns A promise that resolves to a {@link Service} object
   */
  public async get(id: string, date = new Date()): Promise<Service> {
    const raw = await this.getRaw(id, date)
    return mapService(raw)
  }
}

export class ServiceSearchDetailed extends ServiceSearch {
  /**
   * Gets a service by its ID
   * @param id ID of the service
   * @param date Date on which the service ran
   * @returns A promise that resolves to a {@link Service} object
   */
  public async get(id: string, date = new Date()): Promise<ServiceDetailed> {
    const raw = await this.getRaw(id, date)
    return mapServiceDetailed(raw)
  }
}
