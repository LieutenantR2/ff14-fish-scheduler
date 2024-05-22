/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableRowStyles } from './TableRowStyles.tsx';

const Styles = css({
  fontWeight: 600,
  borderBottom: '1px solid rgba(255, 255, 255, 0.7)',
});

const TableHeading = () => {
  return (
    <div css={[TableRowStyles, Styles]}>
      <div className="checkbox" />
      <div className="window-local-time">Local Time</div>
      <div className="icon-col" />
      <div className="fish-name">Name</div>
      <div className="fish-location">Location</div>
      <div className="fish-intuition" />
      <div className="fishing-sequence" />
      <div className="window-ezt-time">EZT Time</div>
      <div className="window-weather">Weather</div>
    </div>
  );
};

export default TableHeading;
