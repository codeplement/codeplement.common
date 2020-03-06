import { IPosition } from './position';

export interface IPlacePredilection {
  description: string;
  placeId: string;
  data: string;
}

export interface IPlace extends IPosition {
  phoneNumber: string;
  formattedAddress: string;
  data: string;
  photoReference?: string;
}
