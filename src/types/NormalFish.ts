import { NormalFishType } from '../enums/NormalFishType.ts';
import { BaitType } from '../enums/BaitType.ts';
import { BigFishType } from '../enums/BigFishType.ts';
import { WeatherType } from '../enums/WeatherType.ts';
import { FishingHoleType } from '../enums/FishingHoleType.ts';

export type NormalFishInfo = {
  bait?: BaitType;
  fishSequence?: (BaitType | NormalFishType | BigFishType)[][];
};

export type NormalFish = {
  id: NormalFishType;
  name: string;
  patch: string;
  bait: BaitType;
  fishSequence: (BaitType | NormalFishType | BigFishType)[][];
  bite: 1 | 2 | 3;
  hook: 'precision' | 'powerful';
  snagging?: boolean;
  holeOverride?: Partial<Record<FishingHoleType, NormalFishInfo>>;
  times?: { start: number; end: number }[];
  weathers?: WeatherType[];
  weatherTransitions?: { from: WeatherType[]; to: WeatherType[] };
};
