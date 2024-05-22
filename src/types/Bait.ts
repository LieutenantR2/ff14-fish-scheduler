import { BaitType } from '../enums/BaitType.ts';

export type Bait = {
  id: BaitType;
  name: string;
  level: number;
  patch: string;
  obtainMethod: 'gsm' | 'gil' | 'scrips';
  reusable: boolean;
};
