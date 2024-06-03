export type Location = {
  name: string
  crs: string
  tiploc: string[]
  country: string
  system: string
}

export type LocationContainer = {
  locationDetail: LocationDetail
  serviceUid: string
  runDate: Date
  trainIdentity: string
  runningIdentity: string
  atocCode: string
  atocName: string
  serviceType: string
  isPassenger: boolean
  plannedCancel: boolean
  origin: Pair[]
  destination: Pair[]
  countdownMinutes: number
}

export type Pair = {
  tiploc: string[]
  description: string
  workingTime: Date
  publicTime: Date
}

export type LocationDetail = {
  realtimeActivated: boolean
  tiploc: string[]
  crs: string
  description: string
  wttBookedArrival: Date
  wttBookedDeparture: Date
  wttBookedPass: Date
  gbttBookedArrival: Date
  gbttBookedDeparture: Date
  origin: Pair[]
  destination: Pair[]
  isCall: boolean
  isCallPublic: boolean
  realtimeArrival: Date
  realtimeArrivalActual: boolean
  realtimeArrivalNoReport: boolean
  realtimeWttArrivalLateness: number
  realtimeGbttArrivalLateness: number
  realtimeDeparture: Date
  realtimeDepartureActual: boolean
  realtimeDepartureNoReport: boolean
  realtimeWttDepartureLateness: number
  realtimeGbttDepartureLateness: number
  realtimePass: Date
  realtimePassActual: boolean
  realtimePassNoReport: boolean
  realtimeWttPassLateness: number
  platform: string
  platformConfirmed: boolean
  platformChanged: boolean
  line: string
  lineConfirmed: boolean
  path: string
  pathConfirmed: boolean
  cancelReasonCode: string
  cancelReasonShortText: string
  cancelReasonLongText: string
  displayAs:
    | "CALL"
    | "PASS"
    | "ORIGIN"
    | "DESTINATION"
    | "STARTS"
    | "TERMINATES"
    | "CANCELLED_CALL"
    | "CANCELLED_PASS"
  serviceLocation: "APPR_STAT" | "APPR_PLAT" | "AT_PLAT" | "DEP_PREP" | "DEP_READY"
}

export type LocationFilter = {
  origin?: Location
  destination?: Location
}

export type Container = {
  location: Location
  filter?: LocationFilter
  services: LocationContainer[]
}

export type Service = {
  serviceUid: string
  runDate: Date
  serviceType: "bus" | "ship" | "train"
  isPassenger: boolean
  trainIdentity: string
  powerType: string
  trainClass: string
  sleeper: string
  atocCode: string
  atocName: string
  performanceMonitored: boolean
  origin: Pair[]
  destination: Pair[]
  locations: LocationDetail[]
  realtimeActivated: boolean
  runningIdentity: string
}
