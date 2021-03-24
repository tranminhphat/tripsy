import { FileReaderResultType } from "types";

export interface IExperienceResponse {
  _id?: string;
  hostId?: string;
  theme?: string;
  location?: { city: string; coordinates: [number, number] };
  language?: string;
  description?: string;
  address?: { city: string; district: string; ward: string; street: string };
  hostProvisions?: { id: number; itemName: string }[];
  guestBrings?: { id: number; itemName: string };
  title?: string;
  photoGallery?: {
    type: string;
    base64String?: FileReaderResultType;
    url?: string;
  }[];
  groupSize?: number;
  duration?: number;
  startTime?: string;
  pricing?: { individualPrice: number; estimatedEarning: number };
  bookingDate?: number;
  availableDates?: any;
}
