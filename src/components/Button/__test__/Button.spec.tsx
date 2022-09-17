import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component Button', () => {
  const defaultProps = {
    label: 'Test button',
    onClick: jest.fn(),
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<Button {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it('calls the provided onClick method when clicked', () => {
    renderWithProps();
    userEvent.click(screen.getByTestId('button'));
    expect(defaultProps.onClick).toBeCalled();
  });

  it('renders the specified icon element', () => {
    renderWithProps({ icon: <span>Test icon</span> });
    expect(screen.getByText('Test icon')).toBeInTheDocument();
  });

  it('changes the appearance of the component when secondary prop is provided as true', () => {
    renderWithProps({ secondary: true });
    expect(screen.getByTestId('button')).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('button')).toHaveClass('test-class');
  });
});
