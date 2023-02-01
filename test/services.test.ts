import { RTTClient } from "../dist"
import dotenv from "dotenv"
import { ServiceAtLocation } from "../src/types"

describe("Location search", () => {
  dotenv.config()

  const client = new RTTClient(process.env.TEST_RTT_USERNAME!, process.env.TEST_RTT_PASSWORD!)
  let testService: ServiceAtLocation

  beforeAll(async () => {
    testService = (await client.locations.at("EUS")).services[0]
  })

  it("Can get a service by ID and date", async () => {
    const service = await client.service.get(testService.id, testService.runDate)

    expect(service).toBeDefined()
    expect(service.id).toBe(testService.id)
    expect(service.identity).toBe(testService.identity)
  })
})
