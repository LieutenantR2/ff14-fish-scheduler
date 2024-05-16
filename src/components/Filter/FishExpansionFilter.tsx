/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhishingIcon from '@mui/icons-material/Phishing';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import SetMealIcon from '@mui/icons-material/SetMeal';
import PatchOption from './PatchOption.tsx';
import { ConfigurationContext } from '../../contexts/ConfigurationContext.tsx';
import { alphabeticalSort, setIntersect } from '../../utils.ts';
import { Bait } from '../../types/Bait.ts';
import CheckableOption from './CheckableOption.tsx';
import { BigFish } from '../../types/BigFish.ts';
import { BaitType } from '../../enums/BaitType.ts';
import { BigFishType } from '../../enums/BigFishType.ts';

const Styles = css({
  boxShadow: '0 0 3px 3px rgba(0, 0, 0, 0.1)',
  display: 'flex',

  '&.collapsed': {
    maxWidth: 'unset',
    minWidth: 'unset',
    flexGrow: 'unset',
    flexBasis: 'unset',
    width: 'unset',
  },

  '.heading': {
    display: 'flex',
    justifyItems: 'center',
    cursor: 'pointer',
    backgroundColor: '#222',
    padding: '10px',
    flexShrink: 0,
    flexGrow: 0,
    userSelect: 'none',

    span: {
      margin: '0 8px',
    },
  },

  '.content.collapsible.collapsed,.section-content.collapsible.collapsed': {
    display: 'none',
  },

  '.content': {
    backgroundColor: '#555',
    padding: '10px',
    flexGrow: 1,

    '.section-label': {
      display: 'flex',
      userSelect: 'none',
      alignItems: 'center',

      '.clickable': {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      },

      '.MuiSvgIcon-root': {
        marginRight: '12px',
        flexGrow: 0,
        flexShrink: 0,
      },

      '.hint-text': {
        fontSize: '0.8rem',
        fontStyle: 'italic',
        marginLeft: '8px',
      },

      '& > span': {
        fontWeight: 600,
        flexGrow: 1,
      },

      '.link-button': {
        textDecoration: 'underline',
        margin: '0 14px',
        flexGrow: 0,
        flexShrink: 0,
        cursor: 'pointer',

        '&.disabled': {
          cursor: 'not-allowed',
          color: '#777',
          textDecoration: 'none',
        },
      },
    },

    '.section-content': {
      padding: '15px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
});

type FishExpansionFilterProps = {
  heading: string;
  patches: string[];
  baits: Record<string, Bait[]>;
  baitTypes: BaitType[];
  fishes: Record<string, BigFish[]>;
  fishTypes: BigFishType[];
};

const FishExpansionFilter = ({
  heading,
  patches,
  baits,
  baitTypes,
  fishes,
  fishTypes,
}: FishExpansionFilterProps) => {
  const {
    patches: configPatches,
    baits: configBaits,
    fishes: configFishes,
    completed: completedFishes,
    onSelectPatch,
    onSelectBait,
    onSelectFish,
  } = useContext(ConfigurationContext);

  const allBaits = useMemo<Bait[]>(
    () =>
      Object.values(baits)
        .reduce((a, b) => [...a, ...b])
        .sort(alphabeticalSort),
    [baits]
  );

  const allFishes = useMemo(
    () =>
      Object.values(fishes)
        .reduce((a, b) => [...a, ...b])
        .sort(alphabeticalSort),
    [fishes]
  );

  const [expansionCollapsed, setExpansionCollapsed] = useState(false);
  const [baitCollapsed, setBaitCollapsed] = useState(true);
  const [fishCollapsed, setFishCollapsed] = useState(false);
  const [baitCount, setBaitCount] = useState(configBaits.size);
  const [fishCount, setFishCount] = useState(configFishes.size);
  const [availableBaits, setAvailableBaits] = useState(
    allBaits.filter((b) => configPatches.has(b.patch))
  );
  const [availableFishes, setAvailableFishes] = useState(allFishes);

  useEffect(() => {
    setBaitCount(setIntersect(configBaits, baitTypes).size);
  }, [baitTypes, configBaits]);

  useEffect(() => {
    setFishCount(setIntersect(configFishes, fishTypes).size);
  }, [fishTypes, configFishes]);

  useEffect(() => {
    const baits = allBaits.filter((b) => configPatches.has(b.patch));
    setAvailableBaits(baits);
  }, [allBaits, configPatches]);

  useEffect(() => {
    const fishes = allFishes.filter(
      (f) =>
        configPatches.has(f.patch) &&
        setIntersect(configBaits, f.baits).size === f.baits.length &&
        !completedFishes.has(f.id)
    );
    setAvailableFishes(fishes);
  }, [allFishes, completedFishes, configBaits, configPatches]);

  return (
    <div css={Styles} className={expansionCollapsed ? 'collapsed' : ''}>
      <div className="heading" onClick={() => setExpansionCollapsed(!expansionCollapsed)}>
        {expansionCollapsed && <ExpandMoreIcon fontSize="medium" />}
        {!expansionCollapsed && <ExpandLessIcon fontSize="medium" />}
        <span>{heading}</span>
      </div>
      <div className={'content collapsible ' + (expansionCollapsed ? 'collapsed' : '')}>
        <div className="section-label">
          <Grid4x4Icon fontSize="small" />
          <span>Patches</span>
          <span className="link-button" onClick={() => onSelectPatch(patches, true)}>
            All
          </span>
          <span className="link-button" onClick={() => onSelectPatch(patches, false)}>
            None
          </span>
        </div>
        <div className="section-content">
          {patches.map((p) => (
            <PatchOption key={p} patchName={p} />
          ))}
        </div>

        <hr />

        <div className="section-label">
          <div className="clickable" onClick={() => setBaitCollapsed(!baitCollapsed)}>
            <PhishingIcon fontSize="small" />
            <span>Baits - {baitCount} selected</span>
            <span className="hint-text">(click to toggle {baitCollapsed ? 'show' : 'hide'})</span>
          </div>
          <span
            className={'link-button ' + (!availableBaits.length ? 'disabled' : '')}
            onClick={() => onSelectBait(availableBaits, true)}
          >
            All
          </span>
          <span className="link-button" onClick={() => onSelectBait(allBaits, false)}>
            None
          </span>
        </div>
        <div className={'section-content collapsible ' + (baitCollapsed ? 'collapsed' : '')}>
          {allBaits.map((b) => (
            <CheckableOption
              key={b.id}
              isIncluded={configBaits.has(b.id)}
              isDisabled={!configPatches.has(b.patch)}
              isCompleted={false}
              label={b.name}
              iconClass={`bait-icon bait-icon-${b.id}`}
              handleClick={(checked) => onSelectBait([b], checked)}
            />
          ))}
        </div>

        <hr />

        <div className="section-label">
          <div className="clickable" onClick={() => setFishCollapsed(!fishCollapsed)}>
            <SetMealIcon fontSize="small" />
            <span>Fishes - {fishCount} selected</span>
            <span className="hint-text">(click to toggle {fishCollapsed ? 'show' : 'hide'})</span>
          </div>
          <span
            className={'link-button ' + (!availableFishes.length ? 'disabled' : '')}
            onClick={() => onSelectFish(availableFishes, true)}
          >
            All
          </span>
          <span className="link-button" onClick={() => onSelectFish(allFishes, false)}>
            None
          </span>
        </div>
        <div className={'section-content collapsible ' + (fishCollapsed ? 'collapsed' : '')}>
          {allFishes.map((f) => (
            <CheckableOption
              key={f.id}
              isIncluded={configFishes.has(f.id)}
              isDisabled={
                !configPatches.has(f.patch) ||
                setIntersect(configBaits, f.baits).size !== f.baits.length
              }
              isCompleted={completedFishes.has(f.id)}
              label={f.name}
              iconClass={`fish-icon fish-icon-${f.id}`}
              handleClick={(checked) => onSelectFish([f], checked)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FishExpansionFilter;
