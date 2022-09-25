import React from 'react';
import cx from 'classnames';

import { StButton } from './Button.styled';

interface ButtonCommonProps {
  className?: string;
  'data-testid'?: string;
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
  'data-testid': dataTestId,
  icon,
  label = undefined,
  onClick,
  secondary,
}) => (
  <StButton
    className={cx({
      button: true,
      'button--secondary': secondary,
      [className!]: !!className,
    })}
    data-testid={dataTestId || 'button'}
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
  icon: undefined,
  secondary: false,
};

export default Button;
