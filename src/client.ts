import LocationSearch from "./locations"
export default class RTTClient {
	private token: string
	public locations: LocationSearch

	constructor(username: string, password: string) {
		this.token = Buffer.from(`${username}:${password}`).toString("base64")
		this.locations = new LocationSearch(this.token)
	}
}
