export default class RTTClient {
	private token: string

	constructor(username: string, password: string) {
		this.token = Buffer.from(`${username}:${password}`).toString("base64")
	}
}
