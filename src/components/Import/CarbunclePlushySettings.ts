export type CarbunclePlushyFilterSettings = {
  completion: string;
  patch: number[];
  extra: string;
  hideAlwaysAvailable: boolean;
};

export type CarbunclePlushySettings = {
  filters: CarbunclePlushyFilterSettings;
  upcomingWindowFormat: string;
  sortingType: string;
  theme: string;
  completed: number[];
  pinned: number[];
  latestPatch: number;
};
