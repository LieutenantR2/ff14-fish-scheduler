/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Styles = css({
  padding: '6px 14px',
  cursor: 'pointer',
  userSelect: 'none',
  backgroundColor: '#526D82',
  border: '1px solid #9DB2BF',
  color: 'rgba(255, 255, 255, 0.87)',
  textShadow: '0px 0px 1px white;',

  '&:not(.disabled):hover': {
    border: '1px solid #DDE6ED',
    color: '#fff',
  },

  '&.disabled': {
    cursor: 'not-allowed',
    border: '1px solid #777',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#777',
  },
});

type TextButtonProps = {
  isDisabled: boolean;
  buttonText: string;
  onSubmit: () => void;
};

const TextButton = ({ isDisabled, buttonText, onSubmit }: TextButtonProps) => {
  return (
    <div
      className={'text-button ' + (isDisabled ? 'disabled' : '')}
      css={Styles}
      onClick={() => onSubmit()}
    >
      {buttonText}
    </div>
  );
};
export default TextButton;
