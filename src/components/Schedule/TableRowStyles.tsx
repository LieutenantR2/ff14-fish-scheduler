import { css } from '@emotion/react';

export const TableRowStyles = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '4px 8px',

  '.window-local-time': {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '150px',

    '.local-start-time': {
      flexGrow: 1,
    },

    '.local-end-time': {
      flexGrow: 1,
    },
  },

  '.icon-col': {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '44px',
  },

  '.fish-name': {
    flexGrow: 1,
    flexBasis: '200px',
    padding: '2px 8px',
    boxSizing: 'border-box',
  },

  '.window-ezt-time': {
    flexGrow: 0,
    flexBasis: '100px',
    textAlign: 'center',
  },

  '.window-weather': {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '180px',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
  },

  [`@media (max-width: 600px)`]: {
    '.fish-icon': {
      transform: 'scale(0.85)',
      transformOrigin: 'center',
    },
    '.window-weather': {
      display: 'none',
    },
  },

  [`@media (max-width: 480px)`]: {
    '.window-ezt-time': {
      display: 'none !important',
    },
  },
});
