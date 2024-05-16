/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import NavigationMenu from './components/NavigationMenu.tsx';
import { LARGE_SCREEN_SIZE } from './constants/UI.ts';
import reactLogo from './assets/react.svg';
import FishFilterPage from './components/FishFilterPage.tsx';
import ConfigurationProvider from './contexts/ConfigurationProvider.tsx';

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
});

function App() {
  const mediaQuery = window.matchMedia(`(min-width: ${LARGE_SCREEN_SIZE})`);
  const [isLargeScreen, setIsLargeScreen] = useState(mediaQuery.matches);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [mediaQuery]);

  const handleOverlayChange = useCallback((page: string) => {
    setActiveOverlay(page === 'schedule' ? null : page);
  }, []);

  return (
    <>
      <NavigationMenu onPageChange={handleOverlayChange} />
      <ConfigurationProvider>
        <div className="content-container" css={Styles}>
          <div className={'overlay ' + (!activeOverlay ? 'hidden' : '')}>
            {activeOverlay === 'filter' && <FishFilterPage />}
          </div>
          <div>
            <img src={reactLogo} className="logo react" alt="React logo" />
          </div>
        </div>
      </ConfigurationProvider>
    </>
  );
}

export default App;
