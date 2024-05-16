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

type ConfigurationProviderProps = {
  children?: React.ReactNode;
};

const ConfigurationProvider: FC<ConfigurationProviderProps> = ({ children }) => {
  const [patches, setPatches] = useState(new Set<string>(PatchData));
  const [baitTypes, setBaitTypes] = useState(new Set<BaitType>(AllBaits.map((b) => b.id)));
  const [fishTypes, setFishTypes] = useState(new Set<BigFishType>(AllFishes.map((f) => f.id)));

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
          setFishTypes(setUnion(fishTypes, baitFishes));
        }
      } else {
        // Remove fishes from the removed patches
        const baitFishes = AllFishes.filter(
          (f) => patchNamesSet.has(f.patch) || setIntersect(patchBaits, f.baits).size > 0
        ).map((f) => f.id);

        setFishTypes(setDifference(fishTypes, baitFishes));
      }
    },
    [fishTypes, baitTypes, patches]
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
        setFishTypes(setUnion(baitFishes, fishTypes));
      } else {
        setFishTypes(setIntersect(baitFishes, fishTypes));
      }
    },
    [baitTypes, fishTypes, patches]
  );

  const onSelectFish = useCallback(
    (fishes: BigFish[], isSelected: boolean) => {
      const fishIds = fishes.map((f) => f.id);
      if (isSelected) {
        setFishTypes(setUnion(fishTypes, fishIds));
      } else {
        setFishTypes(setDifference(fishTypes, fishIds));
      }
    },
    [fishTypes]
  );

  const contextValue = useMemo<ConfigurationContextModel>(
    () => ({
      patches,
      baits: baitTypes,
      fishes: fishTypes,
      completed: new Set(),

      onSelectPatch,
      onSelectFish,
      onSelectBait,
    }),
    [patches, baitTypes, fishTypes, onSelectPatch, onSelectFish, onSelectBait]
  );

  return (
    <ConfigurationContext.Provider value={contextValue}>{children}</ConfigurationContext.Provider>
  );
};

export default ConfigurationProvider;
