import React from 'react';
import cx from 'classnames';

import { StTextareaContainer } from './Textarea.styled';

interface TextareaProps {
  className?: string;
  defaultValue?: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  className,
  defaultValue,
  onChange,
  placeholder,
}) => (
  <StTextareaContainer>
    <textarea
      className={cx('textarea', className)}
      data-testid="textarea"
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={({ target: { value } }) => onChange(value)}
    />
  </StTextareaContainer>
);

Textarea.defaultProps = {
  className: '',
  defaultValue: '',
  placeholder: '',
};

export default Textarea;
