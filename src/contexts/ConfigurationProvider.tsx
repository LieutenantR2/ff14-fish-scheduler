import { FC, useCallback, useMemo, useState } from 'react';
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
  const [travelTimeSeconds, setTravelTimeSeconds] = useState(60);
  const [stacksPrepTimeSeconds, setStacksPrepTimeSeconds] = useState(300);
  const [moochPrepTimeSeconds, setMoochPrepTimeSeconds] = useState(120);
  const [customFishOrdering, setCustomFishOrdering] = useState<BigFishType[] | undefined>(
    undefined
  );

  const onSelectPatch = useCallback(
    (patchNames: string[], isSelected: boolean) => {
      const patchNamesSet = new Set(patchNames);
      const patchBaits = [...patchNames]
        .map((p) => BaitData[p] ?? [])
        .reduce((a, b) => [...a, ...b])
        .map((b) => b.id);

      const updatedPatches = isSelected
        ? setUnion(patches, patchNames)
        : setDifference(patches, patchNames);
      setPatches(updatedPatches);

      const updatedBaitIds = isSelected
        ? setUnion(baitTypes, patchBaits)
        : setDifference(baitTypes, patchBaits);
      setBaitTypes(updatedBaitIds);

      if (isSelected) {
        // Add fishes from the added patches
        const baitFishes = AllFishes.filter(
          (f) =>
            updatedPatches.has(f.patch) &&
            setIntersect(updatedBaitIds, f.baits).size === f.baits.length
        ).map((f) => f.id);

        if (baitFishes.length) {
          setFishTypes(setDifference(setUnion(fishTypes, baitFishes), completedFishes));
        }
      } else {
        // Remove fishes from the removed patches
        const baitFishes = AllFishes.filter(
          (f) => patchNamesSet.has(f.patch) || setIntersect(patchBaits, f.baits).size > 0
        ).map((f) => f.id);

        setFishTypes(setDifference(fishTypes, setUnion(baitFishes, completedFishes)));
      }
    },
    [patches, baitTypes, fishTypes, completedFishes]
  );

  const onSelectBait = useCallback(
    (baits: Bait[], isSelected: boolean) => {
      const baitIds = new Set(baits.map((b) => b.id));

      const updatedBaitIds = isSelected
        ? setUnion(baitTypes, baitIds)
        : setDifference(baitTypes, baitIds);

      const baitFishes = AllFishes.filter(
        (f) => patches.has(f.patch) && setIntersect(updatedBaitIds, f.baits).size === f.baits.length
      ).map((f) => f.id);

      setBaitTypes(updatedBaitIds);

      if (isSelected) {
        setFishTypes(setDifference(setUnion(baitFishes, fishTypes), completedFishes));
      } else {
        setFishTypes(setDifference(setIntersect(baitFishes, fishTypes), completedFishes));
      }
    },
    [baitTypes, completedFishes, fishTypes, patches]
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

  const loadCarbunclePlushySettings = useCallback(
    (settings: CarbunclePlushySettings): boolean => {
      setCompletedFishes(new Set(settings.completed));

      const carbunclePlushyPatches = getCarbunclePlushyPatches(settings);
      const patchesToRemove = setDifference(patches, carbunclePlushyPatches);
      const patchesToAdd = setDifference(carbunclePlushyPatches, patches);
      if (patchesToAdd.size) {
        onSelectPatch([...patchesToAdd], true);
      }
      if (patchesToRemove.size) {
        onSelectPatch([...patchesToRemove], false);
      }

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
      loadCarbunclePlushySettings,

      scheduleLookaheadMonths,
      scheduleDurationHours,
      travelTimeSeconds,
      stacksPrepTimeSeconds,
      moochPrepTimeSeconds,
      customFishOrdering,

      setScheduleLookaheadMonths: updateScheduleLookaheadMonths,
      setScheduleDurationHours: updateScheduleDurationHours,
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
      travelTimeSeconds,
      stacksPrepTimeSeconds,
      moochPrepTimeSeconds,
      customFishOrdering,
      updateScheduleLookaheadMonths,
      updateScheduleDurationHours,
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
