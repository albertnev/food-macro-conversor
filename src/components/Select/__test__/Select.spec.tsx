import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component Select', () => {
  const defaultProps = {
    onChange: jest.fn(),
    options: [
      {
        label: 'Opt A',
        value: 'opt-a',
      },
      {
        label: 'Opt B',
        value: 'opt-b',
      },
    ],
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<Select {...defaultProps} {...props} />);

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

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('select')).toBeInTheDocument();
  });

  it('shows the provided options', async () => {
    renderWithProps();
    await openSelect();

    defaultProps.options.forEach((opt: any) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  it('selects by default the option with the value equal to defaultValue provided', () => {
    renderWithProps({ defaultValue: 'opt-b' });
    expect(screen.getByText('Opt B')).toBeInTheDocument();
  });

  it('shows the provided placeholder in stead of the default one', () => {
    const placeholder = 'test placeholder';
    renderWithProps({ placeholder });

    expect(
      screen.getByText(placeholder, { selector: '.select__placeholder' }),
    ).toBeInTheDocument();
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

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('select')).toHaveClass('test-class');
  });
});
