import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick: () => void;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, small }) => (
  <button
    className={cx({ [styles.button]: true, [styles['button--small']]: small })}
    type="button"
    onClick={onClick}
  >
    {label}
  </button>
);

Button.defaultProps = {
  small: false,
};

export default Button;
