/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Interval } from './Interval.ts';
import TableRow from './TableRow.tsx';
import TableHeading from './TableHeading.tsx';

const Styles = css({
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',

  '.row-container': {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',

    '.table-row:nth-child(odd)': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },

  '.no-fish-message': {
    alignSelf: 'center',
    marginTop: '16px',
    fontStyle: 'italic',
  },
});

type ScheduleTableProps = {
  schedule: Interval[];
};

const ScheduleTable = ({ schedule }: ScheduleTableProps) => {
  return (
    <div css={Styles}>
      <TableHeading />
      <div className="row-container">
        {schedule.map((interval, i) => (
          <TableRow key={`${interval.fish}-${i}`} interval={interval} />
        ))}
      </div>
      {!schedule.length && (
        <div className="no-fish-message">
          No fishes are available to be caught in the selected time range.
        </div>
      )}
    </div>
  );
};

export default ScheduleTable;
