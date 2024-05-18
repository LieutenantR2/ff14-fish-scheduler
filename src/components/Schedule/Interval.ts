import { BigFishType } from '../../enums/BigFishType.ts';

export type Interval = {
  fish: BigFishType;
  weight: number;
  travelStartTimeStamp?: number;
  travelEndTimeStamp?: number;
  prepStartTimeStamp?: number;
  prepEndTimeStamp?: number;
  fishStartTimeStamp: number;
  fishEndTimeStamp: number;
  startTimestamp: number;
  endTimestamp: number;
};
