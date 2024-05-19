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
  BigFishesById,
  HwFishes,
  HwFishTypes,
  StbFishes,
  StbFishTypes,
} from '../data/BigFishData.ts';
import TextButton from './GenericUI/TextButton.tsx';
import { useCallback, useContext } from 'react';
import { ConfigurationContext } from '../contexts/ConfigurationContext.tsx';
import { BigFishType } from '../enums/BigFishType.ts';

const Styles = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '15px',

  '.filters-buttons': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: '12px',
    boxSizing: 'border-box',

    '.text-button': {
      margin: '0 5px',
      textAlign: 'center',

      '&.complete': {
        backgroundColor: '#6a8f63',
      },

      '&.reset': {
        backgroundColor: '#8d3030',
      },
    },
  },

  '.filters-container': {
    width: '100%',
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
  },
});

const FishFilterPage = () => {
  const { fishes, onCompleteFish } = useContext(ConfigurationContext);

  const handleSelectedToComplete = useCallback(() => {
    onCompleteFish([...fishes], true);
  }, [fishes, onCompleteFish]);

  const handleResetAllIncomplete = useCallback(() => {
    onCompleteFish([...Object.keys(BigFishesById).map((f) => parseInt(f) as BigFishType)], false);
  }, [fishes, onCompleteFish]);

  return (
    <div css={Styles}>
      <div className="filters-buttons">
        <TextButton
          classNames="complete"
          isDisabled={false}
          buttonText="Mark Selected as Complete"
          onSubmit={() => handleSelectedToComplete()}
        />
        <TextButton
          classNames="reset"
          isDisabled={false}
          buttonText="Reset All as Incomplete"
          onSubmit={() => handleResetAllIncomplete()}
        />
      </div>
      <div className="filters-container">
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
    </div>
  );
};

export default FishFilterPage;
