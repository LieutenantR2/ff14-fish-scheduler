/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { LARGE_SCREEN_SIZE } from '../constants/UI.ts';
import FishExpansionFilter from './Filter/FishExpansionFilter.tsx';
import { ArrPatches, HwPatches, StbPatches } from '../data/PatchData.ts';
import {
  ArrBaits,
  ArrBaitTypes,
  HwBaits,
  HwBaitTypes,
  StbBaits,
  StbBaitTypes,
} from '../data/BaitData.ts';
import {
  ArrFishes,
  ArrFishTypes,
  HwFishes,
  HwFishTypes,
  StbFishes,
  StbFishTypes,
} from '../data/BigFishData.ts';

const Styles = css({
  width: '100%',
  padding: '15px',
  display: 'flex',
  justifyContent: 'start',
  flexWrap: 'wrap',
  overflowY: 'auto',
  alignItems: 'start',
  alignContent: 'start',

  '> div': {
    margin: '5px',
    minWidth: '400px',
    flexGrow: 1,
    flexBasis: '400px',
    display: 'flex',
    flexDirection: 'column',
  },

  [`@media (max-width: ${LARGE_SCREEN_SIZE})`]: {
    '> div': {
      maxWidth: '500px',
    },
  },

  [`@media (max-width: 600px)`]: {
    '> div': {
      minWidth: '250px',
    },
  },
});

const FishFilterPage = () => {
  return (
    <div css={Styles}>
      <FishExpansionFilter
        heading="ARR"
        patches={ArrPatches}
        baits={ArrBaits}
        baitTypes={ArrBaitTypes}
        fishes={ArrFishes}
        fishTypes={ArrFishTypes}
      />
      <FishExpansionFilter
        heading="Heavensward"
        patches={HwPatches}
        baitTypes={HwBaitTypes}
        baits={HwBaits}
        fishes={HwFishes}
        fishTypes={HwFishTypes}
      />
      <FishExpansionFilter
        heading="Stormblood"
        patches={StbPatches}
        baitTypes={StbBaitTypes}
        baits={StbBaits}
        fishes={StbFishes}
        fishTypes={StbFishTypes}
      />
    </div>
  );
};

export default FishFilterPage;
