/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Interval } from './Interval.ts';
import { BigFishesById } from '../../data/BigFishData.ts';
import { useEffect, useMemo, useRef, useState } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { WeathersById } from '../../data/WeatherData.ts';

import { TableRowStyles } from './TableRowStyles.tsx';

const Styles = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: '0.9rem',

  '&.active': {
    backgroundColor: '#526D82 !important',
    border: '1px solid #9DB2BF',
    color: 'rgba(255, 255, 255, 0.87)',
    textShadow: '0px 0px 1px white;',
  },

  '&.disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
    color: '#777',
    textShadow: 'none',
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

function convertEztTimeToString(time: number): string {
  const remainder = time - Math.floor(time);
  if (remainder <= 0) {
    return `${time}`;
  }
  const minutes = Math.round(remainder * 60);
  return `${Math.floor(time)}:${minutes.toString().padStart(2, '0')}`;
}

type TableRowProps = {
  interval: Interval;
};

const TableRow = ({ interval }: TableRowProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const fishProperties = useMemo(() => BigFishesById[interval.fish], [interval]);

  const [isDisabled, setIsDisabled] = useState(interval.endTimestamp <= new Date().getTime());
  const [isActive, setIsActive] = useState(
    interval.startTimestamp <= new Date().getTime() && interval.endTimestamp > new Date().getTime()
  );

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView(true);
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

  return (
    <div
      ref={ref}
      className={'table-row' + (isActive ? ' active' : '') + (isDisabled ? ' disabled' : '')}
      css={[TableRowStyles, Styles]}
    >
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
      <div className="window-ezt-time">
        {fishProperties.times?.length ? (
          <>
            <span className="start-time">
              {convertEztTimeToString(fishProperties.times[0].start)}
            </span>
            <span className="time-sep">-</span>
            <span className="end-time">{convertEztTimeToString(fishProperties.times[0].end)}</span>
          </>
        ) : (
          <>
            <span className="start-time" />
            <span className="time-sep">-</span>
            <span className="end-time" />
          </>
        )}
      </div>
      {!!fishProperties.weathers?.length && (
        <div className="window-weather">
          {fishProperties.weathers.map((w) => (
            <div
              key={w}
              className={`icon weather-icon weather-icon-${w}`}
              title={WeathersById[w]}
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
                title={WeathersById[w]}
              />
            ))}
          </span>
          <ArrowRightAltIcon fontSize="medium" />
          <span>
            {fishProperties.weatherTransitions.to.map((w) => (
              <div
                key={`to-${w}`}
                className={`icon weather-icon weather-icon-${w}`}
                title={WeathersById[w]}
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
