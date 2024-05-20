/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import NumericalConfigSetting from './Settings/NumericalConfigSetting.tsx';
import { useContext } from 'react';
import { ConfigurationContext } from '../contexts/ConfigurationContext.tsx';

const Styles = css({
  width: '100%',
  padding: '25px',
  display: 'flex',

  '.value-settings': {
    flexDirection: 'column',
    maxWidth: '1200px',
    overflowX: 'hidden',
    overflowY: 'auto',

    '.MuiSlider-root': {
      color: '#526D82',

      '.MuiSlider-markLabel': {
        color: 'rgba(255, 255, 255, 0.87)',
      },

      '&.Mui-disabled': {
        color: '#777',

        '.MuiSlider-markLabel': {
          color: '#777',
        },
      },
    },
  },
});

const SchedulerSettingsPage = () => {
  const {
    scheduleLookaheadMonths,
    setScheduleLookaheadMonths,
    scheduleDurationHours,
    setScheduleDurationHours,
    minimumRemainingWindowSeconds,
    setMinimumRemainingWindowSeconds,
    travelTimeSeconds,
    setTravelTimeSeconds,
    stacksPrepTimeSeconds,
    setStacksPrepTimeSeconds,
    moochPrepTimeSeconds,
    setMoochPrepTimeSeconds,
  } = useContext(ConfigurationContext);

  return (
    <div css={Styles}>
      <div className="value-settings">
        <NumericalConfigSetting
          settingLabel="Lookahead Prioritization"
          settingDescription="The number of <strong>months</strong> of future data to look at when deciding which fishes have less frequent windows."
          marks={[
            { label: '1', value: 1 },
            { label: '3', value: 3 },
            { label: '6', value: 6 },
            { label: '12', value: 12 },
            { label: '18', value: 18 },
            { label: '24', value: 24 },
          ]}
          defaultValue={scheduleLookaheadMonths}
          onChange={(v) => setScheduleLookaheadMonths(v)}
        />
        <NumericalConfigSetting
          settingLabel="Schedule Duration"
          settingDescription="The number of upcoming <strong>hours</strong> to plan for fish windows."
          marks={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '6', value: 6 },
            { label: '8', value: 8 },
            { label: '10', value: 10 },
            { label: '12', value: 12 },
            { label: '18', value: 18 },
            { label: '24', value: 24 },
          ]}
          defaultValue={scheduleDurationHours}
          onChange={(v) => setScheduleDurationHours(v)}
        />
        <NumericalConfigSetting
          settingLabel="Minimum Remaining Time"
          settingDescription="Minimum amount of <strong>minutes</strong> left on a window in order for it to be scheduled as the first window.<br/><br/><em>A value of Full will never schedule windows that are currently active.</em>"
          marks={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '6', value: 6 },
            { label: '9', value: 9 },
            { label: '12', value: 12 },
            { label: '18', value: 18 },
            { label: '24', value: 24 },
            { label: 'Full', value: Infinity },
          ]}
          defaultValue={minimumRemainingWindowSeconds / 60}
          onChange={(v) => setMinimumRemainingWindowSeconds(v * 60)}
        />
        <NumericalConfigSetting
          settingLabel="Travel Time"
          settingDescription="The number of <strong>seconds</strong> allocated for travelling to a fishing spot between windows. This does not need to account for any prep time (see below).<br/><br/><em>A value of 0 will schedule back-to-back windows.</em>"
          marks={[
            { label: '0', value: 0 },
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '30', value: 30 },
            { label: '60', value: 60 },
            { label: '90', value: 90 },
            { label: '120', value: 120 },
            { label: '150', value: 150 },
            { label: '180', value: 180 },
          ]}
          defaultValue={travelTimeSeconds}
          onChange={(v) => setTravelTimeSeconds(v)}
        />
        <NumericalConfigSetting
          settingLabel="Angler's Art Preparation [Coming Soon]"
          settingDescription="The number of <strong>minutes</strong> allocated for gathering 10 stacks of Angler's Art for certain fish windows.<br/><br/><em>A value of 0 will not include this prep step.</em>"
          marks={[
            { label: '0', value: 0 },
            { label: '1m', value: 1 },
            { label: '2m', value: 2 },
            { label: '3m', value: 3 },
            { label: '4m', value: 4 },
            { label: '5m', value: 5 },
            { label: '6m', value: 6 },
            { label: '7m', value: 7 },
            { label: '8m', value: 8 },
            { label: '9m', value: 9 },
            { label: '10m', value: 10 },
          ]}
          defaultValue={stacksPrepTimeSeconds / 60}
          onChange={(v) => setStacksPrepTimeSeconds(v * 60)}
          isDisabled={true}
        />
        <NumericalConfigSetting
          settingLabel="Pre-hooking Preparation [Coming Soon]"
          settingDescription="The number of <strong>minutes</strong> allocated for having a mooched fish pre-hooked before the window starts.<br/><br/><em>A value of 0 will not include this prep step.</em>"
          marks={[
            { label: '0', value: 0 },
            { label: '1m', value: 1 },
            { label: '2m', value: 2 },
            { label: '3m', value: 3 },
            { label: '4m', value: 4 },
            { label: '5m', value: 5 },
            { label: '6m', value: 6 },
            { label: '7m', value: 7 },
            { label: '8m', value: 8 },
            { label: '9m', value: 9 },
            { label: '10m', value: 10 },
          ]}
          defaultValue={moochPrepTimeSeconds / 60}
          onChange={(v) => setMoochPrepTimeSeconds(v * 60)}
          isDisabled={true}
        />
      </div>
    </div>
  );
};

export default SchedulerSettingsPage;
