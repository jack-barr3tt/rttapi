import { RTTClient } from "../dist"
import dotenv from "dotenv"
import { ServiceAtLocation } from "../src/types"

describe("Location search", () => {
  dotenv.config()

  const client = new RTTClient(process.env.TEST_RTT_USERNAME!, process.env.TEST_RTT_PASSWORD!)
  let services: ServiceAtLocation[] = []

  beforeAll(async () => {
    services = (await client.locations.at("EUS", new Date())).services
  })

  it("Can get a service by ID and date", async () => {
    const testService = services[0]
    const service = await client.service.get(testService.id, testService.runDate)

    expect(service).toBeDefined()
    expect(service.id).toBe(testService.id)
    expect(service.identity).toBe(testService.identity)
  })

  it("Handles services that start and end on different days", async () => {
    const incorrect = services.filter((s) => s.origin.time.getTime() > s.destination.time.getTime())
    expect(incorrect.length).toBe(0)

    const differentDay = services.filter(
      (s) => s.origin.time.getDate() !== s.destination.time.getDate()
    )
    differentDay.sort((a, b) => b.destination.time.getTime() - a.destination.time.getTime())

    const testService = differentDay[0]

    const service = await client.service.get(testService.id, testService.runDate)

    expect(service.destination.time).toEqual(testService.destination.time)
    expect(service.origin.time).toEqual(testService.origin.time)

    expect(service.destination.time.getDate()).toEqual(
      service.stops.find((s) => s.crs == service.destination.crs)!.bookedArrival?.getDate()
    )
  })
})
