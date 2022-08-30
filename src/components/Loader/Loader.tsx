import React from 'react';
import cx from 'classnames';

import { StLoaderContainer } from './Loader.styled';

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => (
  <StLoaderContainer
    className={cx({ [className!]: !!className, loader: true })}
  >
    <span className="loader__loading" />
  </StLoaderContainer>
);

Loader.defaultProps = {
  className: '',
};

export default Loader;
