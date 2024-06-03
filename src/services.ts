import { getDateForSearch } from "./helpers"
import { mapService } from "./mapping"
import { Service } from "./types"

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

    return mapService(data)
  }
}
