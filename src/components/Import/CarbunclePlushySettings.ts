export type CarbunclePlushyFilterSettings = {
  completion: string;
  patch: number[];
  extra: string;
  hideAlwaysAvailable: boolean;
};

export type CarbunclePlushySettings = {
  filters: CarbunclePlushyFilterSettings;
  theme: string;
  completed: number[];
  pinned: number[];
  latestPatch: number;
};
