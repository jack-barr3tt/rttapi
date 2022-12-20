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
	gbttBookedArrival: string
	gbttBookedDeparture: string
	origin: RTTLocationStop[]
	destination: RTTLocationStop[]
	isCall: boolean
	isPublicCall: boolean
	realtimeArrival: string
	realtimeArrivalActual: boolean
	realtimeDeparture: string
	realtimeDepartureActual: boolean
	displayAs: string
}

export type RTTService = {
	locationDetail: RTTLocationDetail
	serviceUid: string
	runDate: string
	trainIdentity: string
	runningIdentity: string
	atocCode: string
	atocName: string
	serviceType: string
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
	gbttBookedDeparture?: string
	origin: RTTLocationStop[]
	destination: RTTLocationStop[]
	isCall: boolean
	isPublicCall: boolean
	realtimeDeparture?: string
	realtimeDepartureActual?: boolean
	realtimeGbttDepartureLateness?: number
	platform?: string
	platformConfirmed?: boolean
	platformChanged?: boolean
	line?: string
	lineConfirmed?: boolean
	displayAs: string
	gbttBookedArrival?: string
	realtimeArrival?: string
	realtimeArrivalActual?: boolean
	realtimeGbttArrivalLateness?: number
	path?: string
	pathConfirmed?: boolean
    serviceLocation?: string
}

export type RTTServiceFull = {
	serviceUid: string
	runDate: string
	serviceType: string
	isPassenger: boolean
	trainIdentity: string
	powerType: string
	trainClass: string
	atocCode: string
	atocName: string
	performanceMonitored: boolean
	origin: RTTLocationStop[]
	destination: RTTLocationStop[]
	locations: RTTLocationFull[]
	realtimeActivated: boolean
	runningIdentity: string
}
