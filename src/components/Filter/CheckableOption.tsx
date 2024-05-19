/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Styles = css({
  display: 'flex',
  flexDirection: 'row',
  minWidth: '170px',
  maxWidth: '240px',
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
    flexBasis: '32px',
    margin: '-3px',
    padding: '3px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',

    '&:hover': {
      color: 'rgba(255, 255, 255, 0.87)',
    },

    '&:not(.completed):hover': {
      backgroundColor: '#6a8f63',
    },

    '&.completed:hover': {
      backgroundColor: '#8d3030',
    },
  },

  '.icon': {
    flexShrink: 0,
    margin: 'auto 4px',
  },

  '.label': {
    flexShrink: 1,
    fontSize: '0.9rem',
    margin: 'auto 4px',
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
  showCheckbox?: boolean;
  handleClick: (checked: boolean) => void;
  handleChecked?: (checked: boolean) => void;
};

const CheckableOption = ({
  isIncluded,
  isCompleted,
  isDisabled,
  label,
  iconClass,
  showCheckbox,
  handleClick,
  handleChecked,
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
      {!!showCheckbox && (
        <div
          className={'checkbox' + (isCompleted ? ' completed' : '')}
          onClick={(e) => {
            if (!!handleChecked) {
              handleChecked(!isCompleted);
            }
            e.preventDefault();
            e.stopPropagation();
          }}
          title={isCompleted ? 'Remove Completion' : 'Mark Completed'}
        >
          <CheckCircleIcon />
        </div>
      )}
      {!!iconClass && <div className={'icon ' + iconClass} />}
      <span className="label">{label}</span>
    </div>
  );
};

export default CheckableOption;
