import type { SimplifiedDate } from "./types.js";

export function sanitizeDate(year: number, monthLike: number, dayLike: number): SimplifiedDate {
	const sanitizer = new Date(year, monthLike, dayLike);
	const simplifiedDate = {
		year: sanitizer.getFullYear(),
		month: sanitizer.getMonth(),
		day: sanitizer.getDate(),
	} as SimplifiedDate;

	return simplifiedDate;
}

export function nextDay(simplifiedDate: SimplifiedDate) {
	return sanitizeDate(simplifiedDate.year, simplifiedDate.month, simplifiedDate.day + 1);
}

export function previousDay(simplifiedDate: SimplifiedDate) {
	return sanitizeDate(simplifiedDate.year, simplifiedDate.month, simplifiedDate.day - 1);
}
