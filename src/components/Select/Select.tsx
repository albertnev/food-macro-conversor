import React from 'react';
import ReactSelect, { Props } from 'react-select';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';

import { StSelectContainer } from './Select.styled';

interface OptionProps {
  label: string;
  value: any;
}

export interface SelectProps extends Props<OptionProps> {
  options: OptionProps[];
}

const Select: React.FC<SelectProps> = ({ className, ...rest }) => {
  const { t } = useTranslation();

  return (
    <StSelectContainer
      className={cx({
        [className!]: !!className,
        select: true,
      })}
    >
      <ReactSelect
        isMulti={false}
        placeholder={t('select')}
        {...rest}
        classNamePrefix="select"
        defaultValue={
          rest.defaultValue
            ? rest.options.find((opt) => opt.value === rest.defaultValue)
            : undefined
        }
      />
    </StSelectContainer>
  );
};

export default Select;
