/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TimelineSegment from './TimelineSegment.tsx';
import { Interval } from './Interval.ts';
import { useEffect, useState } from 'react';

const Styles = css({
  boxSizing: 'border-box',
  width: '100%',
  position: 'relative',
  minHeight: '300px',
  maxHeight: '40%',
  display: 'flex',

  '.segment-window': {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: '1px solid white',
    padding: '5px',
    overflowX: 'hidden',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: '2px',
    backgroundColor: 'rgb(89,155,71)',
  },
});

type ScheduleTimelineProps = {
  timelineDurationMs: number;
  schedule: Interval[];
};

const maxRows = 20;

const ScheduleTimeline = ({ schedule, timelineDurationMs }: ScheduleTimelineProps) => {
  const [computeSchedule, setComputeSchedule] = useState(false);
  const [visibleSegments, setVisibleSegments] = useState<Interval[]>([]);
  const [timelineBufferMs, setTimelineBufferMs] = useState(timelineDurationMs / 2);

  useEffect(() => {
    setTimelineBufferMs(timelineDurationMs / 2);
  }, [timelineDurationMs]);

  useEffect(() => {
    const now = new Date().getTime();
    let s = -1,
      e = -1;
    for (const segment of schedule) {
      const i = schedule.indexOf(segment);
      if (
        (segment.startTimestamp >= now - timelineBufferMs &&
          segment.startTimestamp <= now + timelineBufferMs) ||
        (segment.endTimestamp >= now - timelineBufferMs &&
          segment.endTimestamp <= now + timelineBufferMs) ||
        (segment.startTimestamp <= now - timelineBufferMs &&
          segment.endTimestamp >= now + timelineBufferMs)
      ) {
        if (s === -1) {
          s = i;
        }
        e = i;
      } else if (e !== -1) {
        break;
      }
    }
    const foundSegments = schedule.slice(s, Math.min(s + maxRows, e + 1));
    setVisibleSegments(foundSegments);

    if (foundSegments.length) {
      // Conditions for re-evaluation of visible segments:
      // 1. First segment is done, and can be removed
      const firstSegmentEnd =
        foundSegments[0].endTimestamp - new Date().getTime() + timelineBufferMs;
      // 2. Last segment is fully visible and subsequent one can be loaded
      const lastSegmentEnd =
        foundSegments[foundSegments.length - 1].endTimestamp -
        new Date().getTime() -
        timelineBufferMs;
      // 3. First future segment not visible is entering frame (if gap from last segment)
      const futureSegmentStart =
        e + 1 < schedule.length
          ? schedule[e + 1].startTimestamp - new Date().getTime() - timelineBufferMs
          : -1;

      const nextUpdateTime = Math.min(
        ...[firstSegmentEnd, lastSegmentEnd, futureSegmentStart].filter((t) => t >= 0)
      );
      const timeout = setTimeout(() => {
        setComputeSchedule(!computeSchedule);
      }, nextUpdateTime);
      return () => clearTimeout(timeout);
    }
  }, [timelineDurationMs, schedule, computeSchedule, timelineBufferMs]);

  return (
    <div css={Styles}>
      <div className="segment-window">
        {visibleSegments.map((s, i) => (
          <TimelineSegment
            key={`${s.fish}-${i}`}
            timelineDurationMs={timelineDurationMs}
            timelineBufferMs={timelineBufferMs}
            interval={s}
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleTimeline;
