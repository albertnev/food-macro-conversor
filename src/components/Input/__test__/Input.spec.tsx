import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component Input', () => {
  const defaultProps = {
    onChange: jest.fn(),
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<Input {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('input-control')).toBeInTheDocument();
  });

  it('renders the provided element for icon prop, if any', () => {
    renderWithProps({ icon: <span>Test icon</span> });
    expect(screen.getByTestId('input-icon')).toBeInTheDocument();
    expect(screen.getByText('Test icon')).toBeInTheDocument();
  });

  it('shows by default the defaultValue provided and allows changing it', async () => {
    const defaultValue = 'Test value';
    renderWithProps({ defaultValue });
    expect(screen.getByDisplayValue(defaultValue)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('input-control'), ' new');
    expect(screen.getByDisplayValue(`${defaultValue} new`)).toBeInTheDocument();
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

  it('shows the provided placeholder, if any', () => {
    renderWithProps({ placeholder: 'test placeholder' });
    expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument();
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('input')).toHaveClass('test-class');
  });
});
