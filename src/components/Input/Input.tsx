import React, { useEffect, useMemo } from 'react';
import cx from 'classnames';
import debounce from 'lodash.debounce';

import { StInputContainer } from './Input.styled';

export interface InputProps {
  className?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  onChange: (val: string) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  className,
  defaultValue,
  icon,
  onChange,
  placeholder,
}) => {
  const debouncedOnChange = useMemo(
    () =>
      debounce((val: string) => {
        onChange(val);
      }, 850),
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
    <StInputContainer
      className={cx({ [className!]: !!className, input: true })}
      data-testid="input"
    >
      {icon && (
        <div className="input__icon" data-testid="input-icon">
          {icon}
        </div>
      )}
      <input
        className="input__inputControl"
        data-testid="input-control"
        defaultValue={defaultValue}
        placeholder={placeholder}
        type="text"
        onChange={({ target: { value } }) => debouncedOnChange(value)}
      />
    </StInputContainer>
  );
};

Input.defaultProps = {
  className: '',
  defaultValue: '',
  icon: undefined,
  placeholder: '',
};

export default Input;
