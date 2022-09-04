import React from 'react';
import cx from 'classnames';

import { InputProps } from '../Input/Input';
import { StSimpleInput } from './SimpleInput.styled';

interface SimpleInputProps extends InputProps {}

const SimpleInput: React.FC<SimpleInputProps> = ({ className, ...props }) => (
  <StSimpleInput
    className={cx({ simpleInput: true, [className!]: !!className })}
    {...props}
  />
);

export default SimpleInput;
