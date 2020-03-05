export interface IPlacePredilection {
  description: string;
  placeId: string;
  data: string;
}

export interface IPlace {
  latitude: number;
  longitude: number;
  name: string;
  phoneNumber: string;
  formattedAddress: string;
  data: string;
  photoReference?: string;
}
