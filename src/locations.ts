import { getDateForSearch } from "./helpers"
import { mapContainer, mapContainerDetailed } from "./mapping"
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

  protected async atRaw(station: string, date?: Date) {
    const url =
      `https://api.rtt.io/api/v1/json/search/${station}` +
      (date ? "/" + getDateForSearch(date) : "")
    const res = await fetch(url, {
      headers: {
        Authorization: "Basic " + this.token,
      },
    })
    return res.json()
  }

  protected async betweenRaw(from: string, to: string, date?: Date) {
    const url =
      `https://api.rtt.io/api/v1/json/search/${from}/to/${to}` +
      (date ? "/" + getDateForSearch(date) : "")
    const res = await fetch(url, {
      headers: {
        Authorization: "Basic " + this.token,
      },
    })
    return res.json()
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
