import { css } from '@emotion/react';

export const TableRowStyles = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '4px 8px',

  '.checkbox': {
    flexShrink: 0,
    flexBasis: '32px',
    margin: '-4px 5px -4px -7px',
    padding: '4px 6px 4px 6px',
  },

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

  '.fish-location': {
    flexGrow: 1,
    flexBasis: '200px',
    padding: '2px 8px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },

  '.fish-intuition': {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '60px',
    alignItems: 'center',

    '.intuition': {
      transform: 'scale(0.7)',
      transformOrigin: 'center',
    },
  },

  '.fishing-sequence': {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '180px',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
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

  [`@media (max-width: 800px)`]: {
    '.fish-icon': {
      transform: 'scale(0.85)',
      transformOrigin: 'center',
    },
    '.bait-icon': {
      transform: 'scale(0.85)',
      transformOrigin: 'center',
    },
    '.icons-icon.intuition': {
      transform: 'scale(0.6)',
      transformOrigin: 'center',
    },
    '.window-weather': {
      display: 'none',
    },
  },

  [`@media (max-width: 480px)`]: {
    '.fish-name': {
      flexShrink: 1,
      flexBasis: '100px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.window-ezt-time': {
      display: 'none !important',
    },
    '.fish-location': {
      display: 'none',
    },
  },
});
