/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import { Interval } from './Interval.ts';

const Styles = css({
  flexGrow: 1,
  maxHeight: '200px',
  display: 'flex',
  border: '1px dotted #aaa',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  padding: '2px',
  boxSizing: 'border-box',

  '&.active': {
    backgroundColor: '#526D82',
    border: '1px solid #9DB2BF',
    color: 'rgba(255, 255, 255, 0.87)',
    textShadow: '0px 0px 1px white;',
  },

  '&.disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    border: '1px solid #777',
    color: '#777',
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
  endTimestamp: number,
  timelineDurationMs: number,
  timelineBufferMs: number
) {
  const leftEnd = Math.max(startTimestamp, new Date().getTime() - timelineBufferMs);
  const widthMs = endTimestamp - leftEnd;
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
  const ref = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState<React.CSSProperties>(
    calculateOffset(interval.startTimestamp, timelineDurationMs, timelineBufferMs)
  );
  const [segmentWidth, setSegmentWidth] = useState<React.CSSProperties>(
    calculateWidth(
      interval.startTimestamp,
      interval.endTimestamp,
      timelineDurationMs,
      timelineBufferMs
    )
  );
  const [isActive, setIsActive] = useState(
    interval.startTimestamp <= new Date().getTime() && interval.endTimestamp > new Date().getTime()
  );
  const [isDisabled, setisDisabled] = useState(interval.endTimestamp <= new Date().getTime());

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView(true);
    }
  }, [isActive, ref]);

  useEffect(() => {
    setOffset(calculateOffset(interval.startTimestamp, timelineDurationMs, timelineBufferMs));
    setSegmentWidth(
      calculateWidth(
        interval.startTimestamp,
        interval.endTimestamp,
        timelineDurationMs,
        timelineBufferMs
      )
    );
    const intvl = setInterval(() => {
      setOffset(calculateOffset(interval.startTimestamp, timelineDurationMs, timelineBufferMs));
      setSegmentWidth(
        calculateWidth(
          interval.startTimestamp,
          interval.endTimestamp,
          timelineDurationMs,
          timelineBufferMs
        )
      );
      setIsActive(
        interval.startTimestamp <= new Date().getTime() &&
          interval.endTimestamp > new Date().getTime()
      );
      setisDisabled(interval.endTimestamp <= new Date().getTime());
    }, 1000);
    return () => clearInterval(intvl);
  }, [interval, timelineBufferMs, timelineDurationMs]);

  return (
    <div
      css={Styles}
      style={{ ...offset, ...segmentWidth }}
      className={(isActive ? 'active' : '') + (isDisabled ? ' disabled' : '')}
    >
      <div ref={ref}>
        <div className={`icon fish-icon fish-icon-${interval.fish}`} />
        <span>
          {new Date(interval.startTimestamp)
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
