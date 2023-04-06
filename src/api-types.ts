/**
 * Information about a station as shown after a /search
 */
export type RTTLocation = {
  /**
   * The name of the station
   */
  name: string
  /**
   * Computer Reservation System (CRS) code for a location
   */
  crs: string
  /**
   * Timing Point Location (TIPLOC) code for a location
   */
  tiploc: string
  /**
   * Two letter country abbreviation for a station
   */
  country: string
  /**
   * Rail network on which the station lies
   */
  system: string
}

/**
 * Information about when and where a service stops, as returned after a /search
 */
export type RTTLocationStop = {
  /**
   * Timing Point Location (TIPLOC) code for a location
   */
  tiploc: string
  /**
   * The name of the station
   */
  description: string
  /**
   * Internal time at which the service will call here, in format HHmmss
   */
  workingTime: string
  /**
   * Publically displayed time at which the service will call here, in format HHmm
   */
  publicTime: string
}

/**
 * Detailed information about a service at a given location
 */
export type RTTLocationDetail = {
  /**
   * Whether the service's pass times will be recorded in real time
   */
  realtimeActivated: boolean
  /**
   * Timing Point Location (TIPLOC) code for a location
   */
  tiploc: string
  /**
   * Computer Reservation System (CRS) code for a location
   */
  crs: string
  /**
   * The name of the station
   */
  description: string
  /**
   * [DETAILED MODE ONLY] Arrival time booked on the Working Timetable in format HHmm
   */
  wttBookedArrival?: string
  /**
   * [DETAILED MODE ONLY] Departure time booked on the Working Timetable in format HHmm
   */
  wttBookedDeparture?: string
  /**
   * Pass time booked on the Working Timetable in format HHmm
   */
  wttBookedPass?: string
  /**
   * Arrival time according to the Great British Timetable in format HHmm
   */
  gbttBookedArrival: string
  /**
   * Departure time according to the Great British Timetable in format HHmm
   */
  gbttBookedDeparture: string
  /**
   * The station(s) from which this service originates
   */
  origin: RTTLocationStop[]
  /**
   * The station(s) to which this service terminates
   */
  destination: RTTLocationStop[]
  /**
   * Whether this service will pass through this location. When the API is in simple mode, this will always be true
   */
  isCall: boolean
  /**
   * Contains the same value and information as {@link isCall}
   */
  isPublicCall: boolean
  /**
   * Time at which the service actually arrived (or is predicted to arrive) at this station, in format HHmm
   */
  realtimeArrival: string
  /**
   * Whether the time stated in {@link realtimeArrival} is the actual arrival time or an expected arrival time
   */
  realtimeArrivalActual: boolean
  /**
   * If this is true, the train stopped at this station but no report was received from the train AND a report was received at a following station
   */
  realtimeArrivalNoReport?: boolean
  /**
   * [DETAILED MODE ONLY] The number of minutes late the train was when it arrived at this station, according to the Working Timetable
   */
  realtimeWttArrivalLateness?: number
  /**
   * The number of minutes late the train was when it arrived at this station, according to the Great British Timetable
   */
  realtimeGbttArrivalLateness?: number
  /**
   * Time at which the service actually departed (or is predicted to depart) from this station, in format HHmm
   */
  realtimeDeparture: string
  /**
   * Whether the time stated in {@link realtimeDeparture} is the actual departure time or an expected departure time
   */
  realtimeDepartureActual: boolean
  /**
   * If this is true, the train departed from this station but no report was received from the train AND a report was received at a following station
   */
  realtimeDepartureNoReport?: boolean
  /**
   * [DETAILED MODE ONLY] The number of minutes late the train was when it departed from this station, according to the Working Timetable
   */
  realtimeWttDepartureLateness?: number
  /**
   * [DETAILED MODE ONLY] The number of minutes late the train was when it departed from this station, according to the Great British Timetable
   */
  realtimeGbttDepartureLateness?: number
  /**
   * [DETAILED MODE ONLY] Time at which the service passed (or is predicted to pass) through this station, in format HHmm
   */
  realtimePass?: string
  /**
   * [DETAILED MODE ONLY] Whether the time stated in {@link realtimePass} is the actual pass time or an expected pass time
   */
  realtimePassActual?: boolean
  /**
   * [DETAILED MODE ONLY] If this is true, the train passed through this station but no report was received from the train AND a report was received at a following station
   */
  realtimePassNoReport?: boolean
  /**
   * The type of pass
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
}

/**
 * Information about a service returned when doing a location based search
 */
export type RTTService = {
  locationDetail: RTTLocationDetail
  /**
   * Service identifier for the service. Identifiers are not unique. The only unique identifier for a service is the combination of {@link serviceUid} and {@link runDate}. Follows regex pattern `[A-Z][0-9]{5}`
   */
  serviceUid: string
  /**
   * Date on which the service is running, in format YYYYMMdd
   */
  runDate: string
  /**
   * The train identity that is service was planned to run on.
   */
  trainIdentity: string
  /**
   * Same as {@link trainIdentity}
   */
  runningIdentity: string
  /**
   * Two letter code used by the Association of Train Operating Companies (ATOC) to identify the train operator
   */
  atocCode: string
  /**
   * The name of the train operator
   */
  atocName: string
  /**
   * The type of service
   */
  serviceType: "bus" | "ship" | "train"
  /**
   * Whether this service is designated for passenger usage
   */
  isPassenger: boolean
}

/**
 * Object returned after a location search
 */
export type RTTLocationSearch = {
  location: RTTLocation
  /**
   * All services matching the search criteria
   */
  services?: RTTService[]
}

export type RTTLocationFull = {
  /**
   * Whether the service's pass times will be recorded in real time
   */
  realtimeActivated: boolean
  /**
   * Timing Point Location (TIPLOC) code for a location
   */
  tiploc: string
  /**
   * Computer Reservation System (CRS) code for a location
   */
  crs: string
  /**
   * The station(s) to which this service terminates
   */
  description: string
  /**
   * [DETAILED MODE ONLY] Arrival time booked on the Working Timetable in format HHmm
   */
  wttBookedArrival?: string
  /**
   * [DETAILED MODE ONLY] Departure time booked on the Working Timetable in format HHmm
   */
  wttBookedDeparture?: string
  /**
   * Pass time booked on the Working Timetable in format HHmm
   */
  wttBookedPass?: string
  /**
   * Arrival time according to the Great British Timetable in format HHmm
   */
  gbttBookedArrival?: string
  /**
   * Whether the arrival takes place the day after the service's run date
   */
  gbttBookedArrivalNextDay?: boolean
  /**
   * Departure time according to the Great British Timetable in format HHmm
   */
  gbttBookedDeparture?: string
  /**
   * Whether the departure takes place the day after the service's run date
   */
  gbttBookedDepartureNextDay?: boolean
  /**
   * The station(s) from which this service originates
   */
  origin: RTTLocationStop[]
  /**
   * The station(s) to which this service terminates
   */
  destination: RTTLocationStop[]
  /**
   * Whether this service will pass through this location. When the API is in simple mode, this will always be true
   */
  isCall: boolean
  /**
   * Contains the same value and information as {@link isCall}
   */
  isPublicCall: boolean
  /**
   * Time at which the service actually arrived (or is predicted to arrive) at this station, in format HHmm
   */
  realtimeArrival?: string
  /**
   * Whether the arrival takes place the day after the service's run date
   */
  realtimeArrivalNextDay?: boolean
  /**
   * Whether the time stated in {@link realtimeArrival} is the actual arrival time or an expected arrival time
   */
  realtimeArrivalActual?: boolean
  /**
   * If this is true, the train arrived at this station but no report was received from the train AND a report was received at a following station
   */
  realtimeArrivalNoReport?: boolean
  /**
   * [DETAILED MODE ONLY] The number of minutes late the train was when it arrived at this station, according to the Working Timetable
   */
  realtimeWttArrivalLateness?: number
  /**
   * The number of minutes late the train was when it arrived at this station, according to the Great British Timetable
   */
  realtimeGbttArrivalLateness?: number
  /**
   * Time at which the service actually departed (or is predicted to depart) from this station, in format HHmm
   */
  realtimeDeparture?: string
  /**
   * Whether the departure takes place the day after the service's run date
   */
  realtimeDepartureNextDay?: boolean
  /**
   * Whether the time stated in {@link realtimeDeparture} is the actual departure time or an expected departure time
   */
  realtimeDepartureActual?: boolean
  /**
   * If this is true, the train departed from this station but no report was received from the train AND a report was received at a following station
   */
  realtimeDepartureNoReport?: boolean
  /**
   * [DETAILED MODE ONLY] The number of minutes late the train was when it departed from this station, according to the Working Timetable
   */
  realtimeWttDepartureLateness?: number
  /**
   * [DETAILED MODE ONLY] The number of minutes late the train was when it departed from this station, according to the Great British Timetable
   */
  realtimeGbttDepartureLateness?: number
  /**
   * [DETAILED MODE ONLY] Time at which the service passed (or is predicted to pass) through this station, in format HHmm
   */
  realtimePass?: string
  /**
   * [DETAILED MODE ONLY] Whether the time stated in {@link realtimePass} is the actual pass time or an expected pass time
   */
  realtimePassActual?: boolean
  /**
   * [DETAILED MODE ONLY] If this is true, the train passed through this station but no report was received from the train AND a report was received at a following station
   */
  realtimePassNoReport?: boolean
  /**
   * The platform the service is expected to pass through
   */
  platform?: string
  /**
   * Wheter the platform stated in {@link platform} is the platform the service will actually pass through
   */
  platformConfirmed?: boolean
  /**
   * Whether the platform the service will pass through has changed from the planned platform
   */
  platformChanged?: boolean
  /**
   * [DETAILED MODE ONLY] The line this service is expected to use
   */
  line?: string
  /**
   * [DETAILED MODE ONLY] Whether the line stated in {@link line} is the line the service will actually use (or has used)
   */
  lineConfirmed?: boolean
  /**
   * [DETAILED MODE ONLY] The expected path the service will take at this location
   */
  path?: string
  /**
   * [DETAILED MODE ONLY] Whether the path stated in {@link path} is the path the service will actually take (or has taken)
   */
  pathConfirmed?: boolean
  /**
   * If the service is cancelled at this location, a two character code will be shown that can be cross-referenced with the Delay Atribution Guide
   */
  cancelReasonCode?: string
  /**
   * Short text reason for cancellation
   */
  cancelReasonShortText?: string
  /**
   * Long text reason for cancellation
   */
  cancelReasonLongText?: string
  /**
   * The type of pass
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
   * Details about the service relative to this location
   */
  serviceLocation?: "APPR_STAT" | "APPR_PLAT" | "AT_PLAT" | "DEP_PREP" | "DEP_READY"
}

export type RTTServiceFull = {
  /**
   * Service identifier for the service. Identifiers are not unique. The only unique identifier for a service is the combination of {@link serviceUid} and {@link runDate}. Follows regex pattern `[A-Z][0-9]{5}`
   */
  serviceUid: string
  /**
   * Date on which the service is running, in format YYYYMMdd
   */
  runDate: string
  /**
   * The type of service
   */
  serviceType: "bus" | "ship" | "train"
  /**
   * Whether this service is designated for passenger usage
   */
  isPassenger: boolean
  /**
   * The train identity that is service was planned to run on.
   */
  trainIdentity: string
  /**
   * Power type used by this service as described in the Network Rail CIF documentation
   */
  powerType: string
  /**
   * Train class used by this service as described in the Network Rail CIF documentation
   */
  trainClass: string
  /**
   * The type of sleeper this service converys as described in the Network Rail CIF documentation
   */
  sleeper?: string
  /**
   * Two letter code used by the Association of Train Operating Companies (ATOC) to identify the train operator
   */
  atocCode: string
  /**
   * The name of the train operator
   */
  atocName: string
  /**
   * Whether this service is subject to Public Performance Measurement (PPM) monitoring
   */
  performanceMonitored: boolean
  /**
   * The station(s) from which this service originates
   */
  origin: RTTLocationStop[]
  /**
   * The station(s) to which this service terminates
   */
  destination: RTTLocationStop[]
  /**
   * The stations this service calls at
   */
  locations: RTTLocationFull[]
  /**
   * Whether the service's pass times will be recorded in real time
   */
  realtimeActivated: boolean
  /**
   * The train identity that is service was planned to run on.
   */
  runningIdentity: string
}
