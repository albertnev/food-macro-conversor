import React from 'react';
import { render, screen } from '@testing-library/react';

import AppContainer from '../AppContainer';

describe('Component AppContainer', () => {
  const defaultProps: any = {};
  const renderWithProps = (props: any = {}, children: React.ReactNode = null) =>
    render(
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
