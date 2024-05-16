import { NormalFishType } from '../enums/NormalFishType.ts';
import { BaitType } from '../enums/BaitType.ts';

export type NormalFish = {
  id: NormalFishType;
  name: string;
  patch: string;
  baits: BaitType[];
};
