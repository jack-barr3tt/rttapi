import LocationSearch from "./locations"
import ServiceSearch from "./services"

export default class RTTClient {
	private token: string
	public locations: LocationSearch
	public service: ServiceSearch

	constructor(username: string, password: string) {
		this.token = Buffer.from(`${username}:${password}`).toString("base64")
		this.locations = new LocationSearch(this.token)
		this.service = new ServiceSearch(this.token)
	}
}
