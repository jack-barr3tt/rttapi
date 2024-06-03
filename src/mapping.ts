import {
  RTTContainer,
  RTTLocation,
  RTTLocationContainer,
  RTTLocationDetail,
  RTTLocationFilter,
  RTTPair,
  RTTService,
} from "./api-types"
import { getRunDate, getServiceTime } from "./helpers"
import {
  Container,
  Location,
  LocationContainer,
  LocationDetail,
  LocationFilter,
  Pair,
  Service,
} from "./types"

export function mapContainer(inContainer: RTTContainer): Container {
  return {
    location: mapLocationDetail(inContainer.location),
    filter: mapLocationFilter(inContainer.filter),
    services: inContainer.services.map(mapLocationContainer),
  }
}

export function mapTiploc(inTiploc: string[] | string): string[] {
  return Array.isArray(inTiploc) ? inTiploc : [inTiploc]
}

export function mapLocationDetail(inLocationDetail: RTTLocationDetail): Location {
  return {
    ...inLocationDetail,
    tiploc: mapTiploc(inLocationDetail.tiploc),
  }
}

export function mapLocationFilter(
  inLocationFilter: RTTLocationFilter | undefined
): LocationFilter | undefined {
  return {
    origin: inLocationFilter?.origin ? mapLocationDetail(inLocationFilter.origin) : undefined,
    destination: inLocationFilter?.destination
      ? mapLocationDetail(inLocationFilter.destination)
      : undefined,
  }
}

export function mapLocationContainer(inLocationContainer: RTTLocationContainer): LocationContainer {
  return {
    ...inLocationContainer,
    locationDetail: mapLocation(inLocationContainer.locationDetail, inLocationContainer.runDate),
    runDate: getRunDate(inLocationContainer.runDate),
    origin: inLocationContainer.origin.map((v) => mapPair(v, inLocationContainer.runDate)),
    destination: inLocationContainer.destination.map((v) =>
      mapPair(v, inLocationContainer.runDate)
    ),
  }
}

export function mapLocation(inLocation: RTTLocation, runDate: string): LocationDetail {
  return {
    ...inLocation,
    tiploc: mapTiploc(inLocation.tiploc),
    wttBookedArrival: getServiceTime(runDate, inLocation.wttBookedArrival)!,
    wttBookedDeparture: getServiceTime(runDate, inLocation.wttBookedDeparture)!,
    wttBookedPass: getServiceTime(runDate, inLocation.wttBookedPass)!,
    gbttBookedArrival: getServiceTime(runDate, inLocation.gbttBookedArrival)!,
    gbttBookedDeparture: getServiceTime(runDate, inLocation.gbttBookedDeparture)!,
    origin: inLocation.origin.map((v) => mapPair(v, runDate)),
    destination: inLocation.destination.map((v) => mapPair(v, runDate)),
    realtimeArrival: getServiceTime(runDate, inLocation.realtimeArrival)!,
    realtimeDeparture: getServiceTime(runDate, inLocation.realtimeDeparture)!,
    realtimePass: getServiceTime(runDate, inLocation.realtimePass)!,
  }
}

export function mapPair(inPair: RTTPair, runDate: string): Pair {
  return {
    ...inPair,
    tiploc: mapTiploc(inPair.tiploc),
    workingTime: getServiceTime(runDate, inPair.workingTime)!,
    publicTime: getServiceTime(runDate, inPair.publicTime)!,
  }
}

export function mapService(inService: RTTService): Service {
  return {
    ...inService,
    runDate: getRunDate(inService.runDate),
    origin: inService.origin.map((v) => mapPair(v, inService.runDate)),
    destination: inService.destination.map((v) => mapPair(v, inService.runDate)),
    locations: inService.locations.map((v) => mapLocation(v, inService.runDate)),
  }
}
