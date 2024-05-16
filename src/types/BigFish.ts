import { BigFishType } from '../enums/BigFishType.ts';
import { BaitType } from '../enums/BaitType.ts';
import { WeatherType } from '../enums/WeatherType.ts';
import { FishingHoleType } from '../enums/FishingHoleType.ts';
import { NormalFishType } from '../enums/NormalFishType.ts';

export type BigFish = {
  id: BigFishType;
  name: string;
  patch: string;
  baits: BaitType[];
  fishSequence: (BaitType | NormalFishType | BigFishType)[];
  location: FishingHoleType;
  difficulty: number;
  snagging?: boolean;
  prepTime?: number;
  prepType?: ('stacks' | 'mooch' | 'intfish' | 'stay')[];
  intuition?: IntuitionRequirement[];
  times?: { start: number; end: number }[];
  weathers?: WeatherType[];
  weatherTransitions?: { from: WeatherType[]; to: WeatherType[] };
};

export type IntuitionRequirement = {
  fish: NormalFishType | BigFishType;
  quantity: number;
};
