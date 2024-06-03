import { LocationContainer, RTTClient } from "../dist"
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

  it("Handles services that start and end on different days", async () => {
    const { services } = await client.locations.at("EUS", new Date())

    const getEarliestOrigin = (s: LocationContainer) =>
      s.locationDetail.origin.reduce((prev, curr) =>
        prev.publicTime && curr.publicTime && prev.publicTime < curr.publicTime ? prev : curr
      )
    const getLatestDestination = (s: LocationContainer) =>
      s.locationDetail.destination.reduce((prev, curr) =>
        prev.publicTime && curr.publicTime && prev.publicTime > curr.publicTime ? prev : curr
      )

    // Check that the earliest destination time is after the latest origin time
    const incorrect = services.filter((s) => {
      return (
        (getEarliestOrigin(s).publicTime?.getTime() || 0) >
        (getLatestDestination(s).publicTime?.getTime() || 0)
      )
    })

    expect(incorrect.length).toBe(0)

    const differentDay = services.filter(
      (s) =>
        getEarliestOrigin(s).publicTime?.getDate() != getLatestDestination(s).publicTime?.getDate()
    )
    differentDay.sort(
      (a, b) =>
        (getLatestDestination(b).publicTime?.getTime() || 0) -
        (getLatestDestination(a).publicTime?.getTime() || 0)
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
