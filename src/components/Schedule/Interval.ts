import { BigFishType } from '../../enums/BigFishType.ts';

export type Interval = {
  fish: BigFishType;
  weight: number;
  travelStartTimestamp?: number;
  travelEndTimestamp?: number;
  prepStartTimestamp?: number;
  prepEndTimestamp?: number;
  fishStartTimestamp: number;
  fishEndTimestamp: number;
  startTimestamp: number;
  endTimestamp: number;
};
