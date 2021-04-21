import IExperience from "interfaces/experiences/experience.interface";
import { IUser } from "interfaces/users/user.interface";
import IDate from "../common/date.interface";
export default interface IActivity {
  _id?: string;
  experienceId?: string;
  experience?: IExperience;
  listOfGuestId: string[];
  guestsInfo: IUser[];
  date: IDate;
}
