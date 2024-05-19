import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ConfigurationContext, ConfigurationContextModel } from './ConfigurationContext.tsx';
import { setDifference, setIntersect, setUnion } from '../utils.ts';
import { BigFish } from '../types/BigFish.ts';
import { BigFishType } from '../enums/BigFishType.ts';
import { BaitType } from '../enums/BaitType.ts';
import { Bait } from '../types/Bait.ts';
import { AllBaits, BaitData } from '../data/BaitData.ts';
import { AllFishes } from '../data/BigFishData.ts';
import { PatchData } from '../data/PatchData.ts';
import { CarbunclePlushySettings } from '../components/Import/CarbunclePlushySettings.ts';
import { getCarbunclePlushyPatches } from '../components/Import/parser.ts';

type ConfigurationProviderProps = {
  children?: React.ReactNode;
};

const ConfigurationProvider: FC<ConfigurationProviderProps> = ({ children }) => {
  const [patches, setPatches] = useState(new Set<string>(PatchData));
  const [baitTypes, setBaitTypes] = useState(new Set<BaitType>(AllBaits.map((b) => b.id)));
  const [fishTypes, setFishTypes] = useState(new Set<BigFishType>(AllFishes.map((f) => f.id)));
  const [completedFishes, setCompletedFishes] = useState(new Set<BigFishType>());

  const [scheduleLookaheadMonths, setScheduleLookaheadMonths] = useState(12);
  const [scheduleDurationHours, setScheduleDurationHours] = useState(12);
  const [minimumRemainingWindowSeconds, setMinimumRemainingWindowSeconds] = useState(300);
  const [travelTimeSeconds, setTravelTimeSeconds] = useState(60);
  const [stacksPrepTimeSeconds, setStacksPrepTimeSeconds] = useState(300);
  const [moochPrepTimeSeconds, setMoochPrepTimeSeconds] = useState(120);
  const [customFishOrdering, setCustomFishOrdering] = useState<BigFishType[] | undefined>(
    undefined
  );

  useEffect(() => {
    const patchBaits = [...patches]
      .map((p) => BaitData[p] ?? [])
      .reduce((a, b) => [...a, ...b])
      .map((b) => b.id);

    setBaitTypes(new Set(patchBaits));
  }, [patches]);

  useEffect(() => {
    const baitFishes = AllFishes.filter(
      (f) =>
        patches.has(f.patch) &&
        setIntersect(baitTypes, f.baits).size === f.baits.length &&
        !completedFishes.has(f.id)
    ).map((f) => f.id);

    setFishTypes(new Set(baitFishes));
  }, [patches, baitTypes]);

  const onSelectPatch = useCallback(
    (patchNames: string[], isSelected: boolean) => {
      const updatedPatches = isSelected
        ? setUnion(patches, patchNames)
        : setDifference(patches, patchNames);
      setPatches(updatedPatches);
    },
    [patches]
  );

  const onSelectBait = useCallback(
    (baits: Bait[], isSelected: boolean) => {
      const baitIds = new Set(baits.map((b) => b.id));
      const updatedBaitIds = isSelected
        ? setUnion(baitTypes, baitIds)
        : setDifference(baitTypes, baitIds);
      setBaitTypes(updatedBaitIds);
    },
    [baitTypes]
  );

  const onSelectFish = useCallback(
    (fishes: BigFish[], isSelected: boolean) => {
      const fishIds = fishes.map((f) => f.id);
      if (isSelected) {
        setFishTypes(setDifference(setUnion(fishTypes, fishIds), completedFishes));
      } else {
        setFishTypes(setDifference(fishTypes, setUnion(fishIds, completedFishes)));
      }
    },
    [completedFishes, fishTypes]
  );

  const onCompleteFish = useCallback(
    (fishIds: BigFishType[], isSelected: boolean) => {
      if (isSelected) {
        setCompletedFishes(setUnion(completedFishes, fishIds));
        setFishTypes(setDifference(fishTypes, fishIds));
      } else {
        setCompletedFishes(setDifference(completedFishes, fishIds));
        setFishTypes(setUnion(fishTypes, fishIds));
      }
    },
    [completedFishes, fishTypes]
  );

  const loadCarbunclePlushySettings = useCallback(
    (settings: CarbunclePlushySettings): boolean => {
      setCompletedFishes(new Set(settings.completed));
      setPatches(getCarbunclePlushyPatches(settings));
      setFishTypes(setDifference(fishTypes, settings.completed));
      return true;
    },
    [fishTypes, onSelectPatch, patches]
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

  const contextValue = useMemo<ConfigurationContextModel>(
    () => ({
      patches,
      baits: baitTypes,
      fishes: fishTypes,
      completed: completedFishes,

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

      setScheduleLookaheadMonths: updateScheduleLookaheadMonths,
      setScheduleDurationHours: updateScheduleDurationHours,
      setMinimumRemainingWindowSeconds: updateMinimumRemainingWindowSeconds,
      setTravelTimeSeconds: updateTravelTimeSeconds,
      setStacksPrepTimeSeconds: updateStacksPrepTimeSeconds,
      setMoochPrepTimeSeconds: updateMoochPrepTimeSeconds,
      setCustomFishOrdering: updateCustomFishOrdering,
    }),
    [
      patches,
      baitTypes,
      fishTypes,
      completedFishes,
      onSelectPatch,
      onSelectFish,
      onSelectBait,
      loadCarbunclePlushySettings,
      scheduleLookaheadMonths,
      scheduleDurationHours,
      minimumRemainingWindowSeconds,
      travelTimeSeconds,
      stacksPrepTimeSeconds,
      moochPrepTimeSeconds,
      customFishOrdering,
      updateScheduleLookaheadMonths,
      updateScheduleDurationHours,
      updateMinimumRemainingWindowSeconds,
      updateTravelTimeSeconds,
      updateStacksPrepTimeSeconds,
      updateMoochPrepTimeSeconds,
      updateCustomFishOrdering,
    ]
  );

  return (
    <ConfigurationContext.Provider value={contextValue}>{children}</ConfigurationContext.Provider>
  );
};

export default ConfigurationProvider;
