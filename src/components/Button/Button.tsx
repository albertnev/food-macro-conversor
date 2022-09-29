import React from 'react';
import cx from 'classnames';

import { StButton } from './Button.styled';

interface ButtonCommonProps {
  className?: string;
  'data-testid'?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick: () => void;
  secondary?: boolean;
}

interface ButtonPropsWithChildren {
  children?: React.ReactNode;
  label?: never;
}

interface ButtonPropsWithLabel {
  children?: never;
  label?: string;
}

const Button: React.FC<
  ButtonCommonProps & (ButtonPropsWithLabel | ButtonPropsWithChildren)
> = ({
  children = null,
  className,
  disabled,
  'data-testid': dataTestId,
  icon,
  label = undefined,
  onClick,
  secondary,
}) => (
  <StButton
    className={cx({
      [className!]: !!className,
      button: true,
      'button--disabled': disabled,
      'button--secondary': secondary,
    })}
    data-testid={dataTestId || 'button'}
    disabled={disabled}
    type="button"
    onClick={onClick}
  >
    {icon && <span className="button__icon">{icon}</span>}
    {children || <span className="button__label">{label}</span>}
  </StButton>
);

Button.defaultProps = {
  children: null,
  className: '',
  'data-testid': '',
  disabled: false,
  icon: undefined,
  secondary: false,
};

export default Button;
