import { getDateForSearch } from "./helpers"
import { mapContainer } from "./mapping"
import { Container } from "./types"

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
   * Search for services at a given location
   * @param station The CRS code of the station to search
   * @param date The date to search for services on
   * @returns A promise that resolves to a {@link Container} object
   */
  async at(station: string, date?: Date): Promise<Container> {
    const url =
      `https://api.rtt.io/api/v1/json/search/${station}` +
      (date ? "/" + getDateForSearch(date) : "")
    const res = await fetch(url, {
      headers: {
        Authorization: "Basic " + this.token,
      },
    })
    const data = await res.json()

    return mapContainer(data)
  }

  /**
   * Search for services between two given locations
   * @param from The CRS code of the origin station
   * @param to The CRS code of the destination station
   * @param date The date to search for services on
   * @returns A promise that resolves to a {@link Container} object
   */
  async between(from: string, to: string, date?: Date): Promise<Container> {
    const url =
      `https://api.rtt.io/api/v1/json/search/${from}/to/${to}` +
      (date ? "/" + getDateForSearch(date) : "")
    const res = await fetch(url, {
      headers: {
        Authorization: "Basic " + this.token,
      },
    })
    const data = await res.json()

    return mapContainer(data)
  }
}
