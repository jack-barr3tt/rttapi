import { getDateForSearch } from "./helpers"
import { handleError, mapContainer, mapContainerDetailed } from "./mapping"
import { Container, ContainerDetailed } from "./types"

/**
 * Facilitates location-based service searches
 */
abstract class LocationSearch {
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
   * Get raw data from the API for services at a given location
   * @param station CRS code of the station to search
   * @param date Date to search for services on
   * @returns Raw JSON data from the API
   */
  protected async atRaw(station: string, date?: Date) {
    const url =
      `https://api.rtt.io/api/v1/json/search/${station}` +
      (date ? "/" + getDateForSearch(date) : "")
    const res = await fetch(url, {
      headers: {
        Authorization: "Basic " + this.token,
      },
    })
    const data = await res.json()
    return handleError(data)
  }

  /**
   * Get raw data from the API for services between two given locations
   * @param from CRS code of the origin station
   * @param to CRS code of the destination station
   * @param date Date to search for services on
   * @returns Raw JSON data from the API
   */
  protected async betweenRaw(from: string, to: string, date?: Date) {
    const url =
      `https://api.rtt.io/api/v1/json/search/${from}/to/${to}` +
      (date ? "/" + getDateForSearch(date) : "")
    const res = await fetch(url, {
      headers: {
        Authorization: "Basic " + this.token,
      },
    })
    const data = await res.json()
    return handleError(data)
  }
}

export class LocationSearchSimple extends LocationSearch {
  /**
   * Search for services at a given location
   * @param station The CRS code of the station to search
   * @param date The date to search for services on
   * @returns A promise that resolves to a {@link Container} object
   */
  public async at(station: string, date?: Date): Promise<Container> {
    return mapContainer(await this.atRaw(station, date))
  }

  /**
   * Search for services between two given locations
   * @param from The CRS code of the origin station
   * @param to The CRS code of the destination station
   * @param date The date to search for services on
   * @returns A promise that resolves to a {@link Container} object
   */
  public async between(from: string, to: string, date?: Date): Promise<Container> {
    return mapContainer(await this.betweenRaw(from, to, date))
  }
}

export class LocationSearchDetailed extends LocationSearch {
  /**
   * Search for services at a given location
   * @param station The CRS code of the station to search
   * @param date The date to search for services on
   * @returns A promise that resolves to a {@link Container} object
   */
  public async at(station: string, date?: Date): Promise<ContainerDetailed> {
    return mapContainerDetailed(await this.atRaw(station, date))
  }

  /**
   * Search for services between two given locations
   * @param from The CRS code of the origin station
   * @param to The CRS code of the destination station
   * @param date The date to search for services on
   * @returns A promise that resolves to a {@link Container} object
   */
  public async between(from: string, to: string, date?: Date): Promise<ContainerDetailed> {
    return mapContainerDetailed(await this.betweenRaw(from, to, date))
  }
}
