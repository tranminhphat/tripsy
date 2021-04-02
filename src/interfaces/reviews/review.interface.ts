export default interface IReview {
  _id?: string;
  userId?: string;
  objectId: string;
  onModel: string;
  numOfStars: number;
  content: string;
}
