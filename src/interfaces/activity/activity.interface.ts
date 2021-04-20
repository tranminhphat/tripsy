import IExperience from "interfaces/experiences/experience.interface";
import IDate from "../common/date.interface";
export default interface IActivity {
  _id?: string;
  experienceId?: string;
  experience?: IExperience;
  listOfGuestId: string[];
  date: IDate;
}
