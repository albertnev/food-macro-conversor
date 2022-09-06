import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from '..';

describe('Component Checkbox', () => {
  const defaultProps: any = {
    label: 'Test button',
    onChange: jest.fn(),
  };

  const renderWithProps = (props: any = {}) =>
    render(<Checkbox {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
  });

  it('renders as checked when checked prop is provided as true', () => {
    renderWithProps({ checked: true });
    expect(screen.getByTestId('checkbox').querySelector('input')).toBeChecked();
  });

  it('executes the provided onChange method when clicked', () => {
    renderWithProps();
    const checkboxInput = screen.getByTestId('checkbox').querySelector('input');

    expect(checkboxInput).not.toBeChecked();
    userEvent.click(checkboxInput!);

    expect(checkboxInput).toBeChecked();
  });

  it('allows to change its value even if checked prop is provided as initial value', () => {
    renderWithProps({ checked: true });

    const checkboxInput = screen.getByTestId('checkbox').querySelector('input');
    expect(checkboxInput).toBeChecked();

    userEvent.click(checkboxInput!);
    expect(checkboxInput).not.toBeChecked();
  });
});
