import React from 'react';
import { screen } from '@testing-library/react';

import { Loader } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component Loader', () => {
  const defaultProps: any = {};

  const renderWithProps = (props: any = {}) =>
    renderComponent(<Loader {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('loader')).toHaveClass('test-class');
  });
});
