export interface IResponseIndicator{
    incomesWeek: number,
    costsWeek: number,
    incomesToday: number,
    costsToday: number
}
export interface IValuesIncomeWeekResponse {
    dayOfWeek:        number;
    movementValueSum: number;
}