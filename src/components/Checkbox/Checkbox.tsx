import React from 'react';
import cx from 'classnames';
import { BsCheck } from 'react-icons/bs';

import { StCheckboxContainer } from './Checkbox.styled';

interface CheckboxProps {
  checked?: boolean;
  className?: string;
  'data-testid'?: string;
  label: string;
  onChange: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  className,
  'data-testid': dataTestId,
  label,
  onChange,
}) => (
  <StCheckboxContainer
    className={cx({
      checkbox: true,
      [className!]: !!className,
    })}
    data-testid={dataTestId || 'checkbox'}
  >
    <input
      className="checkbox__inputControl"
      defaultChecked={!!checked}
      type="checkbox"
      onChange={({ target: { checked: isChecked } }) => onChange(isChecked)}
    />
    <span className="checkbox__customCheckbox">
      <span>
        <BsCheck />
      </span>
    </span>
    <span>{label}</span>
  </StCheckboxContainer>
);

Checkbox.defaultProps = {
  checked: false,
  className: '',
  'data-testid': '',
};

export default Checkbox;
