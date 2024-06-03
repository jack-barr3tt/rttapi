import { RTTClient } from "../dist"
import dotenv from "dotenv"

describe("Location search", () => {
  dotenv.config()

  const client = new RTTClient(process.env.TEST_RTT_USERNAME!, process.env.TEST_RTT_PASSWORD!)

  it("Can get a location without a date", async () => {
    const location = await client.locations.at("EUS")
    expect(location).toBeDefined()
    expect(location.location.name).toBe("London Euston")
  })

  it("Can get a location with a date", async () => {
    const location = await client.locations.at("EUS", new Date())
    expect(location).toBeDefined()
    expect(location.location.name).toBe("London Euston")
  })

  it("Throws an error if the CRS code is invalid", async () => {
    await expect(client.locations.at("INVALID")).rejects.toThrow()
  })
})
