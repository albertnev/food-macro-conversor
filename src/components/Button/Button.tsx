import React from 'react';
import cx from 'classnames';

import { StButton } from './Button.styled';

interface ButtonProps {
  className?: string;
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  icon,
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
    data-testid="button"
    type="button"
    onClick={onClick}
  >
    {icon && <span className="button__icon">{icon}</span>}
    <span className="button__label">{label}</span>
  </StButton>
);

Button.defaultProps = {
  className: '',
  icon: undefined,
  secondary: false,
};

export default Button;
