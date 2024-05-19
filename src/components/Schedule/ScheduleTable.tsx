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
    </div>
  );
};

export default ScheduleTable;
