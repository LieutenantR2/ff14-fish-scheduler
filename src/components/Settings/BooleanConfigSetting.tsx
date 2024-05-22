/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Switch } from '@mui/material';

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

    '&.switch-wrapper': {
      display: 'flex',
      justifyContent: 'start',
      marginTop: '25px',
    },

    '&.disabled': {
      color: '#777',
    },

    '&:not(.disabled) .setting-description': {
      color: 'rgba(255, 255, 255, 0.7)',
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

type BooleanConfigSettingProps = {
  settingLabel: string;
  settingDescription: TrustedHTML;
  checked: boolean;
  onChange: (value: boolean) => void;
  isDisabled?: boolean;
};

const BooleanConfigSetting = ({
  isDisabled,
  settingLabel,
  settingDescription,
  checked,
  onChange,
}: BooleanConfigSettingProps) => {
  return (
    <div css={Styles}>
      <span className={'setting-text' + (isDisabled ? ' disabled' : '')}>
        <div className="setting-label">{settingLabel}</div>
        <div
          className="setting-description"
          dangerouslySetInnerHTML={{ __html: settingDescription }}
        />
      </span>
      <span className="switch-wrapper">
        <Switch
          checked={checked}
          onChange={(_, v) => onChange(v)}
          inputProps={{ 'aria-label': 'controlled' }}
          disabled={isDisabled}
        />
      </span>
    </div>
  );
};

export default BooleanConfigSetting;
