import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ConfigurationContext, ConfigurationContextModel } from './ConfigurationContext.tsx';
import { setDifference, setUnion } from '../utils.ts';
import { BigFish } from '../types/BigFish.ts';
import { BigFishType } from '../enums/BigFishType.ts';
import { BaitType } from '../enums/BaitType.ts';
import { Bait } from '../types/Bait.ts';
import { ALL_BAITS } from '../data/BaitData.ts';
import { ALL_BIG_FISHES } from '../data/BigFishData.ts';
import { PATCH_DATA } from '../data/PatchData.ts';
import { CarbunclePlushySettings } from '../components/Import/CarbunclePlushySettings.ts';
import { getCarbunclePlushyPatches } from '../components/Import/parser.ts';
import {
  getStoredArrayConfig,
  getStoredBooleanConfig,
  getStoredNumericConfig,
} from '../storageUtils.ts';
import { FilterProps, useFilterState } from './useFilterState.ts';

type ConfigurationProviderProps = {
  children?: React.ReactNode;
};

const ConfigurationProvider: FC<ConfigurationProviderProps> = ({ children }) => {
  // Fish Filter States
  const [filters, setFilters] = useFilterState({
    patches: new Set<string>(getStoredArrayConfig('patches', PATCH_DATA)),
    baits: new Set<BaitType>(
      getStoredArrayConfig(
        'baits',
        ALL_BAITS.map((b) => b.id)
      )
    ),
    fishes: new Set<BigFishType>(
      getStoredArrayConfig(
        'fishes',
        ALL_BIG_FISHES.map((f) => f.id)
      )
    ),
    completed: new Set<BigFishType>(getStoredArrayConfig<BigFishType>('completed', [])),
  });

  // Config States
  const [scheduleLookaheadMonths, setScheduleLookaheadMonths] = useState(
    getStoredNumericConfig('scheduleLookaheadMonths', 12)
  );
  const [scheduleDurationHours, setScheduleDurationHours] = useState(
    getStoredNumericConfig('scheduleDurationHours', 6)
  );
  const [minimumRemainingWindowSeconds, setMinimumRemainingWindowSeconds] = useState(
    getStoredNumericConfig('minimumRemainingWindowSeconds', 360)
  );
  const [travelTimeSeconds, setTravelTimeSeconds] = useState(
    getStoredNumericConfig('travelTimeSeconds', 0)
  );
  const [stacksPrepTimeSeconds, setStacksPrepTimeSeconds] = useState(0);
  const [moochPrepTimeSeconds, setMoochPrepTimeSeconds] = useState(0);
  const [customFishOrdering, setCustomFishOrdering] = useState<BigFishType[] | undefined>(
    undefined
  );
  const [autoGenerateOnCompletion, setAutoGenerateOnCompletion] = useState(
    getStoredBooleanConfig('autoGenerateOnCompletion', true)
  );
  const [isFreeTrial, setIsFreeTrial] = useState(getStoredBooleanConfig('isFreeTrial', true));
  const [excludeRequiredBigFish, setExcludeRequiredBigFish] = useState(
    getStoredBooleanConfig('excludeRequiredBigFish', true)
  );

  // Storage Save Triggers
  useEffect(() => {
    localStorage.setItem('scheduleLookaheadMonths', scheduleLookaheadMonths.toString());
  }, [scheduleLookaheadMonths]);

  useEffect(() => {
    localStorage.setItem('scheduleDurationHours', scheduleDurationHours.toString());
  }, [scheduleDurationHours]);

  useEffect(() => {
    localStorage.setItem('minimumRemainingWindowSeconds', minimumRemainingWindowSeconds.toString());
  }, [minimumRemainingWindowSeconds]);

  useEffect(() => {
    localStorage.setItem('travelTimeSeconds', travelTimeSeconds.toString());
  }, [travelTimeSeconds]);

  useEffect(() => {
    localStorage.setItem('excludeRequiredBigFish', excludeRequiredBigFish.toString());
  }, [excludeRequiredBigFish]);

  useEffect(() => {
    localStorage.setItem('patches', JSON.stringify([...filters.patches]));
    localStorage.setItem('baits', JSON.stringify([...filters.baits]));
    localStorage.setItem('fishes', JSON.stringify([...filters.fishes]));
    localStorage.setItem('completed', JSON.stringify([...filters.completed]));
  }, [filters]);

  // Interaction Handlers
  const onSelectPatch = useCallback(
    (patchNames: string[], isSelected: boolean) => {
      setFilters((prevState: FilterProps) => {
        const updatedPatches = isSelected
          ? setUnion(prevState.patches, patchNames)
          : setDifference(prevState.patches, patchNames);
        return {
          ...prevState,
          patches: updatedPatches,
        } as FilterProps;
      });
    },
    [setFilters]
  );

  const onSelectBait = useCallback(
    (baits: Bait[], isSelected: boolean) => {
      const baitIds = new Set(baits.map((b) => b.id));
      setFilters((prevState) => {
        const updatedBaitIds = isSelected
          ? setUnion(prevState.baits, baitIds)
          : setDifference(prevState.baits, baitIds);
        return {
          ...prevState,
          baits: updatedBaitIds,
        };
      });
    },
    [setFilters]
  );

  const onSelectFish = useCallback(
    (fishes: BigFish[], isSelected: boolean) => {
      const fishIds = fishes.map((f) => f.id);
      if (isSelected) {
        setFilters((prevState) => ({
          ...prevState,
          fishes: setDifference(setUnion(prevState.fishes, fishIds), prevState.completed),
        }));
      } else {
        setFilters((prevState) => ({
          ...prevState,
          fishes: setDifference(prevState.fishes, setUnion(fishIds, prevState.completed)),
        }));
      }
    },
    [setFilters]
  );

  const onCompleteFish = useCallback(
    (fishIds: BigFishType[], isSelected: boolean) => {
      if (isSelected) {
        setFilters((prevState) => ({
          ...prevState,
          completed: setUnion(prevState.completed, fishIds),
        }));
      } else {
        setFilters((prevState) => ({
          ...prevState,
          completed: setDifference(prevState.completed, fishIds),
        }));
      }
    },
    [setFilters]
  );

  const loadCarbunclePlushySettings = useCallback(
    (settings: CarbunclePlushySettings): boolean => {
      setFilters((prevState) => ({
        ...prevState,
        patches: getCarbunclePlushyPatches(settings),
        fishes: setDifference(prevState.fishes, settings.completed),
        completed: new Set(settings.completed),
      }));
      return true;
    },
    [setFilters]
  );

  const updateScheduleLookaheadMonths = useCallback((months: number) => {
    setScheduleLookaheadMonths(months);
  }, []);

  const updateScheduleDurationHours = useCallback((hours: number) => {
    setScheduleDurationHours(hours);
  }, []);

  const updateMinimumRemainingWindowSeconds = useCallback((seconds: number) => {
    setMinimumRemainingWindowSeconds(seconds);
  }, []);

  const updateTravelTimeSeconds = useCallback((seconds: number) => {
    setTravelTimeSeconds(seconds);
  }, []);

  const updateStacksPrepTimeSeconds = useCallback((seconds: number) => {
    setStacksPrepTimeSeconds(seconds);
  }, []);

  const updateMoochPrepTimeSeconds = useCallback((seconds: number) => {
    setMoochPrepTimeSeconds(seconds);
  }, []);

  const updateCustomFishOrdering = useCallback((fishOrder: BigFishType[] | undefined) => {
    setCustomFishOrdering(fishOrder);
  }, []);

  const updateExcludeRequiredBigFish = useCallback((exclude: boolean) => {
    setExcludeRequiredBigFish(exclude);
  }, []);

  const updateAutoGenerateOnCompletion = useCallback((autoGenerate: boolean) => {
    setAutoGenerateOnCompletion(autoGenerate);
  }, []);

  const updateIsFreeTrial = useCallback((freeTrial: boolean) => {
    setIsFreeTrial(freeTrial);
  }, []);

  // Context State
  const contextValue = useMemo<ConfigurationContextModel>(
    () => ({
      patches: filters.patches,
      baits: filters.baits,
      fishes: filters.fishes,
      completed: filters.completed,

      onSelectPatch,
      onSelectFish,
      onSelectBait,
      onCompleteFish,
      loadCarbunclePlushySettings,

      scheduleLookaheadMonths,
      scheduleDurationHours,
      minimumRemainingWindowSeconds,
      travelTimeSeconds,
      stacksPrepTimeSeconds,
      moochPrepTimeSeconds,
      customFishOrdering,
      excludeRequiredBigFish,
      autoGenerateOnCompletion,
      isFreeTrial,

      setScheduleLookaheadMonths: updateScheduleLookaheadMonths,
      setScheduleDurationHours: updateScheduleDurationHours,
      setMinimumRemainingWindowSeconds: updateMinimumRemainingWindowSeconds,
      setTravelTimeSeconds: updateTravelTimeSeconds,
      setStacksPrepTimeSeconds: updateStacksPrepTimeSeconds,
      setMoochPrepTimeSeconds: updateMoochPrepTimeSeconds,
      setCustomFishOrdering: updateCustomFishOrdering,

      setExcludeRequiredBigFish: updateExcludeRequiredBigFish,
      setAutoGenerateOnCompletion: updateAutoGenerateOnCompletion,
      setIsFreeTrial: updateIsFreeTrial,
    }),
    [
      filters,
      onSelectPatch,
      onSelectFish,
      onSelectBait,
      onCompleteFish,
      loadCarbunclePlushySettings,
      scheduleLookaheadMonths,
      scheduleDurationHours,
      minimumRemainingWindowSeconds,
      travelTimeSeconds,
      stacksPrepTimeSeconds,
      moochPrepTimeSeconds,
      customFishOrdering,
      excludeRequiredBigFish,
      autoGenerateOnCompletion,
      isFreeTrial,
      updateScheduleLookaheadMonths,
      updateScheduleDurationHours,
      updateMinimumRemainingWindowSeconds,
      updateTravelTimeSeconds,
      updateStacksPrepTimeSeconds,
      updateMoochPrepTimeSeconds,
      updateCustomFishOrdering,
      updateExcludeRequiredBigFish,
      updateAutoGenerateOnCompletion,
      updateIsFreeTrial,
    ]
  );

  return (
    <ConfigurationContext.Provider value={contextValue}>{children}</ConfigurationContext.Provider>
  );
};

export default ConfigurationProvider;
