import React from 'react';
import cx from 'classnames';

import { SelectProps } from '../Select/Select';
import { StSelect } from './SimpleSelect.styled';

interface SimpleSelectProps extends SelectProps {}

const SimpleSelect: React.FC<SimpleSelectProps> = ({ className, ...rest }) => (
  <StSelect
    className={cx({
      [className!]: !!className,
      simpleSelect: true,
    })}
    {...rest}
  />
);

export default SimpleSelect;
