import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  onChange: (val: string) => void;
}

const Input: React.FC<InputProps> = ({ onChange }) => (
  <input
    className={styles.input}
    type="text"
    onChange={({ target: { value } }) => onChange(value)}
  />
);

export default Input;
