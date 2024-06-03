import {
  RTTContainer,
  RTTContainerDetailed,
  RTTLocation,
  RTTLocationContainer,
  RTTLocationContainerDetailed,
  RTTLocationDetail,
  RTTLocationDetailed,
  RTTLocationFilter,
  RTTPair,
  RTTPairDetailed,
  RTTService,
  RTTServiceDetailed,
} from "./api-types"
import { getRunDate, getServiceTime } from "./helpers"
import {
  Container,
  ContainerDetailed,
  Location,
  LocationContainer,
  LocationContainerDetailed,
  LocationDetail,
  LocationDetailDetailed,
  LocationFilter,
  Pair,
  PairDetailed,
  Service,
  ServiceDetailed,
} from "./types"

export function mapContainer(inContainer: RTTContainer): Container {
  return {
    location: mapLocationDetail(inContainer.location),
    filter: mapLocationFilter(inContainer.filter),
    services: inContainer.services.map(mapLocationContainer),
  }
}

export function mapContainerDetailed(inContainer: RTTContainerDetailed): ContainerDetailed {
  return {
    location: mapLocationDetail(inContainer.location),
    filter: mapLocationFilter(inContainer.filter),
    services: inContainer.services.map(mapLocationContainerDetailed),
  }
}

function mapTiploc(inTiploc: string[] | string): string[] {
  return Array.isArray(inTiploc) ? inTiploc : [inTiploc]
}

function mapLocationDetail(inLocationDetail: RTTLocationDetail): Location {
  return {
    ...inLocationDetail,
    tiploc: mapTiploc(inLocationDetail.tiploc),
  }
}

function mapLocationFilter(
  inLocationFilter: RTTLocationFilter | undefined
): LocationFilter | undefined {
  return {
    origin: inLocationFilter?.origin ? mapLocationDetail(inLocationFilter.origin) : undefined,
    destination: inLocationFilter?.destination
      ? mapLocationDetail(inLocationFilter.destination)
      : undefined,
  }
}

function mapLocationContainer(inLocationContainer: RTTLocationContainer): LocationContainer {
  return {
    ...inLocationContainer,
    ...originDestinationTiming(
      inLocationContainer.runDate,
      inLocationContainer.origin,
      inLocationContainer.destination
    ),
    locationDetail: mapLocation(inLocationContainer.locationDetail, inLocationContainer.runDate),
    runDate: getRunDate(inLocationContainer.runDate),
  }
}

function mapLocationContainerDetailed(
  inLocationContainer: RTTLocationContainerDetailed
): LocationContainerDetailed {
  return {
    ...inLocationContainer,
    ...originDestinationTimingDetailed(
      inLocationContainer.runDate,
      inLocationContainer.origin,
      inLocationContainer.destination
    ),
    locationDetail: mapLocationDetailed(
      inLocationContainer.locationDetail,
      inLocationContainer.runDate
    ),
    runDate: getRunDate(inLocationContainer.runDate),
  }
}

function mapLocation(inLocation: RTTLocation, runDate: string): LocationDetail {
  return {
    ...inLocation,
    ...originDestinationTiming(runDate, inLocation.origin, inLocation.destination),
    tiploc: mapTiploc(inLocation.tiploc),
    gbttBookedArrival: getServiceTime(
      runDate,
      inLocation.gbttBookedArrival,
      inLocation.gbttBookedDeparture
    ),
    gbttBookedDeparture: getServiceTime(runDate, inLocation.gbttBookedDeparture),
    realtimeArrival: getServiceTime(
      runDate,
      inLocation.realtimeArrival,
      inLocation.realtimeDeparture
    ),
    realtimeDeparture: getServiceTime(runDate, inLocation.realtimeDeparture),
  }
}

