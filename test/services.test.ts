import { RTTClient } from "../dist"
import dotenv from "dotenv"
import { LocationContainer } from "../src/types"

describe("Service search", () => {
  dotenv.config()

  const client = new RTTClient(process.env.TEST_RTT_USERNAME!, process.env.TEST_RTT_PASSWORD!)
  let services: LocationContainer[] = []

  beforeAll(async () => {
    services = (await client.locations.at("EUS", new Date())).services
  })

  it("Can get a service by ID and date", async () => {
    const testService = services[0]
    const service = await client.service.get(testService.serviceUid, testService.runDate)

    expect(service).toBeDefined()
    expect(service.serviceUid).toBe(testService.serviceUid)
    expect(service.runningIdentity).toBe(testService.runningIdentity)
  })
})
