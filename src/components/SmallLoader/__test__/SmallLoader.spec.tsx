import React from 'react';
import { screen } from '@testing-library/react';

import { SmallLoader } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component SmallLoader', () => {
  const defaultProps: any = {};

  const renderWithProps = (props: any = {}) =>
    renderComponent(<SmallLoader {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('small-loader')).toBeInTheDocument();
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('small-loader')).toHaveClass('test-class');
  });
});
