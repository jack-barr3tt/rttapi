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

  it("Handles services that start and end on different days", async () => {
    const getEarliestOrigin = (s: LocationContainer) =>
      s.origin.reduce((prev, curr) => (prev.workingTime < curr.workingTime ? prev : curr))
    const getLatestDestination = (s: LocationContainer) =>
      s.destination.reduce((prev, curr) => (prev.workingTime > curr.workingTime ? prev : curr))

    // Check that the earliest destination time is after the latest origin time
    const incorrect = services.filter(
      (s) =>
        getEarliestOrigin(s).workingTime.getTime() > getLatestDestination(s).workingTime.getTime()
    )
    expect(incorrect.length).toBe(0)

    const differentDay = services.filter(
      (s) =>
        getEarliestOrigin(s).workingTime.getDate() != getLatestDestination(s).workingTime.getDate()
    )
    differentDay.sort(
      (a, b) =>
        getLatestDestination(b).workingTime.getTime() -
        getLatestDestination(a).workingTime.getTime()
    )

    // const testService = differentDay[0]

    // const service = await client.service.get(testService.serviceUid, testService.runDate)

    // expect(service.destination.time).toEqual(testService.destination.time)
    // expect(service.origin.time).toEqual(testService.origin.time)

    // expect(service.destination.time.getDate()).toEqual(
    //   service.stops.find((s) => s.crs == service.destination.crs)!.bookedArrival?.getDate()
    // )
  })
})
