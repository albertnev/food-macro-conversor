import React from 'react';

export default ({
  children,
  legacyBehavior,
  ...rest
}: {
  children: React.ReactElement;
  legacyBehavior?: boolean;
}) => React.cloneElement(children, { ...rest });
