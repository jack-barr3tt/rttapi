import { RTTLocationStop } from "./api-types"
import { CallType, RouteTerminator } from "./types"

export function getServiceTime(runDate: Date, time?: string): Date | undefined {
	if (!time) return undefined

	const date = new Date(runDate)
	date.setHours(+time.substring(0, 2))
	date.setMinutes(+time.substring(2, 4))
	return date
}

export function getCallType(type: String): CallType {
	switch (type) {
		case "ORIGIN":
			return CallType.Origin
		case "CALL":
			return CallType.Call
		case "DESTINATION":
			return CallType.Destination
		default:
			return CallType.Call
	}
}

export function getRunDate(runDate: string): Date {
	return new Date(runDate + "T00:00:00")
}

export function parseStop(
	stop: RTTLocationStop,
	runDate: Date | string,
	crs?: string
): RouteTerminator {
	return {
		name: stop.description,
		crs: crs || "PLACEHOLDER",
		tiploc: stop.tiploc,
		time: getServiceTime(
			typeof runDate === "string" ? getRunDate(runDate) : runDate,
			stop.workingTime
		)!,
	}
}
