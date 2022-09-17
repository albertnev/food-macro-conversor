import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Collapsible } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component Collapsible', () => {
  const defaultProps = {
    title: 'Test title',
  };

  const renderWithProps = (props: any = {}, children: React.ReactNode = null) =>
    renderComponent(
      <Collapsible {...defaultProps} {...props}>
        {children}
      </Collapsible>,
    );

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('collapsible')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders the provided children correctly when uncollapsed', () => {
    renderWithProps(undefined, <div>My test text.</div>);

    expect(screen.queryByText('My test text.')).not.toBeInTheDocument();

    userEvent.click(screen.getByText(defaultProps.title));
    expect(screen.getByText('My test text.')).toBeInTheDocument();
  });
});
