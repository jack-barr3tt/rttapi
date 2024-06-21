/*
Type documentation for the raw responses from the Realtime Trains API
Most documentation here is sourced from the following pages:
 - https://www.realtimetrains.co.uk/about/developer/pull/docs/locationlist/
 - https://www.realtimetrains.co.uk/about/developer/pull/docs/serviceinfo/
The only modifications made is adding in JSDoc links to make navigating the types easier and updating wordings to account for different types for Simple and Detailed mode
*/

export type RTTLocationDetail = {
  /**
   * Text name of the relevant location, example: London Waterloo
   */
  name: string
  /**
   * CRS code for the location, example: WAT
   */
  crs: string
  /**
   * TIPLOC code for the location, example: WATRLMN
   */
  tiploc: string | string[]
  /**
   * Two letter country code for the location, example: GB
   */
  country: string
  /**
   * The system that this location is part of, example: NR
   */
  system: string
}

type RTTLocationContainerBase = {
  /**
   * Contains the service identifier for this service, paired with the run date this will always be a unique identifier. Service UIDs use the following regex pattern [A-Z][0-9]{5}.
   */
  serviceUid: string
  /**
   * Contains the running date of this service, based on its departure time from the first origin. In format YYYY-MM-DD.
   */
  runDate: string
  /**
   * Identifies the current running identity of the service.
   */
  runningIdentity: string
  /**
   * The two character identifier, as used by ATOC, to identify the service operator, example: SW
   */
  atocCode: string
  /**
   * Service operator, example: South West Trains
   */
  atocName: string
  /**
   * Contains the type of service this is, bus, ship or train.
   */
  serviceType: "bus" | "ship" | "train"
  /**
   * Determining whether the service is a passenger service or not
   */
  isPassenger: boolean
  /**
   * boolean output determining whether this service was a planned cancellation. A planned cancellation is one not advertised, at all, for operation on that day and a service with this should be disregarded - it is the equivalent of the STP indicator 'C'.
   */
  plannedCancel: boolean
  /**
   * Number of minutes until expected departures, currently present only on 'high frequency' metro services - operated by London Overground and Merseyrail.
   */
  countdownMinutes: number
}

export type RTTLocationContainer = RTTLocationContainerBase & {
  /**
   * Contains the {@link RTTLocation} object containing details about the location itself, details below.
   */
  locationDetail: RTTLocation
  /**
   * Array of {@link RTTPair} objects forming the overall origins of the service. Only appears if the service has experienced an en-route cancellation.
   */
  origin?: RTTPair[]
  /**
   * Array of {@link RTTPair} objects forming the overall destinations of the service, detailed further down. Only appears if the service has experienced an en-route cancellation.
   */
  destination?: RTTPair[]
}

export type RTTLocationContainerDetailed = RTTLocationContainerBase & {
  /**
   * 	Contains the {@link RTTLocationDetailed} object containing details about the location itself, details below.
   */
  locationDetail: RTTLocationDetailed
  /**
   * The train identity that this service was planned to run to. FOC operated services will always show as FRGT.
   */
  trainIdentity: string
  /**
   * Array of {@link RTTPairDetailed} objects forming the overall origins of the service. Only appears if the service has experienced an en-route cancellation.
   */
  origin?: RTTPairDetailed[]
  /**
   * Array of {@link RTTPairDetailed} objects forming the overall destinations of the service, detailed further down. Only appears if the service has experienced an en-route cancellation.
   */
  destination?: RTTPairDetailed[]
}

export type RTTPair = {
  /**
   * Text name of the relevant location, example: London Waterloo
   */
  description: string
  /**
   * Relevant advertised public time time for this location for the activity that this pair is performing. If it is in the context of an origin, it will be a departure time - for a destination it will be an arrival time. In format HHmm, example: 1503.
   */
  publicTime: string
}

export type RTTPairDetailed = RTTPair & {
  /**
   * TIPLOC of the relevant location, example: WATRLMN
   */
  tiploc: string | string[]
  /**
   * Relevant working time for this location for the activity that this pair is performing. If it is in the context of an origin, it will be a departure time - for a destination it will be an arrival time. In format HHmmss, example: 150330.
   */
  workingTime: string
}

