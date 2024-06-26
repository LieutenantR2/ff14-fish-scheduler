import { Interval } from './Interval.ts';
import { BigFishType } from '../../enums/BigFishType.ts';
import { BIG_FISH_BY_ID } from '../../data/BigFishData.ts';

export async function getWindows(
  startDate: Date,
  endDate: Date,
  fishes?: Set<BigFishType>
): Promise<Record<BigFishType, { startMs: number; endMs: number }[]>> {
  const years = [...new Set([startDate.getFullYear(), endDate.getFullYear()])];

  const windowData = await Promise.all(
    years.map((year) =>
      fetch(`data/${year}.json?v=0.1.0`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => json as Record<string, number[][]>)
    )
  );

  const startTimestamp = Math.floor(startDate.getTime() / 1000);
  const endTimestamp = Math.floor(endDate.getTime() / 1000);

  return Promise.resolve(
    windowData.reduce(
      (r, d) => {
        Object.keys(d).forEach((f) => {
          const fishId = parseInt(f) as BigFishType;

          if (fishes && !fishes.has(fishId)) {
            return;
          }

          const fishWindows = d[f];
          if (!r[fishId]) {
            r[fishId] = [];
          }
          r[fishId] = [
            ...r[fishId],
            ...fishWindows
              .filter((w) => w[1] > startTimestamp && w[0] <= endTimestamp)
              .map((w) => ({ startMs: w[0] * 1000, endMs: w[1] * 1000 })),
          ];
        });
        return r;
      },
      {} as Record<BigFishType, { startMs: number; endMs: number }[]>
    )
  );
}

export async function createIntervals({
  lookaheadMonths,
  scheduledHours,
  minimumRemainingWindowSeconds,
  travelTimeSeconds,
  includedFishes,
  startTime,
}: {
  lookaheadMonths: number;
  scheduledHours: number;
  minimumRemainingWindowSeconds: number;
  travelTimeSeconds: number;
  includedFishes?: Set<BigFishType>;
  startTime?: Date;
}): Promise<Interval[]> {
  const dataStartDate = startTime ?? new Date();
  const scheduleStartTimestamp = dataStartDate.getTime();
  const dataEndDate = new Date(
    new Date(dataStartDate.getTime()).setMonth(dataStartDate.getMonth() + lookaheadMonths)
  );
  const scheduleEndDate = new Date(dataStartDate.getTime() + scheduledHours * 60 * 60 * 1000);
  const scheduleEndTimestamp = scheduleEndDate.getTime();

  const allWindows = await getWindows(dataStartDate, dataEndDate, includedFishes);
  const lookaheadDays = Math.round(
    (dataEndDate.getTime() - dataStartDate.getTime()) / 1000 / 60 / 60 / 24
  );

  const intervals = Object.keys(allWindows).reduce((r, f) => {
    const fishType = parseInt(f) as BigFishType;
    const fishWindow = allWindows[fishType];
    const weight = (lookaheadDays / fishWindow.length) ** 2 * BIG_FISH_BY_ID[fishType].difficulty;
    return [
      ...r,
      ...fishWindow
        .filter((w) => {
          return (
            w.startMs <= scheduleEndTimestamp &&
            (w.startMs >= scheduleStartTimestamp ||
              (isFinite(minimumRemainingWindowSeconds) &&
                w.endMs - new Date().getTime() >= minimumRemainingWindowSeconds * 1000))
          );
        })
        .map(
          (w) =>
            ({
              fish: fishType,
              weight: weight,
              startTimestamp: w.startMs - travelTimeSeconds * 1000,
              endTimestamp: w.endMs,
              travelStartTimestamp: w.startMs - travelTimeSeconds * 1000,
              travelEndTimestamp: w.startMs,
              fishStartTimestamp: w.startMs,
              fishEndTimestamp: w.endMs,
            }) as Interval
        ),
    ];
  }, [] as Interval[]);

  return Promise.resolve(intervals);
}

export async function weightedIntervalScheduling(intervals: Interval[]): Promise<Interval[]> {
  const intervalsByEnd = intervals.sort((a, b) => a.endTimestamp - b.endTimestamp);

  const memoized: Record<number, { intervals: Interval[]; weight: number }> = {
    [-1]: { intervals: [], weight: 0.0 },
  };

  intervalsByEnd.forEach((currentInterval, i) => {
    const currentBestResult = memoized[i > 0 ? intervalsByEnd[i - 1].endTimestamp : -1];
    let precedingInterval: Interval | undefined;
    for (let j = i; j > -1; j--) {
      if (intervalsByEnd[j].endTimestamp <= currentInterval.startTimestamp) {
        precedingInterval = intervalsByEnd[j];
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
