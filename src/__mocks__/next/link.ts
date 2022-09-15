import React from 'react';

export default ({ children, ...rest }: { children: React.ReactElement }) =>
  React.cloneElement(children, { ...rest });
