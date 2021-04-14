import IActivity from "interfaces/activity/activity.interface";
import IDate from "interfaces/common/date.interface";
import IExperience from "interfaces/experiences/experience.interface";
import { IUser } from "interfaces/users/user.interface";

export default interface IReceipt {
  _id?: string;
  hostId: string;
  host?: IUser;
  experienceId: string;
  experience?: IExperience;
  activityId: string;
  activity?: IActivity;
  guestId: string;
  checkOutSessionId: string;
  takePlace: IDate;
  unitPrice: number;
  numberOfGuest: number;
  totalPrice: number;
  status: string;
}
