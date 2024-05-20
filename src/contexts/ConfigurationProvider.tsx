import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ConfigurationContext, ConfigurationContextModel } from './ConfigurationContext.tsx';
import { setDifference, setIntersect, setUnion } from '../utils.ts';
import { BigFish } from '../types/BigFish.ts';
import { BigFishType } from '../enums/BigFishType.ts';
import { BaitType } from '../enums/BaitType.ts';
import { Bait } from '../types/Bait.ts';
import { ALL_BAITS, BAIT_DATA } from '../data/BaitData.ts';
import { ALL_BIG_FISHES } from '../data/BigFishData.ts';
import { PATCH_DATA } from '../data/PatchData.ts';
import { CarbunclePlushySettings } from '../components/Import/CarbunclePlushySettings.ts';
import { getCarbunclePlushyPatches } from '../components/Import/parser.ts';

type ConfigurationProviderProps = {
  children?: React.ReactNode;
};

function getStoredNumericConfig(key: string, defaultVal: number) {
  const storedVal = localStorage.getItem(key);
  if (storedVal === null || !storedVal.match(/^\d+$/)) {
    return defaultVal;
  }
  return parseInt(storedVal);
}

function getStoredArrayConfig<T>(key: string, defaultVal: T[]) {
  const storedVal = localStorage.getItem(key);
  if (storedVal === null) {
    return defaultVal;
  }
  try {
    return JSON.parse(storedVal) as T[];
  } catch {
    return defaultVal;
  }
}

const ConfigurationProvider: FC<ConfigurationProviderProps> = ({ children }) => {
  const [patches, setPatches] = useState(
    new Set<string>(getStoredArrayConfig('patches', PATCH_DATA))
  );
  const [baitTypes, setBaitTypes] = useState(
    new Set<BaitType>(
      getStoredArrayConfig(
        'baits',
        ALL_BAITS.map((b) => b.id)
      )
    )
  );
  const [fishTypes, setFishTypes] = useState(
    new Set<BigFishType>(
      getStoredArrayConfig(
        'fishes',
        ALL_BIG_FISHES.map((f) => f.id)
      )
    )
  );
  const [completedFishes, setCompletedFishes] = useState(
    new Set<BigFishType>(getStoredArrayConfig<BigFishType>('completed', []))
  );

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
    const patchBaits = [...patches]
      .map((p) => BAIT_DATA[p] ?? [])
      .reduce((a, b) => [...a, ...b])
      .map((b) => b.id);

    setBaitTypes(new Set(patchBaits));
    localStorage.setItem('patches', JSON.stringify([...patches]));
  }, [patches]);

  useEffect(() => {
    localStorage.setItem('baits', JSON.stringify([...baitTypes]));
  }, [baitTypes]);

  useEffect(() => {
    const baitFishes = ALL_BIG_FISHES.filter(
      (f) =>
        patches.has(f.patch) &&
        setIntersect(baitTypes, f.baits).size === f.baits.length &&
        !completedFishes.has(f.id)
    ).map((f) => f.id);

    setFishTypes(new Set(baitFishes));
  }, [patches, baitTypes]);

  useEffect(() => {
    localStorage.setItem('fishes', JSON.stringify([...fishTypes]));
  }, [fishTypes]);

  useEffect(() => {
    localStorage.setItem('completed', JSON.stringify([...completedFishes]));
  }, [completedFishes]);

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
