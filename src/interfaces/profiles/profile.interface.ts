import IExperience from "interfaces/experiences/experience.interface";

export default interface IProfile {
  _id?: string;
  introduction?: string;
  savedExperiences?: string[];
  savedExperiencesList?: IExperience[];
  reviews: string[];
  checkpoints: { themeId: string; points: number }[];
}
