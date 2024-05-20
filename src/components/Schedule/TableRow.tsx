/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Interval } from './Interval.ts';
import { BIG_FISH_BY_ID } from '../../data/BigFishData.ts';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { WEATHER_BY_ID } from '../../data/WeatherData.ts';

import { TableRowStyles } from './TableRowStyles.tsx';
import { getEztTimeFromTimestamp } from '../../utils.ts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ConfigurationContext } from '../../contexts/ConfigurationContext.tsx';
import { BAIT_BY_ID } from '../../data/BaitData.ts';
import { BaitType } from '../../enums/BaitType.ts';
import { BigFishType } from '../../enums/BigFishType.ts';
import { NormalFishType } from '../../enums/NormalFishType.ts';
import { NORMAL_FISH_BY_ID } from '../../data/NormalFishData.ts';
import { FISHING_HOLE_BY_ID } from '../../data/FishingHoleData.ts';
import { LOCATION_BY_ID } from '../../data/LocationData.ts';

const Styles = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: '0.9rem',
  border: '1px solid rgba(0, 0, 0, 0)',

  '&.disabled:not(.completed)': {
    backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
    color: '#777',
    textShadow: 'none',
  },

  '&.active:not(.completed)': {
    backgroundColor: '#526D82 !important',
    border: '1px solid #9DB2BF',
    color: 'rgba(255, 255, 255, 0.87)',
    textShadow: '0px 0px 1px white;',
  },

  '&.completed': {
    backgroundColor: '#2e3f27 !important',
    color: '#6a8f63',
    textShadow: 'none',
  },

  '.checkbox': {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',

    '&:hover': {
      color: 'rgba(255, 255, 255, 0.87)',
    },

    '&:not(.completed):hover': {
      backgroundColor: '#6a8f63',
    },

    '&.completed:hover': {
      backgroundColor: '#8d3030',
    },
  },

  '.fish-location': {
    '> span': {
      padding: '2px',
    },
    '.area-name': {
      fontStyle: 'italic',
      fontSize: '0.7rem',
    },
  },

  '.window-ezt-time': {
    display: 'flex',
    flexDirection: 'row',

    '> span': {
      flexGrow: 0,
      margin: 0,
      padding: 0,
    },

    '.start-time': {
      flexBasis: '50px',
      textAlign: 'end',
    },

    '.end-time': {
      flexBasis: '50px',
      textAlign: 'start',
    },

    '.time-sep': {
      flexBasis: '10px',
      textAlign: 'center',
    },
  },

  '.window-weather': {
    '.weather-icon': {
      transform: 'scale(0.675)',
      transformOrigin: 'center',
      margin: '0 -5px',
    },

    '.MuiSvgIcon-root': {
      color: 'rgba(255, 255, 255, 0.6)',
    },

    '> span': {
      display: 'flex',
      flexDirection: 'row',
    },
  },
});

function convertEztTimeToString({ h, m }: { h: number; m: number }): string {
  if (m <= 0) {
    return `${h}`;
  }
  return `${h}:${m.toString().padStart(2, '0')}`;
}

type TableRowProps = {
  interval: Interval;
};

