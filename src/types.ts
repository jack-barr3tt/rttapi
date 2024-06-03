export type Location = {
  name: string
  crs: string
  tiploc: string[]
  country: string
  system: string
}

type LocationContainerBase = {
  serviceUid: string
  runDate: Date
  runningIdentity: string
  atocCode: string
  atocName: string
  serviceType: string
  isPassenger: boolean
  plannedCancel: boolean
  countdownMinutes: number
}

export type LocationContainer = LocationContainerBase & {
  locationDetail: LocationDetail
  origin?: Pair[]
  destination?: Pair[]
}

export type LocationContainerDetailed = LocationContainerBase & {
  locationDetail: LocationDetailDetailed
  trainIdentity: string
  origin?: PairDetailed[]
  destination?: PairDetailed[]
}

export type Pair = {
  description: string
  publicTime?: Date
}

export type PairDetailed = Pair & {
  tiploc: string[]
  workingTime?: Date
}

type LocationDetailBase = {
  realtimeActivated: boolean
  tiploc: string[]
  crs?: string
  description: string
  gbttBookedArrival?: Date
  gbttBookedDeparture?: Date
  isCallPublic: boolean
  realtimeArrival?: Date
  realtimeArrivalActual: boolean
  realtimeArrivalNoReport: boolean
  realtimeGbttArrivalLateness: number
  realtimeDeparture?: Date
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

export type LocationDetail = LocationDetailBase & {
  origin: Pair[]
  destination: Pair[]
  isCallPublic: boolean
}

export type LocationDetailDetailed = LocationDetailBase & {
  origin: PairDetailed[]
  destination: PairDetailed[]
  wttBookedArrival?: Date
  wttBookedDeparture?: Date
  wttBookedPass?: Date
  isCall: boolean
  realtimeWttDepartureLateness: number
  realtimeWttArrivalLateness: number
  realtimePass?: Date
  realtimePassActual: boolean
  realtimePassNoReport: boolean
  realtimeWttPassLateness: number
  line: string
  lineConfirmed: boolean
  path: string
  pathConfirmed: boolean
}

export type LocationFilter = {
  origin?: Location
  destination?: Location
}

type ContainerBase = {
  location: Location
  filter?: LocationFilter
}

export type Container = ContainerBase & {
  services: LocationContainer[]
}

export type ContainerDetailed = ContainerBase & {
  services: LocationContainerDetailed[]
}

type ServiceBase = {
  serviceUid: string
  runDate: Date
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

export type Service = ServiceBase & {
  origin: Pair[]
  destination: Pair[]
  locations: LocationDetail[]
}

export type ServiceDetailed = ServiceBase & {
  trainIdentity: string
  powerType: string
  origin: PairDetailed[]
  destination: PairDetailed[]
  locations: LocationDetailDetailed[]
}
