import React from 'react';
import cx from 'classnames';
import { StButton } from './Button.styled';

interface ButtonProps {
  className?: string;
  label: string;
  onClick: () => void;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  label,
  onClick,
  secondary,
}) => (
  <StButton
    className={cx({
      button: true,
      'button--secondary': secondary,
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
  secondary: false,
};

export default Button;
