import React, { useEffect, useMemo } from 'react';
import cx from 'classnames';
import debounce from 'lodash.debounce';

import styles from './Input.module.scss';

interface InputProps {
  defaultValue?: string;
  icon?: React.ReactNode;
  onChange: (val: string) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  defaultValue,
  icon,
  onChange,
  placeholder,
}) => {
  const debouncedOnChange = useMemo(
    () =>
      debounce((val: string) => {
        onChange(val);
      }, 500),
    [onChange],
  );

  // Cancel the debounced call if unmounted
  useEffect(
    () => () => {
      debouncedOnChange.cancel();
    },
    [debouncedOnChange],
  );

  return (
    <div className={cx('input', styles.inputContainer)}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        type="text"
        onChange={({ target: { value } }) => debouncedOnChange(value)}
      />
    </div>
  );
};

Input.defaultProps = {
  defaultValue: '',
  icon: undefined,
  placeholder: '',
};

export default Input;
