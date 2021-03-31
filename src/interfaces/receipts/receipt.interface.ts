import IDate from "interfaces/common/date.interface";

export default interface IReceipt {
  _id?: string;
  hostId: string;
  experienceId: string;
  activityId: string;
  guestId: string;
  checkOutSessionId: string;
  takePlace: IDate;
  unitPrice: number;
  numberOfGuest: number;
  totalPrice: number;
  status: string;
}
