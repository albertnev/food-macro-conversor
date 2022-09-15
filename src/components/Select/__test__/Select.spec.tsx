import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from '..';

describe('Component Select', () => {
  const defaultProps: any = {
    options: [
      { label: 'Opt A', value: 'opt-a' },
      { label: 'Opt B', value: 'opt-b' },
    ],
  };

  const renderWithProps = (props: any = {}) =>
    render(<Select {...defaultProps} {...props} />);

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
});
