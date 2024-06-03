import { LocationSearchDetailed, LocationSearchSimple } from "./locations"
import { ServiceSearchDetailed, ServiceSearchSimple } from "./services"

/**
 * Client used to access the Real Time Trains API
 */
export class RTTClient {
  /**
   * @property {string} token Base64 encoded token for the API
   */
  private token: string
  public locations: LocationSearchSimple
  public service: ServiceSearchSimple

  /**
   * @param username Username for the API
   * @param password Password for the API
   */
  constructor(username: string, password: string) {
    this.token = Buffer.from(`${username}:${password}`).toString("base64")
    this.locations = new LocationSearchSimple(this.token)
    this.service = new ServiceSearchSimple(this.token)
  }
}

export class RTTClientDetailed {
  /**
   * @property {string} token Base64 encoded token for the API
   */
  private token: string
  public locations: LocationSearchDetailed
  public service: ServiceSearchDetailed

  /**
   * @param username Username for the API
   * @param password Password for the API
   */
  constructor(username: string, password: string) {
    this.token = Buffer.from(`${username}:${password}`).toString("base64")
    this.locations = new LocationSearchDetailed(this.token)
    this.service = new ServiceSearchDetailed(this.token)
  }
}
