export declare type DateRange = [Date | undefined, Date | undefined];
export declare function isDateValid(date: Date | false | null): date is Date;
export declare function areEqual(date1: Date, date2: Date): boolean;
export declare function areRangesEqual(dateRange1: DateRange, dateRange2: DateRange): boolean;
export declare function areSameDay(date1: Date, date2: Date): boolean;
export declare function areSameMonth(date1: Date, date2: Date): boolean;
export declare function areSameTime(date1: Date, date2: Date): boolean;
export declare function clone(d: Date): Date;
export declare function isDayInRange(date: Date, dateRange: DateRange, exclusive?: boolean): boolean;
export declare function isDayRangeInRange(innerRange: DateRange, outerRange: DateRange): boolean;
export declare function isMonthInRange(date: Date, dateRange: DateRange): boolean;
export declare const isTimeEqualOrGreaterThan: (time: Date, timeToCompare: Date) => boolean;
export declare const isTimeEqualOrSmallerThan: (time: Date, timeToCompare: Date) => boolean;
export declare function isTimeInRange(date: Date, minDate: Date, maxDate: Date): boolean;
export declare function getTimeInRange(time: Date, minTime: Date, maxTime: Date): Date;
/**
 * Returns true if the time part of `date` is later than or equal to the time
 * part of `dateToCompare`. The day, month, and year parts will not be compared.
 */
export declare function isTimeSameOrAfter(date: Date, dateToCompare: Date): boolean;
/**
 * @returns a Date at the exact time-wise midpoint between startDate and endDate
 */
export declare function getDateBetween(dateRange: DateRange): Date;
export declare function getDateTime(date: Date | null, time?: Date | null): Date;
export declare function getDateOnlyWithTime(date: Date): Date;
export declare function getDatePreviousMonth(date: Date): Date;
export declare function getDateNextMonth(date: Date): Date;
export declare function convert24HourMeridiem(hour: number, toPm: boolean): number;
export declare function getIsPmFrom24Hour(hour: number): boolean;
export declare function get12HourFrom24Hour(hour: number): number;
export declare function get24HourFrom12Hour(hour: number, isPm: boolean): number;
