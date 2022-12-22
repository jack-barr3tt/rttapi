export type RTTLocation = {
	name: string
	crs: string
	tiploc: string
	country: string
	system: string
}

export type RTTLocationStop = {
	tiploc: string
	description: string
	workingTime: string
	publicTime: string
}

export type RTTLocationDetail = {
	realtimeActivated: boolean
	tiploc: string
	crs: string
	description: string
    wttBookedArrival?: string
    wttBookedDeparture?: string
    wttBookedPass?: string
	gbttBookedArrival: string
	gbttBookedDeparture: string
	origin: RTTLocationStop[]
	destination: RTTLocationStop[]
	isCall: boolean
	isPublicCall: boolean
	realtimeArrival: string
	realtimeArrivalActual: boolean
    realtimeArrivalNoReport?: boolean
    realtimeWttArrivalLateness?: number
    realtimeGbttArrivalLateness?: number
	realtimeDeparture: string
	realtimeDepartureActual: boolean
    realtimeDepartureNoReport?: boolean
    realtimeWttDepartureLateness?: number
    realtimeGbttDepartureLateness?: number
    realtimePass?: string
    realtimePassActual?: boolean
    realtimePassNoReport?: boolean
	displayAs: "CALL" | "PASS" | "ORIGIN" | "DESTINATION" | "STARTS" | "TERMINATES" | "CANCELLED_CALL" | "CANCELLED_PASS"
}

export type RTTService = {
	locationDetail: RTTLocationDetail
	serviceUid: string
	runDate: string
	trainIdentity: string
	runningIdentity: string
	atocCode: string
	atocName: string
	serviceType: "bus" | "ship" | "train"
	isPassenger: boolean
}

export type RTTLocationSearch = {
	location: RTTLocation
	services?: RTTService[]
}

export type RTTLocationFull = {
	realtimeActivated: boolean
	tiploc: string
	crs: string
	description: string
    wttBookedArrival?: string
    wttBookedDeparture?: string
    wttBookedPass?: string
    gbttBookedArrival?: string
	gbttBookedDeparture?: string
	origin: RTTLocationStop[]
	destination: RTTLocationStop[]
	isCall: boolean
	isPublicCall: boolean
    realtimeArrival?: string
    realtimeArrivalNoReport?: boolean
    realtimeWttArrivalLateness?: number
	realtimeGbttArrivalLateness?: number
	realtimeDeparture?: string
	realtimeDepartureActual?: boolean
    realtimeDepartureNoReport?: boolean
    realtimeWttDepartureLateness?: number
	realtimeGbttDepartureLateness?: number
    realtimePass?: string
    realtimePassActual?: boolean
    realtimePassNoReport?: boolean
	platform?: string
	platformConfirmed?: boolean
	platformChanged?: boolean
	line?: string
	lineConfirmed?: boolean
    path?: string
    pathConfirmed?: boolean
    cancelReasonCode?: string
    cancelReasonShortText?: string
    cancelReasonLongText?: string
	displayAs: "CALL" | "PASS" | "ORIGIN" | "DESTINATION" | "STARTS" | "TERMINATES" | "CANCELLED_CALL" | "CANCELLED_PASS"
    serviceLocation?: "APPR_STAT" | "APPR_PLAT" | "AT_PLAT" | "DEP_PREP" | "DEP_READY"
}

export type RTTServiceFull = {
	serviceUid: string
	runDate: string
	serviceType: "bus" | "ship" | "train"
	isPassenger: boolean
	trainIdentity: string
	powerType: string
	trainClass: string
    sleeper?: string
	atocCode: string
	atocName: string
	performanceMonitored: boolean
	origin: RTTLocationStop[]
	destination: RTTLocationStop[]
	locations: RTTLocationFull[]
	realtimeActivated: boolean
	runningIdentity: string
}
