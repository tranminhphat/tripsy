import IDate from "../common/date.interface";
export default interface IActivity {
  _id?: string;
  experienceId?: string;
  listOfGuestId: string[];
  date: IDate;
}
