import type { SimplifiedDate } from "./types.js";

export function fromJsDate(date: Date): SimplifiedDate {
	const simplifiedDate = {
		year: date.getFullYear(),
		month: date.getMonth(),
		day: date.getDate(),
	} as SimplifiedDate;

	return simplifiedDate;
}

function toJsDate(simplifiedDate: SimplifiedDate): Date {
	return new Date(simplifiedDate.year, simplifiedDate.month, simplifiedDate.day);
}

export function getDayOfTheWeek(simplifiedDate: SimplifiedDate): number {
	const date = toJsDate(simplifiedDate);

	return date.getDay();
}

export function getFirstDayOfMonth(date: SimplifiedDate): SimplifiedDate {
	return { ...date, day: 1 };
}

export function sanitizeDate(year: number, monthLike: number, dayLike: number): SimplifiedDate {
	const sanitizer = new Date(year, monthLike, dayLike);
	return fromJsDate(sanitizer);
}

export function nextDay(simplifiedDate: SimplifiedDate) {
	return sanitizeDate(simplifiedDate.year, simplifiedDate.month, simplifiedDate.day + 1);
}

export function previousDay(simplifiedDate: SimplifiedDate) {
	return sanitizeDate(simplifiedDate.year, simplifiedDate.month, simplifiedDate.day - 1);
}

export function areDatesEqual(firstDate: SimplifiedDate, secondDate: SimplifiedDate): boolean {
	return (
		firstDate.day === secondDate.day &&
		firstDate.month === secondDate.month &&
		firstDate.year === secondDate.year
	);
}

export function isBeforeDate(
	simplifiedDateBefore: SimplifiedDate,
	simplifiedDateAfter: SimplifiedDate
): boolean {
	return (
		simplifiedDateBefore.year < simplifiedDateAfter.year ||
		(simplifiedDateBefore.year === simplifiedDateAfter.year &&
			simplifiedDateBefore.month < simplifiedDateAfter.month) ||
		(simplifiedDateBefore.year === simplifiedDateAfter.year &&
			simplifiedDateBefore.month === simplifiedDateAfter.month &&
			simplifiedDateBefore.day < simplifiedDateAfter.day)
	);
}

export function isInBetween(
	simplifiedDateToCheck: SimplifiedDate,
	simplifiedDate1: SimplifiedDate,
	simplifiedDate2: SimplifiedDate
): boolean {
	if (isBeforeDate(simplifiedDate2, simplifiedDate1)) {
		[simplifiedDate1, simplifiedDate2] = [simplifiedDate2, simplifiedDate1];
	}

	return (
		isBeforeDate(simplifiedDateToCheck, simplifiedDate2) &&
		!isBeforeDate(simplifiedDateToCheck, nextDay(simplifiedDate1))
	);
}
