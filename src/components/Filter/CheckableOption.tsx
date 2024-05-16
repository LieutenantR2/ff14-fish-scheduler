/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Styles = css({
  display: 'flex',
  flexDirection: 'row',
  minWidth: '170px',
  width: '40%',
  alignItems: 'center',
  padding: '3px',
  borderRadius: '4px',
  margin: '2px',
  lineHeight: '1rem',
  border: '1px solid #777',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  color: '#777',
  textShadow: 'none',

  '&.completed': {
    backgroundColor: '#2e3f27',
    border: '1px solid #6a8f63',
    color: '#6a8f63',
  },

  '&.disabled:not(.completed)': {
    cursor: 'not-allowed',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  '&:not(.completed):not(.disabled)': {
    cursor: 'pointer',

    '&.checked': {
      backgroundColor: '#526D82',
      border: '1px solid #9DB2BF',
      color: 'rgba(255, 255, 255, 0.87)',
      textShadow: '0px 0px 1px white;',
    },

    '&:hover': {
      border: '1px solid #DDE6ED',
      color: '#fff',
    },
  },

  '.checkbox': {
    flexShrink: 0,
  },

  '.icon': {
    flexShrink: 0,
    margin: 'auto 4px',
  },

  '.label': {
    flexShrink: 1,
    fontSize: '0.9rem',
    margin: 'auto 8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

type CheckableOptionProps = {
  isIncluded: boolean;
  isCompleted: boolean;
  isDisabled: boolean;
  label: string;
  iconClass?: string;
  handleClick: (checked: boolean) => void;
};

const CheckableOption = ({
  isIncluded,
  isCompleted,
  isDisabled,
  label,
  iconClass,
  handleClick,
}: CheckableOptionProps) => {
  return (
    <div
      className={
        (isIncluded ? 'checked' : '') +
        ' ' +
        (isCompleted ? 'completed' : '') +
        ' ' +
        (isDisabled ? 'disabled' : '')
      }
      css={Styles}
      onClick={() => {
        if (!isCompleted && !isDisabled) {
          handleClick(!isIncluded);
        }
      }}
      title={label}
    >
      <input
        className="checkbox"
        type="checkbox"
        disabled={isCompleted || isDisabled}
        checked={!isCompleted && !isDisabled && isIncluded}
        onChange={() => handleClick(!isIncluded)}
      />
      {!!iconClass && <div className={'icon ' + iconClass} />}
      <span className="label">{label}</span>
    </div>
  );
};

export default CheckableOption;