const TableRow = ({ interval }: TableRowProps) => {
  const { onCompleteFish, completed } = useContext(ConfigurationContext);
  const ref = useRef<HTMLDivElement>(null);

  const fishProperties = useMemo(() => BIG_FISH_BY_ID[interval.fish], [interval]);
  const fishingHoleProperties = useMemo(
    () => FISHING_HOLE_BY_ID[fishProperties.location],
    [fishProperties]
  );
  const fishStartTimeEzt = useMemo(
    () => convertEztTimeToString(getEztTimeFromTimestamp(interval.fishStartTimeStamp)),
    [interval]
  );
  const fishEndTimeEzt = useMemo(
    () => convertEztTimeToString(getEztTimeFromTimestamp(interval.fishEndTimeStamp)),
    [interval]
  );

  const [isCompleted, setIsCompleted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(interval.endTimestamp <= new Date().getTime());
  const [isActive, setIsActive] = useState(
    interval.startTimestamp <= new Date().getTime() && interval.endTimestamp > new Date().getTime()
  );

  useEffect(() => {
    setIsCompleted(completed.has(interval.fish));
  }, [interval, completed]);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ block: 'center', inline: 'nearest' });
    }
  }, [isActive, ref]);

  useEffect(() => {
    const windowPassed = interval.endTimestamp <= new Date().getTime();
    setIsDisabled(windowPassed);
    setIsActive(
      interval.startTimestamp <= new Date().getTime() &&
        interval.endTimestamp > new Date().getTime()
    );

    if (!windowPassed) {
      const intvl = setInterval(() => {
        setIsDisabled(interval.endTimestamp <= new Date().getTime());
        setIsActive(
          interval.startTimestamp <= new Date().getTime() &&
            interval.endTimestamp > new Date().getTime()
        );
      }, 1000);
      return () => clearInterval(intvl);
    }
  }, [interval]);

  const handleChecked = useCallback(
    (checked: boolean) => {
      onCompleteFish([interval.fish], checked);
      setIsCompleted(checked);
    },
    [interval, onCompleteFish]
  );

  return (
    <div
      ref={ref}
      className={
        'table-row' +
        (isActive ? ' active' : '') +
        (isDisabled ? ' disabled' : '') +
        (isCompleted ? ' completed' : '')
      }
      css={[TableRowStyles, Styles]}
    >
      <div
        className={'checkbox' + (isCompleted ? ' completed' : '')}
        onClick={() => handleChecked(!isCompleted)}
        title={isCompleted ? 'Remove Completion' : 'Mark Completed'}
      >
        <CheckCircleIcon />
      </div>
      <div className="window-local-time">
        <div className="local-start-time">
          {new Date(interval.startTimestamp).toLocaleTimeString(navigator.language, {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
          })}
        </div>
        <div className="local-end-time">
          {new Date(interval.endTimestamp).toLocaleTimeString(navigator.language, {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
          })}
        </div>
      </div>
      <div
        className={`icon-col icon fish-icon fish-icon-${interval.fish}`}
        title={fishProperties.name}
      />
      <div className="fish-name">{fishProperties.name}</div>
      <div className="fish-location">
        <span className="hole-name">{fishingHoleProperties.name}</span>
        <span className="area-name">{LOCATION_BY_ID[fishingHoleProperties.location]}</span>
      </div>
      <div className="fishing-sequence">
        {fishProperties.fishSequence.map((s, i) => (
          <>
            {i !== 0 && <ArrowRightAltIcon fontSize="medium" />}
            {s in BaitType && (
              <div
                key={`from-${i}`}
                className={`icon bait-icon bait-icon-${s}`}
                title={BAIT_BY_ID[s as BaitType].name}
              />
            )}
            {s in BigFishType && (
              <div
                key={`from-${i}`}
                className={`icon fish-icon fish-icon-${s}`}
                title={BIG_FISH_BY_ID[s as BigFishType].name}
              />
            )}
            {s in NormalFishType && (
              <div
                key={`from-${i}`}
                className={`icon fish-icon fish-icon-${s}`}
                title={NORMAL_FISH_BY_ID[s as NormalFishType].name}
              />
            )}
          </>
        ))}
      </div>
      <div className="window-ezt-time">
        <span className="start-time">{fishStartTimeEzt}</span>
        <span className="time-sep">-</span>
        <span className="end-time">{fishEndTimeEzt === '0' ? '24' : fishEndTimeEzt}</span>
      </div>
      {!!fishProperties.weathers?.length && (
        <div className="window-weather">
          {fishProperties.weathers.map((w) => (
            <div
              key={w}
              className={`icon weather-icon weather-icon-${w}`}
              title={WEATHER_BY_ID[w]}
            />
          ))}
        </div>
      )}
      {!!fishProperties.weatherTransitions && (
        <div className="window-weather">
          <span>
            {fishProperties.weatherTransitions.from.map((w) => (
              <div
                key={`from-${w}`}
                className={`icon weather-icon weather-icon-${w}`}
                title={WEATHER_BY_ID[w]}
              />
            ))}
          </span>
          <ArrowRightAltIcon fontSize="medium" />
          <span>
            {fishProperties.weatherTransitions.to.map((w) => (
              <div
                key={`to-${w}`}
                className={`icon weather-icon weather-icon-${w}`}
                title={WEATHER_BY_ID[w]}
              />
            ))}
          </span>
        </div>
      )}
      {!fishProperties.weatherTransitions && !fishProperties.weathers?.length && (
        <div className="window-weather" />
      )}
    </div>
  );
};

export default TableRow;
