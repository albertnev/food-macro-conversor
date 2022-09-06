import React from 'react';
import { screen } from '@testing-library/react';

import { AppContainer } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component AppContainer', () => {
  const defaultProps: any = {};
  const renderWithProps = (props: any = {}, children: React.ReactNode = null) =>
    renderComponent(
      <AppContainer {...defaultProps} {...props}>
        {children}
      </AppContainer>,
    );

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  it('renders the provided children correctly', () => {
    renderWithProps(undefined, <span>Testing</span>);
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });
});
