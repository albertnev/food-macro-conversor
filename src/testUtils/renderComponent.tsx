import { render } from '@testing-library/react';
import React from 'react';

export const renderComponent = (
  component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => render(component);
