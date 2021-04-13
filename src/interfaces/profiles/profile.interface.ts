export default interface IProfile {
  _id?: string;
  introduction?: string;
  savedExperiences?: string[];
  reviews: string[];
  checkpoints: { themeId: string; points: number }[];
}
