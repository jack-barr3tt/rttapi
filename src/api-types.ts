export type RTTLocationDetail = {
  name: string
  crs: string
  tiploc: string | string[]
  country: string
  system: string
}

type RTTLocationContainerBase = {
  serviceUid: string
  runDate: string
  runningIdentity: string
  atocCode: string
  atocName: string
  serviceType: string
  isPassenger: boolean
  plannedCancel: boolean
  countdownMinutes: number
}

export type RTTLocationContainer = RTTLocationContainerBase & {
  locationDetail: RTTLocation
  origin?: RTTPair[]
  destination?: RTTPair[]
}

export type RTTLocationContainerDetailed = RTTLocationContainerBase & {
  locationDetail: RTTLocationDetailed
  trainIdentity: string
  origin?: RTTPairDetailed[]
  destination?: RTTPairDetailed[]
}

export type RTTPair = {
  description: string
  publicTime: string
}

export type RTTPairDetailed = RTTPair & {
  tiploc: string | string[]
  workingTime: string
}

type RTTLocationBase = {
  realtimeActivated: boolean
  tiploc: string | string[]
  crs?: string
  description: string
  gbttBookedArrival?: string
  gbttBookedDeparture?: string
  isCallPublic: boolean
  realtimeArrival?: string
  realtimeArrivalActual: boolean
  realtimeArrivalNoReport: boolean
  realtimeGbttArrivalLateness: number
  realtimeDeparture?: string
  realtimeDepartureActual: boolean
  realtimeDepartureNoReport: boolean
  realtimeGbttDepartureLateness: number
  platform: string
  platformConfirmed: boolean
  platformChanged: boolean
  cancelReasonCode?: string
  cancelReasonShortText?: string
  cancelReasonLongText?: string
  displayAs:
    | "CALL"
    | "PASS"
    | "ORIGIN"
    | "DESTINATION"
    | "STARTS"
    | "TERMINATES"
    | "CANCELLED_CALL"
    | "CANCELLED_PASS"
  serviceLocation?: "APPR_STAT" | "APPR_PLAT" | "AT_PLAT" | "DEP_PREP" | "DEP_READY"
}

export type RTTLocation = RTTLocationBase & {
  origin: RTTPair[]
  destination: RTTPair[]
  isCallPublic: boolean
}

export type RTTLocationDetailed = RTTLocationBase & {
  origin: RTTPairDetailed[]
  destination: RTTPairDetailed[]
  wttBookedArrival?: string
  wttBookedDeparture?: string
  wttBookedPass?: string
  isCall: boolean
  realtimeWttDepartureLateness: number
  realtimeWttArrivalLateness: number
  realtimePass?: string
  realtimePassActual: boolean
  realtimePassNoReport: boolean
  realtimeWttPassLateness: number
  line: string
  lineConfirmed: boolean
  path: string
  pathConfirmed: boolean
}

export type RTTLocationFilter = {
  origin?: RTTLocationDetail
  destination?: RTTLocationDetail
}

type RTTContainerBase = {
  location: RTTLocationDetail
  filter?: RTTLocationFilter
}

export type RTTContainer = RTTContainerBase & {
  services: RTTLocationContainer[]
}

export type RTTContainerDetailed = RTTContainerBase & {
  services: RTTLocationContainerDetailed[]
}

type RTTServiceBase = {
  serviceUid: string
  runDate: string
  serviceType: "bus" | "ship" | "train"
  isPassenger: boolean
  trainClass?: string
  sleeper?: string
  atocCode: string
  atocName: string
  performanceMonitored: boolean
  realtimeActivated: boolean
  runningIdentity: string
}

export type RTTService = RTTServiceBase & {
  origin: RTTPair[]
  destination: RTTPair[]
  locations: RTTLocation[]
}

export type RTTServiceDetailed = RTTServiceBase & {
  trainIdentity: string
  powerType: string
  origin: RTTPairDetailed[]
  destination: RTTPairDetailed[]
  locations: RTTLocationDetailed[]
}
