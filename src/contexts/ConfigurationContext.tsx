import { createContext } from 'react';
import { BaitType } from '../enums/BaitType.ts';
import { BigFishType } from '../enums/BigFishType.ts';
import { Bait } from '../types/Bait.ts';
import { BigFish } from '../types/BigFish.ts';
import { CarbunclePlushySettings } from '../components/Import/CarbunclePlushySettings.ts';

export interface ConfigurationContextModel {
  patches: Set<string>;
  baits: Set<BaitType>;
  fishes: Set<BigFishType>;
  completed: Set<BigFishType>;

  onSelectPatch: (patchNames: string[], selected: boolean) => void;
  onSelectBait: (baitIds: Bait[], selected: boolean) => void;
  onSelectFish: (fishIds: BigFish[], selected: boolean) => void;
  onCompleteFish: (fishIds: BigFishType[], selected: boolean) => void;
  loadCarbunclePlushySettings: (settings: CarbunclePlushySettings) => boolean;

  scheduleLookaheadMonths: number;
  scheduleDurationHours: number;
  minimumRemainingWindowSeconds: number;
  travelTimeSeconds: number;
  stacksPrepTimeSeconds: number;
  moochPrepTimeSeconds: number;
  customFishOrdering?: BigFishType[];

  setScheduleLookaheadMonths: (months: number) => void;
  setScheduleDurationHours: (hours: number) => void;
  setMinimumRemainingWindowSeconds: (seconds: number) => void;
  setTravelTimeSeconds: (seconds: number) => void;
  setStacksPrepTimeSeconds: (seconds: number) => void;
  setMoochPrepTimeSeconds: (seconds: number) => void;
  setCustomFishOrdering: (fishOrder: BigFishType[] | undefined) => void;
}

/**
 * Context for the web socket connections
 */
export const ConfigurationContext = createContext<ConfigurationContextModel>(
  {} as ConfigurationContextModel
);
