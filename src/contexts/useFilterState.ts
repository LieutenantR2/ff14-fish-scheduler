import { BaitType } from '../enums/BaitType.ts';
import { BigFishType } from '../enums/BigFishType.ts';
import { Dispatch, SetStateAction, useState } from 'react';
import { setDifference, setIntersect, setUnion } from '../utils.ts';
import { BAIT_DATA } from '../data/BaitData.ts';
import { ALL_BIG_FISHES } from '../data/BigFishData.ts';

export type FilterProps = {
  patches: Set<string>;
  baits: Set<BaitType>;
  fishes: Set<BigFishType>;
  completed: Set<BigFishType>;
};

export function useFilterState(
  initialState: FilterProps
): [FilterProps, Dispatch<SetStateAction<FilterProps>>] {
  const [filters, setFilters] = useState(initialState);

  const setPropagatedFilters = (newState: SetStateAction<FilterProps>) => {
    setFilters((prevState) => {
      let expectedNewState: FilterProps;
      if (typeof newState === 'function') {
        expectedNewState = newState(prevState);
      } else {
        expectedNewState = newState;
      }

      // Collect all changed fields
      const updatedProperties: Partial<FilterProps> = {};

      // Completed changes
      const addedCompleted = setDifference(expectedNewState.completed, prevState.completed);
      const removedCompleted = setDifference(prevState.completed, expectedNewState.completed);
      if (addedCompleted.size || removedCompleted.size) {
        updatedProperties.completed = expectedNewState.completed;
      }

      // Patch changes
      const addedPatches = setDifference(expectedNewState.patches, prevState.patches);
      const removedPatches = setDifference(prevState.patches, expectedNewState.patches);
      if (addedPatches.size || removedPatches.size) {
        updatedProperties.patches = expectedNewState.patches;
      }

      // Bait changes
      const addedBaits = [
        // Baits added directly
        ...setDifference(expectedNewState.baits, prevState.baits),
        // Baits added via Patch
        ...[...addedPatches]
          .map((p) => BAIT_DATA[p] ?? [])
          .reduce((a, b) => [...a, ...b], [])
          .map((b) => b.id),
      ];
      const removedBaits = [
        // Baits removed directly
        ...setDifference(prevState.baits, expectedNewState.baits),
        // Baits removed via Patch
        ...[...removedPatches]
          .map((p) => BAIT_DATA[p] ?? [])
          .reduce((a, b) => [...a, ...b], [])
          .map((b) => b.id),
      ];
      if (addedBaits.length || removedBaits.length) {
        updatedProperties.baits = setUnion(
          setDifference(prevState.baits ?? [], removedBaits),
          addedBaits
        );
      }

      // Fish Changes
      const addedFishes = [
        // Fishes added directly
        ...setDifference(expectedNewState.fishes, prevState.fishes),
        // Fishes added via Patch or Baits
        ...ALL_BIG_FISHES.filter((f) => {
          const isAddedWithPatch =
            addedPatches.has(f.patch) &&
            setIntersect(prevState.baits, f.baits).size === f.baits.length;
          const isAddedWithBaits =
            (updatedProperties.patches ?? expectedNewState.patches).has(f.patch) &&
            setIntersect(addedBaits, f.baits).size > 0 &&
            setIntersect(updatedProperties.baits ?? expectedNewState.baits, f.baits).size ===
              f.baits.length;
          return (
            !(updatedProperties.completed ?? expectedNewState.completed).has(f.id) &&
            (isAddedWithPatch || isAddedWithBaits)
          );
        }).map((f) => f.id),
      ];
      const removedFishes = [
        // Fishes removed directly
        ...setDifference(prevState.fishes, expectedNewState.fishes),
        // Fishes removed via Completion
        ...(updatedProperties.completed ?? expectedNewState.completed),
        // Fishes removed via Patch or Baits
        ...ALL_BIG_FISHES.filter((f) => {
          const isRemovedWithPatch = removedPatches.has(f.patch);
          const isRemovedWithBaits =
            setIntersect(removedBaits, f.baits).size > 0 &&
            setIntersect(updatedProperties.baits ?? expectedNewState.baits, f.baits).size !==
              f.baits.length;
          return (
            !(updatedProperties.completed ?? expectedNewState.completed).has(f.id) &&
            (isRemovedWithPatch || isRemovedWithBaits)
          );
        }).map((f) => f.id),
      ];
      if (addedFishes.length || removedFishes.length) {
        updatedProperties.fishes = setUnion(
          setDifference(prevState.fishes, removedFishes),
          addedFishes
        );
      }

      // Update internal state
      return {
        ...prevState,
        ...updatedProperties,
      };
    });
  };
  return [filters, setPropagatedFilters];
}
