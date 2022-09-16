import React from 'react';
import cx from 'classnames';

import { StSmallLoader } from './SmallLoader.styled';

interface SmallLoaderProps {
  className?: string;
}

const SmallLoader: React.FC<SmallLoaderProps> = ({ className }) => (
  <StSmallLoader
    className={cx({ [className!]: !!className })}
    data-testid="small-loader"
  />
);

SmallLoader.defaultProps = {
  className: '',
};

export default SmallLoader;
