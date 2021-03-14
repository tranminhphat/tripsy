export interface IExperienceResponse {
  _id?: string;
  hostId?: string;
  theme?: string;
  location?: { city: string; coordinates: [number, number] };
  language?: string;
  description?: string;
  address?: { city: string; district: string; ward: string; street };
  hostProvisions?: { id: number; itemName: string };
  guestBrings?: { id: number; itemName: string };
  title?: string;
  photoGallery?: any;
}
