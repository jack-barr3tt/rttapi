export type RTTLocationDetail = {
  name: string
  crs: string
  tiploc: string[] | string
  country: string
  system: string
}

export type RTTLocationContainer = {
  locationDetail: RTTLocation
  serviceUid: string
  runDate: string
  trainIdentity: string
  runningIdentity: string
  atocCode: string
  atocName: string
  serviceType: string
  isPassenger: boolean
  plannedCancel: boolean
  origin: RTTPair[]
  destination: RTTPair[]
  countdownMinutes: number
}

export type RTTPair = {
  tiploc: string[] | string
  description: string
  workingTime: string
  publicTime: string
}

export type RTTLocation = {
  realtimeActivated: boolean
  tiploc: string[] | string
  crs: string
  description: string
  wttBookedArrival: string
  wttBookedDeparture: string
  wttBookedPass: string
  gbttBookedArrival: string
  gbttBookedDeparture: string
  origin: RTTPair[]
  destination: RTTPair[]
  isCall: boolean
  isCallPublic: boolean
  realtimeArrival: string
  realtimeArrivalActual: boolean
  realtimeArrivalNoReport: boolean
  realtimeWttArrivalLateness: number
  realtimeGbttArrivalLateness: number
  realtimeDeparture: string
  realtimeDepartureActual: boolean
  realtimeDepartureNoReport: boolean
  realtimeWttDepartureLateness: number
  realtimeGbttDepartureLateness: number
  realtimePass: string
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

export type RTTLocationFilter = {
  origin?: RTTLocationDetail
  destination?: RTTLocationDetail
}

export type RTTContainer = {
  location: RTTLocationDetail
  filter?: RTTLocationFilter
  services: RTTLocationContainer[]
}

export type RTTService = {
  serviceUid: string
  runDate: string
  serviceType: "bus" | "ship" | "train"
  isPassenger: boolean
  trainIdentity: string
  powerType: string
  trainClass: string
  sleeper: string
  atocCode: string
  atocName: string
  performanceMonitored: boolean
  origin: RTTPair[]
  destination: RTTPair[]
  locations: RTTLocation[]
  realtimeActivated: boolean
  runningIdentity: string
}
