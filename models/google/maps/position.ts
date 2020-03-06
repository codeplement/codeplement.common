export interface IPosition {
  latitude: number;
  longitude: number;
  name?: string;
}

export interface ISnappedPoint {
  position: IPosition;
  originalIndex: number;
  placeId: string;
}
