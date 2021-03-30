export default interface IDate {
  startTimeIdx: number;
  endTimeIdx: number;
  dateObject: {
    dayOfYear: number;
    weekDay: number;
    day: number;
    month: number;
    year: number;
    unix: number;
  };
}