type RTTLocationBase = {
  /**
   * Details whether this service has been activated for realtime information
   */
  realtimeActivated: boolean
  /**
   * TIPLOC code for the location, example: WATRLMN
   */
  tiploc: string | string[]
  /**
   * CRS code for the location, example: WAT
   */
  crs?: string
  /**
   * Text name of the relevant location, example: London Waterloo
   */
  description: string
  /**
   * Public Timetable arrival time of the service at this location, in format HHmm
   */
  gbttBookedArrival?: string
  /**
   * Public Timetable arrival time is on the next day
   */
  gbttBookedArrivalNextDay?: boolean
  /**
   * Public Timetable departure time of the service at this location, in format HHmm
   */
  gbttBookedDeparture?: string
  /**
   * Public Timetable departure time is on the next day
   */
  gbttBookedDepartureNextDay?: boolean
  /**
   * boolean output as to whether this service makes a public call at this location. This is set as true even if the service ends up non-stopping this station for whatever reason.
   */
  isCallPublic: boolean
  /**
   * Expected or actual arrival time of this service, in format HHmm
   */
  realtimeArrival?: string
  /**
   * Always appears if realtimeArrival is also present. Boolean output stating whether this is an actual or expected time. If true, actual - if false, expected.
   */
  realtimeArrivalActual: boolean
  /**
   * Whether the arrival time is on the next day
   */
  realtimeArrivalNextDay?: boolean
  /**
   * If set as true, this means that the train has already arrived at this station but no report was received, and a later one has been
   */
  realtimeArrivalNoReport: boolean
  /**
   * If the service has an actual time, a lateness in minutes will be provided based from the public timetable time. Positive values mean the service was late, negative values mean the service was early.
   */
  realtimeGbttArrivalLateness: number
  /**
   * Expected or actual departure time of this service, in format HHmm
   */
  realtimeDeparture?: string
  /**
   * Always appears if realtimeDeparture is also present. Boolean output stating whether this is an actual or expected time. If true, actual - if false, expected.
   */
  realtimeDepartureActual: boolean
  /**
   * Whether the departure time is on the next day
   */
  realtimeDepartureNextDay?: boolean
  /**
   * If set as true, this means that the train has already departed this station but no report was received, and a later one has been
   */
  realtimeDepartureNoReport: boolean
  /**
   * If the service has an actual time, a lateness in minutes will be provided based from the public timetable time. Positive values mean the service was late, negative values mean the service was early.
   */
  realtimeGbttDepartureLateness: number
  /**
   * The expected platform that this service will use at this location
   */
  platform: string
  /**
   * If this is set to true, then the service has used/will use the platform stated
   */
  platformConfirmed: boolean
  /**
   * If this is set to true, then the service has changed from the planned platform
   */
  platformChanged: boolean
  /**
   * If this service is cancelled at this location, this will be populated with a two character cancellation code which can be cross-referenced with the Delay Attribution Guide.
   */
  cancelReasonCode?: string
  /**
   * Short text reason detailing the reason for the cancellation
   */
  cancelReasonShortText?: string
  /**
   * Long text reason detailing the reason for the cancellation
   */
  cancelReasonLongText?: string
  /**
   * ORIGIN and DESTINATION represent the original origin & destination of a service. If STARTS or TERMINATES appear, then this means a service has started short or terminated en-route - the original origin/destination will show CANCELLED_CALL.
   */
  displayAs:
    | "CALL"
    | "PASS"
    | "ORIGIN"
    | "DESTINATION"
    | "STARTS"
    | "TERMINATES"
    | "CANCELLED_CALL"
    | "CANCELLED_PASS"
  /**
   * Values that can appear in this field are APPR_STAT (Approaching Station), APPR_PLAT (Arriving), AT_PLAT (At Platform, as referenced in platform), DEP_PREP (Preparing to depart) and DEP_READY (Ready to depart).
   */
  serviceLocation?: "APPR_STAT" | "APPR_PLAT" | "AT_PLAT" | "DEP_PREP" | "DEP_READY"
}

export type RTTLocation = RTTLocationBase & {
  /**
   * Array of {@link RTTPair} objects forming the origin of the service as at this location
   */
  origin: RTTPair[]
  /**
   * Array of {@link RTTPair} objects forming the destination of the service as at this location
   */
  destination: RTTPair[]
  /**
   * Whether this service makes a public call at this location. This is set as true even if the service ends up non-stopping this station for whatever reason.
   */
  isCallPublic: boolean
}

