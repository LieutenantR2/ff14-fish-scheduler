/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCallback, useContext, useState } from 'react';
import './App.css';
import NavigationMenu from './components/NavigationMenu.tsx';
import FishFilterPage from './components/FishFilterPage.tsx';
import ImportConfigurationPage from './components/ImportConfigurationPage.tsx';
import TextButton from './components/GenericUI/TextButton.tsx';
import { createIntervals, weightedIntervalScheduling } from './components/Schedule/scheduler.ts';
import { Interval } from './components/Schedule/Interval.ts';
import ScheduleTimeline from './components/Schedule/ScheduleTimeline.tsx';
import { ConfigurationContext } from './contexts/ConfigurationContext.tsx';
import TextCheckboxButton from './components/GenericUI/TextCheckboxButton.tsx';
import ScheduleTable from './components/Schedule/ScheduleTable.tsx';

const Styles = css({
  boxSizing: 'border-box',
  marginLeft: '60px',
  padding: '8px',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  '.overlay': {
    zIndex: 5,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#444',
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',

    '&.hidden': {
      left: '-100vw',
    },
  },

  '.landing-page': {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    boxSizing: 'border-box',

    h1: {
      fontSize: '2rem',
      margin: '8px 0',
      textAlign: 'center',
      lineHeight: '2.5rem',
    },

    h2: {
      fontSize: '1.2rem',
      margin: '8px 0',
      fontStyle: 'italic',
      textAlign: 'center',
    },

    span: {
      margin: '8px 0 32px',
      textAlign: 'center',
    },
  },

  '.schedule-page': {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    '.header-section': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'start',
      flexGrow: 0,

      [`@media (max-width: 600px)`]: {
        h1: {
          fontSize: '1.3rem',
        },
      },

      [`@media (max-width: 360px)`]: {
        h1: {
          display: 'block',
          whiteSpace: 'nowrap',
          margin: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },

      '.header-buttons': {
        paddingLeft: '24px',
        display: 'flex',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        flexDirection: 'row',
        flexGrow: 0,
      },

      '> .text-button, span': {
        margin: '4px 12px',
        flexGrow: 0,
      },
    },

    '.timeline-timeframe': {
      display: 'flex',
      justifyContent: 'end',
      flexGrow: 0,

      '.text-button': {
        flexGrow: 0,
      },
    },
  },
});

function App() {
  const { scheduleLookaheadMonths, scheduleDurationHours, fishes } =
    useContext(ConfigurationContext);

  const [schedule, setSchedule] = useState<Interval[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [timelineDurationMinutes, setTimelineDurationMinutes] = useState(60);

  const handleOverlayChange = useCallback((page: string) => {
    setActiveOverlay(page === 'schedule' ? null : page);
  }, []);

  const handleGenerateSchedule = useCallback(async () => {
    setIsGenerating(true);
    const intervals = await createIntervals({
      lookaheadMonths: scheduleLookaheadMonths,
      scheduledHours: scheduleDurationHours,
      includedFishes: fishes,
    });
    const schedule = await weightedIntervalScheduling(intervals);
    setSchedule(schedule);
    setIsGenerating(false);
  }, [fishes, scheduleDurationHours, scheduleLookaheadMonths]);

  const handleTimeframeChange = useCallback((timeframe: number) => {
    setTimelineDurationMinutes(timeframe);
  }, []);

  return (
    <>
      <NavigationMenu onPageChange={handleOverlayChange} />
      <div className="content-container" css={Styles}>
        <div className={'overlay ' + (!activeOverlay ? 'hidden' : '')}>
          {activeOverlay === 'filter' && <FishFilterPage />}
          {activeOverlay === 'import' && <ImportConfigurationPage />}
        </div>
        {!schedule && (
          <div className="landing-page">
            <h2>Welcome to the</h2>
            <h1>FF14 Big Fish Scheduler (Beta)</h1>
            <span>Click Generate to begin your Big Fishing journey!</span>
            <TextButton
              isDisabled={isGenerating}
              buttonText="Generate"
              onSubmit={handleGenerateSchedule}
            />
            {isGenerating && <span>Generating schedule...</span>}
          </div>
        )}
        {!!schedule && (
          <div className="schedule-page">
            <div className="header-section">
              <h1>FF14 Big Fish Scheduler (Beta)</h1>
              <div className="header-buttons">
                <TextButton
                  isDisabled={isGenerating}
                  buttonText="Generate"
                  onSubmit={handleGenerateSchedule}
                />
                <span css={isGenerating ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                  Generating...
                </span>
              </div>
            </div>
            <div className="timeline-timeframe">
              <TextCheckboxButton
                buttonText="15m"
                buttonValue="15"
                isSelected={timelineDurationMinutes === 15}
                onClick={() => handleTimeframeChange(15)}
              />
              <TextCheckboxButton
                buttonText="30m"
                buttonValue="30"
                isSelected={timelineDurationMinutes === 30}
                onClick={() => handleTimeframeChange(30)}
              />
              <TextCheckboxButton
                buttonText="1h"
                buttonValue="60"
                isSelected={timelineDurationMinutes === 60}
                onClick={() => handleTimeframeChange(60)}
              />
              <TextCheckboxButton
                buttonText="2h"
                buttonValue="120"
                isSelected={timelineDurationMinutes === 120}
                onClick={() => handleTimeframeChange(120)}
              />
              <TextCheckboxButton
                buttonText="3h"
                buttonValue="180"
                isSelected={timelineDurationMinutes === 180}
                onClick={() => handleTimeframeChange(180)}
              />
            </div>
            <ScheduleTimeline
              schedule={schedule}
              timelineDurationMs={timelineDurationMinutes * 60 * 1000}
            />
            <ScheduleTable schedule={schedule} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
