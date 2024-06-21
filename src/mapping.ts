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

export function handleError(data: any) {
  if (data.error) throw new Error(data.error)
  return data
}

export function mapContainer(inContainer: RTTContainer): Container {
  return {
    location: mapLocationDetail(inContainer.location),
    filter: mapLocationFilter(inContainer.filter),
    services: inContainer.services?.map(mapLocationContainer) ?? [],
  }
}

export function mapContainerDetailed(inContainer: RTTContainerDetailed): ContainerDetailed {
  return {
    location: mapLocationDetail(inContainer.location),
    filter: mapLocationFilter(inContainer.filter),
    services: inContainer.services?.map(mapLocationContainerDetailed) ?? [],
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
    origin: inLocationContainer.origin?.map((v) => mapPair(v, inLocationContainer.runDate, false)),
    destination: inLocationContainer.destination?.map((v) =>
      mapPair(
        v,
        inLocationContainer.runDate,
        inLocationContainer.locationDetail.gbttBookedArrivalNextDay
      )
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
    origin: inLocationContainer.origin?.map((v) =>
      mapPairDetailed(v, inLocationContainer.runDate, false)
    ),
    destination: inLocationContainer.destination?.map((v) =>
      mapPairDetailed(
        v,
        inLocationContainer.runDate,
        inLocationContainer.locationDetail.gbttBookedArrivalNextDay
      )
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
    origin: inLocation.origin?.map((v) => mapPair(v, runDate, false)),
    destination: inLocation.destination?.map((v) =>
      mapPair(v, runDate, inLocation.gbttBookedDepartureNextDay)
    ),
    tiploc: mapTiploc(inLocation.tiploc),
    gbttBookedArrival: getServiceTime(
      runDate,
      inLocation.gbttBookedArrival,
      inLocation.gbttBookedArrivalNextDay
    ),
    gbttBookedDeparture: getServiceTime(
      runDate,
      inLocation.gbttBookedDeparture,
      inLocation.gbttBookedArrivalNextDay
    ),
    realtimeArrival: getServiceTime(
      runDate,
      inLocation.realtimeArrival,
      inLocation.realtimeArrivalNextDay
    ),
    realtimeDeparture: getServiceTime(
      runDate,
      inLocation.realtimeDeparture,
      inLocation.realtimeDepartureNextDay
    ),
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
      inLocation.gbttBookedArrivalNextDay
    ),
    gbttBookedDeparture: getServiceTime(
      runDate,
      inLocation.gbttBookedDeparture,
      inLocation.gbttBookedDepartureNextDay
    ),
    origin: inLocation.origin?.map((v) => mapPairDetailed(v, runDate, false)),
    destination: inLocation.destination?.map((v) =>
      mapPairDetailed(v, runDate, inLocation.gbttBookedDepartureNextDay)
    ),
    realtimeArrival: getServiceTime(
      runDate,
      inLocation.realtimeArrival,
      inLocation.realtimeArrivalNextDay
    ),
    realtimeDeparture: getServiceTime(
      runDate,
      inLocation.realtimeDeparture,
      inLocation.realtimeDepartureNextDay
    ),
    wttBookedArrival: getServiceTime(
      runDate,
      inLocation.wttBookedArrival,
      inLocation.wttBookedArrivalNextDay
    ),
    wttBookedDeparture: getServiceTime(
      runDate,
      inLocation.wttBookedDeparture,
      inLocation.wttBookedDepartureNextDay
    ),
    wttBookedPass: getServiceTime(
      runDate,
      inLocation.wttBookedPass,
      inLocation.wttBookedPassNextDay
    ),
    realtimePass: getServiceTime(runDate, inLocation.realtimePass, inLocation.realtimePassNextDay),
  }
}

function mapPair(inPair: RTTPair, runDate: string, nextDay: boolean | undefined): Pair {
  return {
    ...inPair,
    publicTime: getServiceTime(runDate, inPair.publicTime, nextDay),
  }
}

function mapPairDetailed(
  inPair: RTTPairDetailed,
  runDate: string,
  nextDay: boolean | undefined
): PairDetailed {
  return {
    ...inPair,
    publicTime: getServiceTime(runDate, inPair.publicTime, nextDay),
    workingTime: getServiceTime(runDate, inPair.workingTime, nextDay),
    tiploc: mapTiploc(inPair.tiploc),
  }
}

export function mapService(inService: RTTService): Service {
  return {
    ...inService,
    origin: inService.origin.map((v) => mapPair(v, inService.runDate, false)),
    destination: inService.destination.map((v) =>
      mapPair(
        v,
        inService.runDate,
        inService.locations[inService.locations.length - 1].gbttBookedArrivalNextDay
      )
    ),
    runDate: getRunDate(inService.runDate),
    locations: inService.locations.map((v) => mapLocation(v, inService.runDate)),
  }
}

export function mapServiceDetailed(inService: RTTServiceDetailed): ServiceDetailed {
  return {
    ...inService,
    origin: inService.origin.map((v) => mapPairDetailed(v, inService.runDate, false)),
    destination: inService.destination.map((v) =>
      mapPairDetailed(
        v,
        inService.runDate,
        inService.locations[inService.locations.length - 1].gbttBookedArrivalNextDay
      )
    ),
    runDate: getRunDate(inService.runDate),
    locations: inService.locations.map((v) => mapLocationDetailed(v, inService.runDate)),
  }
}
