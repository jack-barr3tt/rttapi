export type Operator = {
	code: string
	name: string
}

export type LocationIdentity = {
	name: string
	crs: string
	tiploc: string
}

export type RouteTerminator = LocationIdentity & {
	time: Date
}

export enum CallType {
	Origin,
	Call,
	Destination,
}

export type ServiceAtLocation = BaseService & LocationIdentity & {
	realtime: boolean
	bookedArrival: Date
	bookedDeparture: Date
	realtimeArrival: Date
	realtimeDeparture: Date
	origin: RouteTerminator
	destination: RouteTerminator
	isCall: boolean
	isPublicCall: boolean
	callType: CallType
}

export type BaseService = {
	id: string
	runDate: Date
	identity: string
	operator: Operator
	type: string
	isPassenger: boolean
}

export type Location = LocationIdentity & {
	services: ServiceAtLocation[]
}

type Confirmable = {
	name: string
	confirmed: boolean
}

export type Platform = Confirmable & {
	changed: boolean
}

export type Line = Confirmable

export type Path = Confirmable

export type Stop = LocationIdentity & {
	realtime: boolean
	bookedArrival?: Date
	bookedDeparture?: Date
	realtimeArrival?: Date
	realtimeDeparture?: Date
    arrivalLateness?: number
    departureLateness?: number
	origin: RouteTerminator
	destination: RouteTerminator
	isCall: boolean
	isPublicCall: boolean
	platform?: Platform
	line?: Line
    path?: Path
	callType: CallType
    atPlatform: boolean
}

export type Service = BaseService & {
	monitored: boolean
	origin: RouteTerminator
	destination: RouteTerminator
	stops: Stop[]
	realtime: boolean
}
