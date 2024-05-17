/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import './App.css';
import NavigationMenu from './components/NavigationMenu.tsx';
import FishFilterPage from './components/FishFilterPage.tsx';
import ConfigurationProvider from './contexts/ConfigurationProvider.tsx';
import ImportConfigurationPage from './components/ImportConfigurationPage.tsx';
import TextButton from './components/GenericUI/TextButton.tsx';
import { createIntervals, weightedIntervalScheduling } from './components/Schedule/scheduler.ts';
import { Interval } from './components/Schedule/Interval.ts';

const Styles = css({
  boxSizing: 'border-box',
  marginLeft: '60px',
  padding: '8px',
  height: '100%',
  position: 'relative',

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
});

function App() {
  const [schedule, setSchedule] = useState<Interval[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

  const handleOverlayChange = useCallback((page: string) => {
    setActiveOverlay(page === 'schedule' ? null : page);
  }, []);

  const handleGenerateSchedule = useCallback(async () => {
    setIsGenerating(true);
    const intervals = await createIntervals();
    const schedule = await weightedIntervalScheduling(intervals);
    setSchedule(schedule);
    setIsGenerating(false);
  }, []);

  return (
    <>
      <NavigationMenu onPageChange={handleOverlayChange} />
      <ConfigurationProvider>
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
        </div>
      </ConfigurationProvider>
    </>
  );
}

export default App;
