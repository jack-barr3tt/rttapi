import { LocationSearch } from "./locations"
import { ServiceSearch } from "./services"

/**
 * Client used to access the Real Time Trains API
 */
export class RTTClient {
  /**
   * @property {string} token Base64 encoded token for the API
   */
  private token: string
  public locations: LocationSearch
  public service: ServiceSearch

  /**
   * @param username Username for the API
   * @param password Password for the API
   */
  constructor(username: string, password: string) {
    this.token = Buffer.from(`${username}:${password}`).toString("base64")
    this.locations = new LocationSearch(this.token)
    this.service = new ServiceSearch(this.token)
  }
}
