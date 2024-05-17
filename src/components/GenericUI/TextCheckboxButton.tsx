/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Styles = css({
  padding: '10px 14px',
  border: '1px solid #9DB2BF',
  cursor: 'pointer',
  userSelect: 'none',
  textShadow: '0px 0px 1px white;',
  backgroundColor: '#526D82',

  '&:not(.selected)': {
    border: '1px solid #777',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#777',
    textShadow: 'none',
  },

  '&:hover': {
    border: '1px solid #DDE6ED',
    color: '#fff',
  },
});

type TextCheckboxButton = {
  isSelected: boolean;
  buttonText: string;
  buttonValue: string;
  onClick: (val: string, isSelected: boolean) => void;
};

const TextCheckboxButton = ({
  isSelected,
  buttonText,
  buttonValue,
  onClick,
}: TextCheckboxButton) => {
  return (
    <div
      css={Styles}
      className={isSelected ? 'selected' : ''}
      onClick={() => onClick(buttonValue, !isSelected)}
      title={buttonText}
    >
      {buttonText}
    </div>
  );
};

export default TextCheckboxButton;
