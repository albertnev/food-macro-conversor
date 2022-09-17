import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SimpleSelect } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component SimpleSelect', () => {
  const defaultProps = {
    onChange: jest.fn(),
    options: [
      { label: 'Opt A', value: 'opt-a' },
      { label: 'Opt B', value: 'opt-b' },
    ],
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const openSelect = async () => {
    userEvent.click(
      screen.getByTestId('select').querySelector('.select__control')!,
    );

    await waitFor(() =>
      expect(
        screen.getByTestId('select').querySelector('.select__menu'),
      ).toBeInTheDocument(),
    );
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<SimpleSelect {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('select')).toBeInTheDocument();
  });

  it('executes the provided onChange method when selecting an option', async () => {
    renderWithProps();
    await openSelect();

    const targetOption = defaultProps.options[1];
    jest.resetAllMocks();
    userEvent.click(screen.getByText(targetOption.label));

    expect(defaultProps.onChange).toBeCalledWith(
      targetOption,
      expect.any(Object),
    );
  });

  it('sends the rest of the props to the original Select component', () => {
    renderWithProps({ placeholder: 'test placeholder' });
    expect(screen.getByText('test placeholder')).toBeInTheDocument();
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('select')).toHaveClass('test-class');
  });
});
