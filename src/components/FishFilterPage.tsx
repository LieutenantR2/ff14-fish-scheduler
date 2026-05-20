/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { LARGE_SCREEN_SIZE } from '../constants/UI.ts';
import FishExpansionFilter from './Filter/FishExpansionFilter.tsx';
import {
  ARR_PATCHES,
  EW_PATCHES,
  HW_PATCHES,
  SHB_PATCHES,
  STB_PATCHES,
} from '../data/PatchData.ts';
import {
  ARR_BAITS,
  ARR_BAIT_IDS,
  HW_BAITS,
  HW_BAIT_IDS,
  StbBaits,
  STB_BAIT_IDS,
  EW_BAIT_IDS,
  ShbBaits,
  SHB_BAIT_IDS,
  EwBaits,
} from '../data/BaitData.ts';
import {
  ARR_BIG_FISHES,
  ARR_BIG_FISH_IDS,
  BIG_FISH_BY_ID,
  HW_BIG_FISHES,
  HW_BIG_FISH_IDS,
  STB_BIG_FISHES,
  STB_BIG_FISH_IDS,
  SHB_BIG_FISHES,
  SHB_BIG_FISH_IDS,
  EW_BIG_FISHES,
  EW_BIG_FISH_IDS,
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

      '&.collapsed': {
        flexBasis: '100px',
        minWidth: '100px',
        width: '100px',
        flexGrow: 0,
      },
    },
  },

  [`@media (max-width: ${LARGE_SCREEN_SIZE})`]: {
    '.filters-container > div': {
      maxWidth: '500px',
    },
  },

  [`@media (max-width: 600px)`]: {
    '.filters-container > div': {
      minWidth: '250px',
    },
  },

  [`@media (max-width: 360px)`]: {
    padding: '5px',
  },
});

const FishFilterPage = () => {
  const { fishes, onCompleteFish } = useContext(ConfigurationContext);

  const handleSelectedToComplete = useCallback(() => {
    onCompleteFish([...fishes], true);
  }, [fishes, onCompleteFish]);

  const handleResetAllIncomplete = useCallback(() => {
    onCompleteFish([...Object.keys(BIG_FISH_BY_ID).map((f) => parseInt(f) as BigFishType)], false);
  }, [onCompleteFish]);

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
          abbreviatedHeading="ARR"
          patches={ARR_PATCHES}
          baits={ARR_BAITS}
          baitTypes={ARR_BAIT_IDS}
          fishes={ARR_BIG_FISHES}
          fishTypes={ARR_BIG_FISH_IDS}
        />
        <FishExpansionFilter
          heading="Heavensward"
          abbreviatedHeading="HW"
          patches={HW_PATCHES}
          baitTypes={HW_BAIT_IDS}
          baits={HW_BAITS}
          fishes={HW_BIG_FISHES}
          fishTypes={HW_BIG_FISH_IDS}
        />
        <FishExpansionFilter
          heading="Stormblood"
          abbreviatedHeading="STB"
          patches={STB_PATCHES}
          baitTypes={STB_BAIT_IDS}
          baits={StbBaits}
          fishes={STB_BIG_FISHES}
          fishTypes={STB_BIG_FISH_IDS}
        />
        <FishExpansionFilter
          heading="Shadowbringers"
          abbreviatedHeading="SHB"
          patches={SHB_PATCHES}
          baitTypes={SHB_BAIT_IDS}
          baits={ShbBaits}
          fishes={SHB_BIG_FISHES}
          fishTypes={SHB_BIG_FISH_IDS}
        />
        {false && (
          <FishExpansionFilter
            heading="Endwalker"
            abbreviatedHeading="EW"
            patches={EW_PATCHES}
            baitTypes={EW_BAIT_IDS}
            baits={EwBaits}
            fishes={EW_BIG_FISHES}
            fishTypes={EW_BIG_FISH_IDS}
          />
        )}
      </div>
    </div>
  );
};

export default FishFilterPage;
