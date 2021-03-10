export interface IExperienceResponse {
  _id?: string;
  hostId?: string;
  theme?: string;
  location?: { city: string; coordinates: [number, number] };
  language?: string;
  description?: string;
  address?: { city: string; district: string; ward: string; street };
}
