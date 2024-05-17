import { Interval } from './Interval.ts';

export async function createIntervals(): Promise<Interval[]> {
  return Promise.resolve([]);
}

export async function weightedIntervalScheduling(intervals: Interval[]): Promise<Interval[]> {
  const intervalsByStartTime = intervals.sort((a, b) => a.startTimestamp - b.startTimestamp);

  const memoized: Record<number, { intervals: Interval[]; weight: number }> = {
    [-1]: { intervals: [], weight: 0.0 },
  };

  intervalsByStartTime.forEach((currentInterval, i) => {
    const currentBestResult = memoized[i > 0 ? intervalsByStartTime[i - 1].endTimestamp : -1];
    let precedingInterval: Interval | undefined;
    for (let j = i; j > -1; j--) {
      if (intervalsByStartTime[j].endTimestamp <= currentInterval.startTimestamp) {
        precedingInterval = intervalsByStartTime[j];
        break;
      }
    }
    const { intervals: bestPrecedingIntervals, weight: bestPrecedingWeight } =
      memoized[precedingInterval?.endTimestamp ?? -1];
    const currentWeight = bestPrecedingWeight + currentInterval.weight;

    memoized[currentInterval.endTimestamp] =
      currentWeight > currentBestResult.weight
        ? {
            intervals: [...bestPrecedingIntervals, currentInterval],
            weight: currentWeight,
          }
        : currentBestResult;
  });

  return Promise.resolve(Object.values(memoized).sort((a, b) => b.weight - a.weight)[0].intervals);
}
