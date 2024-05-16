import { createContext } from 'react';
import { BaitType } from '../enums/BaitType.ts';
import { BigFishType } from '../enums/BigFishType.ts';
import { Bait } from '../types/Bait.ts';
import { BigFish } from '../types/BigFish.ts';

export interface ConfigurationContextModel {
  patches: Set<string>;
  baits: Set<BaitType>;
  fishes: Set<BigFishType>;
  completed: Set<BigFishType>;

  onSelectPatch: (patchNames: string[], selected: boolean) => void;
  onSelectBait: (baitIds: Bait[], selected: boolean) => void;
  onSelectFish: (fishIds: BigFish[], selected: boolean) => void;
}

/**
 * Context for the web socket connections
 */
export const ConfigurationContext = createContext<ConfigurationContextModel>(
  {} as ConfigurationContextModel
);
