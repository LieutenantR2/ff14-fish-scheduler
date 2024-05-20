/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Interval } from './Interval.ts';
import { ConfigurationContext } from '../../contexts/ConfigurationContext.tsx';

const Styles = css({
  flexGrow: 1,
  maxHeight: '200px',
  display: 'flex',
  border: '1px dotted #aaa',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  padding: '2px',
  boxSizing: 'border-box',

  '&.active:not(.completed)': {
    backgroundColor: '#526D82',
    border: '1px solid #9DB2BF',
    color: 'rgba(255, 255, 255, 0.87)',
    textShadow: '0px 0px 1px white;',
  },

  '&.disabled:not(.completed)': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    border: '1px solid #777',
    color: '#777',
    textShadow: 'none',
  },

  '&.completed': {
    backgroundColor: '#2e3f27',
    border: '1px solid #6a8f63',
    color: '#6a8f63',
    textShadow: 'none',
  },

  [`@media (max-width: 600px)`]: {
    '.fish-icon': {
      transform: 'scale(0.85)',
      transformOrigin: 'center',
    },
  },
});

type TimelineSegmentProps = {
  timelineDurationMs: number;
  timelineBufferMs: number;
  interval: Interval;
};

function calculateOffset(
  startTimestamp: number,
  timelineDurationMs: number,
  timelineBufferMs: number
): React.CSSProperties {
  const leftEnd = Math.max(startTimestamp, new Date().getTime() - timelineBufferMs);
  const offsetMs = leftEnd - new Date().getTime() + timelineBufferMs;
  const offsetProportion = offsetMs / timelineDurationMs;
  return {
    marginLeft: `${(offsetProportion * 100).toFixed(1)}%`,
  };
}

function calculateWidth(
  startTimestamp: number,
  fishEndTimestamp: number,
  timelineDurationMs: number,
  timelineBufferMs: number
) {
  const leftEnd = Math.max(startTimestamp, new Date().getTime() - timelineBufferMs);
  const widthMs = fishEndTimestamp - leftEnd;
  const widthProportion = widthMs / timelineDurationMs;
  return {
    width: `${(widthProportion * 100).toFixed(1)}%`,
  };
}

const TimelineSegment = ({
  timelineDurationMs,
  timelineBufferMs,
  interval,
}: TimelineSegmentProps) => {
  const { completed } = useContext(ConfigurationContext);
  const ref = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState<React.CSSProperties>(
    calculateOffset(interval.fishStartTimestamp, timelineDurationMs, timelineBufferMs)
  );
  const [segmentWidth, setSegmentWidth] = useState<React.CSSProperties>(
    calculateWidth(
      interval.fishStartTimestamp,
      interval.fishEndTimestamp,
      timelineDurationMs,
      timelineBufferMs
    )
  );
  const [isActive, setIsActive] = useState(
    interval.fishStartTimestamp <= new Date().getTime() && interval.fishEndTimestamp > new Date().getTime()
  );
  const [isDisabled, setisDisabled] = useState(interval.fishEndTimestamp <= new Date().getTime());

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({block: "center", inline: "nearest"});
    }
  }, [isActive, ref]);

  useEffect(() => {
    setOffset(calculateOffset(interval.fishStartTimestamp, timelineDurationMs, timelineBufferMs));
    setSegmentWidth(
      calculateWidth(
        interval.fishStartTimestamp,
        interval.fishEndTimestamp,
        timelineDurationMs,
        timelineBufferMs
      )
    );
    const intvl = setInterval(() => {
      setOffset(calculateOffset(interval.fishStartTimestamp, timelineDurationMs, timelineBufferMs));
      setSegmentWidth(
        calculateWidth(
          interval.fishStartTimestamp,
          interval.fishEndTimestamp,
          timelineDurationMs,
          timelineBufferMs
        )
      );
      setIsActive(
        interval.fishStartTimestamp <= new Date().getTime() &&
          interval.fishEndTimestamp > new Date().getTime()
      );
      setisDisabled(interval.fishEndTimestamp <= new Date().getTime());
    }, 1000);
    return () => clearInterval(intvl);
  }, [interval, timelineBufferMs, timelineDurationMs]);

  return (
    <div
      css={Styles}
      style={{ ...offset, ...segmentWidth }}
      className={
        (isActive ? 'active' : '') +
        (isDisabled ? ' disabled' : '') +
        (completed.has(interval.fish) ? ' completed' : '')
      }
    >
      <div ref={ref}>
        <div className={`icon fish-icon fish-icon-${interval.fish}`} />
        <span>
          {new Date(interval.fishStartTimestamp)
            .toLocaleTimeString(navigator.language, {
              hour: 'numeric',
              minute: '2-digit',
              second: '2-digit',
            })

            .replace(/[ap]\.?m\.?/i, '')
            .trim()}
        </span>
      </div>
    </div>
  );
};

export default TimelineSegment;
