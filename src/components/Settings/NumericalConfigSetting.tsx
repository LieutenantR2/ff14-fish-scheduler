/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Slider } from '@mui/material';
import { useMemo } from 'react';

const Styles = css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '30px',
  boxSizing: 'border-box',
  backgroundColor: '#333',
  alignItems: 'center',

  '> span': {
    boxSizing: 'border-box',
    padding: '0 30px 0 0',
    flexGrow: 1,
    flexBasis: '300px',

    '&.disabled': {
      color: '#777',
    },

    '&:not(.disabled) .setting-description': {
      color: 'rgba(255, 255, 255, 0.7)',
    },

    '&.MuiSlider-root': {
      marginTop: '25px',
      paddingBottom: '25px',
    },

    '.setting-label': {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '12px',
    },

    '.setting-description': {
      fontSize: '1rem',
    },
  },
});

type Mark = { label: string; value: number };
type NumericalConfigSettingProps = {
  settingLabel: string;
  settingDescription: TrustedHTML;
  defaultValue: number;
  marks: Mark[];
  onChange: (value: number) => void;
  isDisabled?: boolean;
};

function createMarkMapping(marks: Mark[]): Record<number, Mark> {
  const finiteMarks = marks.filter((m) => isFinite(m.value));
  const mapping = finiteMarks.reduce(
    (r, m) => {
      r[m.value] = m;
      return r;
    },
    {} as Record<number, Mark>
  );

  if (finiteMarks.length === marks.length) {
    return mapping;
  }

  const finiteValues = finiteMarks.map((m) => m.value);
  const lowest = Math.min(...finiteValues);
  const highest = Math.max(...finiteValues);
  const infiniteReplacement = highest + Math.round((highest - lowest) / finiteMarks.length);

  const infiniteMark = marks.filter((m) => !isFinite(m.value))[0];

  return {
    [infiniteReplacement]: infiniteMark,
    ...mapping,
  };
}

const NumericalConfigSetting = ({
  isDisabled,
  settingLabel,
  settingDescription,
  marks,
  defaultValue,
  onChange,
}: NumericalConfigSettingProps) => {
  const markMapping = useMemo(() => createMarkMapping(marks), [marks]);

  return (
    <div css={Styles}>
      <span className={'setting-text' + (isDisabled ? ' disabled' : '')}>
        <div className="setting-label">{settingLabel}</div>
        <div
          className="setting-description"
          dangerouslySetInnerHTML={{ __html: settingDescription }}
        />
      </span>
      <Slider
        disabled={!!isDisabled}
        aria-label="Custom marks"
        value={defaultValue}
        min={Math.min(...marks.map((m) => m.value))}
        max={Math.max(...Object.keys(markMapping).map((m) => parseInt(m)))}
        step={null}
        valueLabelDisplay="auto"
        marks={Object.keys(markMapping).map((m) => ({
          label: markMapping[parseInt(m)].label,
          value: parseInt(m),
        }))}
        onChange={(_, v) => onChange(markMapping[v as number].value)}
      />
    </div>
  );
};

export default NumericalConfigSetting;
