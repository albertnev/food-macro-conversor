import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FoodCalculator from '../FoodCalculator';
import { renderComponent } from '../../../testUtils/renderComponent';

describe.skip('Component FoodCalculator', () => {
  const defaultProps = {};
  const renderWithProps = (props: any = {}) =>
    renderComponent(<FoodCalculator {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  it('renders the provided children correctly', () => {
    renderWithProps();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });
});
