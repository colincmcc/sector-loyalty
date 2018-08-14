import React from 'react';

const Button = (props) => {
  const { buttonText, onClick } = props;
  return (
    <div>
      <button type="button" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
