import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button className={styles.button} type="button" onClick={onClick}>
    {label}
  </button>
);

export default Button;