function mapLocationDetailed(
  inLocation: RTTLocationDetailed,
  runDate: string
): LocationDetailDetailed {
  return {
    ...inLocation,
    tiploc: mapTiploc(inLocation.tiploc),
    gbttBookedArrival: getServiceTime(
      runDate,
      inLocation.gbttBookedArrival,
      inLocation.gbttBookedDeparture
    ),
    gbttBookedDeparture: getServiceTime(runDate, inLocation.gbttBookedDeparture),
    ...originDestinationTimingDetailed(runDate, inLocation.origin, inLocation.destination),
    realtimeArrival: getServiceTime(
      runDate,
      inLocation.realtimeArrival,
      inLocation.realtimeDeparture
    ),
    realtimeDeparture: getServiceTime(runDate, inLocation.realtimeDeparture),
    wttBookedArrival: getServiceTime(
      runDate,
      inLocation.wttBookedArrival,
      inLocation.wttBookedDeparture
    ),
    wttBookedDeparture: getServiceTime(runDate, inLocation.wttBookedDeparture),
    wttBookedPass: getServiceTime(runDate, inLocation.wttBookedPass, inLocation.wttBookedDeparture),
    realtimePass: getServiceTime(runDate, inLocation.realtimePass, inLocation.realtimeDeparture),
  }
}

function mapPair(inPair: RTTPair, runDate: string): Pair {
  return {
    ...inPair,
    publicTime: getServiceTime(runDate, inPair.publicTime),
  }
}

function mapPairDetailed(inPair: RTTPairDetailed, runDate: string): PairDetailed {
  return {
    ...inPair,
    publicTime: getServiceTime(runDate, inPair.publicTime),
    workingTime: getServiceTime(runDate, inPair.workingTime),
    tiploc: mapTiploc(inPair.tiploc),
  }
}

export function mapService(inService: RTTService): Service {
  return {
    ...inService,
    ...originDestinationTiming(inService.runDate, inService.origin, inService.destination),
    runDate: getRunDate(inService.runDate),
    locations: inService.locations.map((v) => mapLocation(v, inService.runDate)),
  }
}

export function mapServiceDetailed(inService: RTTServiceDetailed): ServiceDetailed {
  return {
    ...inService,
    ...originDestinationTimingDetailed(inService.runDate, inService.origin, inService.destination),
    runDate: getRunDate(inService.runDate),
    locations: inService.locations.map((v) => mapLocationDetailed(v, inService.runDate)),
  }
}

function originDestinationTiming(
  runDate: string,
  origin_?: RTTPair[],
  destination_?: RTTPair[]
): { origin: Pair[]; destination: Pair[] } {
  if (!origin_ || !destination_) {
    return { origin: [], destination: [] }
  }

  const origin = origin_.map((v) => mapPair(v, runDate))
  const destination = destination_.map((v) => mapPair(v, runDate))
  const lastOrigin = origin.reduce((prev, curr) =>
    prev.publicTime && curr.publicTime && prev.publicTime < curr.publicTime ? prev : curr
  )

  return {
    origin,
    destination: destination.map((v) =>
      v.publicTime && lastOrigin?.publicTime && v.publicTime < lastOrigin?.publicTime
        ? {
            ...v,
            publicTime: new Date(v.publicTime.getTime() + 24 * 60 * 60 * 1000),
          }
        : v
    ),
  }
}

function originDestinationTimingDetailed(
  runDate: string,
  origin_?: RTTPairDetailed[],
  destination_?: RTTPairDetailed[]
): { origin: PairDetailed[]; destination: PairDetailed[] } {
  if (!origin_ || !destination_) {
    return { origin: [], destination: [] }
  }

  const origin = origin_.map((v) => mapPairDetailed(v, runDate))
  let destination = destination_.map((v) => mapPairDetailed(v, runDate))
  const lastOrigin = origin.reduce((prev, curr) =>
    prev.publicTime && curr.publicTime && prev.publicTime < curr.publicTime ? prev : curr
  )

  destination = destination.map((v) =>
    v.publicTime && lastOrigin?.publicTime && v.publicTime < lastOrigin?.publicTime
      ? {
          ...v,
          publicTime: new Date(v.publicTime.getTime() + 24 * 60 * 60 * 1000),
          workingTime: v.workingTime
            ? new Date(v.workingTime.getTime() + 24 * 60 * 60 * 1000)
            : undefined,
        }
      : v
  )

  return { origin, destination }
}