export type RTTLocationDetailed = RTTLocationBase & {
  /**
   * Array of {@link RTTPairDetailed} objects forming the origin of the service as at this location
   */
  origin: RTTPairDetailed[]
  /**
   * Array of {@link RTTPairDetailed} objects forming the destination of the service as at this location
   */
  destination: RTTPairDetailed[]
  /**
   * Working Timetable arrival time of the service at this location, in format HHmmss
   */
  wttBookedArrival?: string
  /**
   * Working Timetable arrival time is on the next day
   */
  wttBookedArrivalNextDay?: boolean
  /**
   * Working Timetable departure time of the service at this location, in format HHmmss
   */
  wttBookedDeparture?: string
  /**
   * Working Timetable departure time is on the next day
   */
  wttBookedDepartureNextDay?: boolean
  /**
   * Working Timetable passing time of the service at this location, in format HHmmss
   */
  wttBookedPass?: string
  /**
   * Working Timetable passing time is on the next day
   */
  wttBookedPassNextDay?: boolean
  /**
   * Whether this service calls at this location. This is set as true even if the service ends up non-stopping this station for whatever reason.
   */
  isCall: boolean
  /**
   * If the service has an actual time, a lateness in minutes will be provided based from the WTT time. Positive values mean the service was late, negative values mean the service was early.
   */
  realtimeWttDepartureLateness: number
  /**
   * If the service has an actual time, a lateness in minutes will be provided based from the WTT time. Positive values mean the service was late, negative values mean the service was early.
   */
  realtimeWttArrivalLateness: number
  /**
   * Expected or actual passing time of this service, in format HHmm
   */
  realtimePass?: string
  /**
   * Always appears if realtimePass is also present. Boolean output stating whether this is an actual or expected time. If true, actual - if false, expected.
   */
  realtimePassActual: boolean
  /**
   * Whether the passing time is on the next day
   */
  realtimePassNextDay?: boolean
  /**
   * If set as true, this means that the train has already passed this station but no report was received, and a later one has been
   */
  realtimePassNoReport: boolean
  /**
   * If the service has an actual time, a lateness in minutes will be provided based from the WTT time. Positive values mean the service was late, negative values mean the service was early.
   */
  realtimeWttPassLateness: number
  /**
   * The expected line that this service will use at this location
   */
  line: string
  /**
   * If this is set to true, then the service has used/will use the line stated
   */
  lineConfirmed: boolean
  /**
   * The expected path that this service will use at this location
   */
  path: string
  /**
   * If this is set to true, then the service has used/will use the path stated
   */
  pathConfirmed: boolean
}

export type RTTLocationFilter = {
  /**
   * {@link RTTLocationDetail} object detailing the origin location searched for
   */
  origin?: RTTLocationDetail
  /**
   * {@link RTTLocationDetail} object detailing the destination location searched for
   */
  destination?: RTTLocationDetail
}

type RTTContainerBase = {
  /**
   * {@link RTTLocationDetail} object detailing the location searched for
   */
  location: RTTLocationDetail
  /**
   * {@link RTTLocationDetail} objects detailing the location searched for, nested within from & to properties
   */
  filter?: RTTLocationFilter
}

export type RTTContainer = RTTContainerBase & {
  /**
   * Array of {@link RTTLocationContainer} containing the location information and service metadata
   */
  services: RTTLocationContainer[] | null
}

export type RTTContainerDetailed = RTTContainerBase & {
  /**
   * Array of {@link RTTLocationContainerDetailed} containing the location information and service metadata
   */
  services: RTTLocationContainerDetailed[] | null
}

type RTTServiceBase = {
  /**
   * Contains the service identifier for this service, paired with the run date this will always be a unique identifier. Service UIDs use the following regex pattern [A-Z][0-9]{5}.
   */
  serviceUid: string
  /**
   * Contains the running date of this service, based on its departure time from the first origin. In format YYYY-MM-DD.
   */
  runDate: string
  /**
   * Contains the type of service this is, bus, ship or train.
   */
  serviceType: "bus" | "ship" | "train"
  /**
   * boolean output determining whether the service is a passenger service or not
   */
  isPassenger: boolean
  /**
   * The classes that this service conveys. This is as described in the Network Rail CIF documentation. If the field is blank and is a passenger train, the train conveys first and standard class accommodation only.
   */
  trainClass?: string
  /**
   * The types of sleeper that this service conveys. This is as described in the Network Rail CIF documentation.
   */
  sleeper?: string
  /**
   * 	The two character identifier, as used by ATOC, to identify the service operator, example: SW
   */
  atocCode: string
  /**
   * Service operator, example: South West Trains
   */
  atocName: string
  /**
   * boolean output detailing whether the service is subject to PPM (Public Performance Measurement) monitoring.
   */
  performanceMonitored: boolean
  /**
   * Details whether this service has been activated for realtime information
   */
  realtimeActivated: boolean
  /**
   * This field appears if realtimeActivated is set as true. It identifies the current running identity of the service.
   */
  runningIdentity: string
}

export type RTTService = RTTServiceBase & {
  /**
   * Array of {@link RTTPair} objects forming the overall origins of the service.
   */
  origin: RTTPair[]
  /**
   * Array of {@link RTTPair} objects forming the overall destination of the service.
   */
  destination: RTTPair[]
  /**
   * Array of {@link RTTLocation} objects forming the locations that the service calls at
   */
  locations: RTTLocation[]
}

export type RTTServiceDetailed = RTTServiceBase & {
  /**
   * The train identity that this service was planned to run to. FOC operated services will always show as FRGT.
   */
  trainIdentity: string
  /**
   * The power type of the service. This is as described in the Network Rail CIF documentation.
   */
  powerType: string
  /**
   * Array of {@link RTTPairDetailed} objects forming the overall origins of the service.
   */
  origin: RTTPairDetailed[]
  /**
   * Array of {@link RTTPairDetailed} objects forming the overall destination of the service.
   */
  destination: RTTPairDetailed[]
  /**
   * Array of {@link RTTLocationDetailed} objects forming the locations that the service calls at (and passes).
   */
  locations: RTTLocationDetailed[]
}
