/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PublishIcon from '@mui/icons-material/Publish';
import { LARGE_SCREEN_SIZE } from '../constants/UI.ts';

const Styles = css({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#222',
  zIndex: 10,
  borderRight: '1px solid #333',
  boxShadow: '10px 0px 30px 5px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'start',

  '&.expanded': {
    width: '350px',
  },

  '.clickable': {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },

    '&.active': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },

  '.icon': {
    padding: '12px',
    flexGrow: '0',

    '&.MuiSvgIcon-fontSizeMedium': {
      padding: '18px',
    },
  },

  hr: {
    width: '100%',
    borderBottom: '1px solid #333',
    margin: '16px 0',
    padding: 0,
  },

  '.navmenu-row': {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'start',

    '.navmenu-text': {
      padding: '0 12px',
      paddingLeft: '16px',
      lineHeight: '1.2em',
      fontSize: '1.2rem',

      '&.navmenu-title': {
        fontSize: '1.7rem',
      },
    },
  },

  [`@media (max-width: ${LARGE_SCREEN_SIZE})`]: {
    width: '60px',
  },

  [`@media (max-width: 360px)`]: {
    width: '48px',

    '.icon': {
      padding: '12px 8px',
      flexGrow: '0',

      '&.MuiSvgIcon-fontSizeMedium': {
        padding: '18px 12px',
      },
    },
  },
});

type NavigationMenuProps = {
  onPageChange: (page: string) => void;
};

const NavigationMenu = ({ onPageChange }: NavigationMenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState('schedule');

  const handleMenuSelect = useCallback(
    (page: string) => {
      setActivePage(page);
      onPageChange(page);
      setIsExpanded(false);
    },
    [onPageChange]
  );

  return (
    <div css={Styles} className={isExpanded ? 'expanded' : ''}>
      <div className="navmenu-row" title="Menu">
        <MenuIcon
          className="icon clickable"
          fontSize="large"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        {isExpanded && <span className="navmenu-text navmenu-title">Menu</span>}
      </div>
      <hr />
      <div
        className={'navmenu-row clickable ' + (activePage === 'schedule' ? 'active' : '')}
        onClick={() => handleMenuSelect('schedule')}
        title="Scheduler"
      >
        <EventNoteIcon className="icon" fontSize="medium" />
        {isExpanded && <span className="navmenu-text">Scheduler</span>}
      </div>
      <hr />
      <div
        className={'navmenu-row clickable ' + (activePage === 'settings' ? 'active' : '')}
        onClick={() => handleMenuSelect('settings')}
        title="Scheduler Configuration"
      >
        <SettingsIcon className="icon" fontSize="medium" />
        {isExpanded && <span className="navmenu-text">Scheduler Configuration</span>}
      </div>
      <div
        className={'navmenu-row clickable ' + (activePage === 'filter' ? 'active' : '')}
        onClick={() => handleMenuSelect('filter')}
        title="Fish Filters"
      >
        <FilterAltIcon className="icon" fontSize="medium" />
        {isExpanded && <span className="navmenu-text">Fish Filters</span>}
      </div>
      <hr />
      <div
        className={'navmenu-row clickable ' + (activePage === 'import' ? 'active' : '')}
        onClick={() => handleMenuSelect('import')}
        title="Import Configuration"
      >
        <PublishIcon className="icon" fontSize="medium" />
        {isExpanded && <span className="navmenu-text">Import Configuration</span>}
      </div>
    </div>
  );
};

export default NavigationMenu;
