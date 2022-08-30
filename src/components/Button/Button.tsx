import React from 'react';
import cx from 'classnames';
import { StButton } from './Button.styled';

interface ButtonProps {
  className?: string;
  label: string;
  onClick: () => void;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  label,
  onClick,
  small,
}) => (
  <StButton
    className={cx({
      button: true,
      'button--small': small,
      [className!]: !!className,
    })}
    type="button"
    onClick={onClick}
  >
    {label}
  </StButton>
);

Button.defaultProps = {
  className: '',
  small: false,
};

export default Button;
