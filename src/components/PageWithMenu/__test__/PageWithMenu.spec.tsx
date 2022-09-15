import React from 'react';
import { render, screen } from '@testing-library/react';

import { PageWithMenu } from '..';

describe('Component PageWithMenu', () => {
  const defaultProps: any = {
    children: <div>Test children</div>,
    precontent: <span>Test Precontent</span>,
  };

  const renderWithProps = (props: any = {}) =>
    render(<PageWithMenu {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
    expect(screen.getByText('Test children')).toBeInTheDocument();
    expect(screen.getByText('Test Precontent')).toBeInTheDocument();
  });
});
