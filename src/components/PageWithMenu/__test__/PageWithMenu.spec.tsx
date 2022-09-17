import React from 'react';
import { screen } from '@testing-library/react';

import { PageWithMenu } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component PageWithMenu', () => {
  const defaultProps = {
    children: <div>Test children</div>,
    precontent: <span>Test Precontent</span>,
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<PageWithMenu {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
    expect(screen.getByText('Test children')).toBeInTheDocument();
    expect(screen.getByText('Test Precontent')).toBeInTheDocument();
  });
});
