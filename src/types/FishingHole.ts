import { LocationType } from '../enums/LocationType.ts';
import { FishingHoleType } from '../enums/FishingHoleType.ts';

export type FishingHole = {
  id: FishingHoleType;
  name: string;
  location: LocationType;
  patch: string;
};
