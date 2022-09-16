import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SimpleInput } from '..';

describe('Component SimpleInput', () => {
  const defaultProps: any = {
    onChange: jest.fn(),
  };

  const renderWithProps = (props: any = {}) =>
    render(<SimpleInput {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('executes the provided onChange method with a delay (debounce)', async () => {
    renderWithProps();
    const typedValue = 'test';

    await userEvent.type(screen.getByTestId('input-control'), typedValue);
    expect(screen.getByDisplayValue(typedValue)).toBeInTheDocument();
    expect(defaultProps.onChange).not.toBeCalled();

    await waitFor(() =>
      expect(defaultProps.onChange).toBeCalledWith(typedValue),
    );
  });

  it('sends all the props to the original input', () => {
    renderWithProps({ placeholder: 'simple placeholder' });
    expect(
      screen.getByPlaceholderText('simple placeholder'),
    ).toBeInTheDocument();
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('input')).toHaveClass('test-class');
  });
});
