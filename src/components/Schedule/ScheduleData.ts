import { BigFishType } from '../../enums/BigFishType.ts';
import { Interval } from './Interval.ts';

export type ScheduleData = {
  startTime: number;
  endTime: number;
  duration: number;
  schedule: ScheduledFish[];
};

export type ScheduledFish = {
  fishId: BigFishType;
  interval: Interval;
};
