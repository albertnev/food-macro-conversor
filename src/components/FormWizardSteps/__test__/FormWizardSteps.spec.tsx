import React from 'react';
import { screen, within } from '@testing-library/react';

import { FormWizardSteps } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component FormWizardSteps', () => {
  const defaultProps: any = {
    activeStep: 0,
    steps: [{ name: 'Step 1' }, { name: 'Step 2' }, { name: 'Step 3' }],
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<FormWizardSteps {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('form-wizard-steps')).toBeInTheDocument();

    defaultProps.steps.forEach((step: any) => {
      expect(screen.getByText(step.name)).toBeInTheDocument();
    });
  });

  it('displays a check icon and adds the correct class in the previous steps', () => {
    renderWithProps({ activeStep: 1 });

    const prevStep = screen.getAllByTestId('wizard-steps-step')[0];
    const { getByTestId } = within(prevStep);

    expect(getByTestId('icon-check')).toBeInTheDocument();
    expect(prevStep).toHaveClass('wizardSteps__stepItem--completed');
  });

  it('displays a check icon and adds the correct class if the step is completed', () => {
    renderWithProps({
      steps: [
        defaultProps.steps[0],
        defaultProps.steps[1],
        {
          completed: true,
          name: 'Step three',
        },
      ],
    });

    const completedStep = screen.getAllByTestId('wizard-steps-step')[2];
    const { getByTestId } = within(completedStep);

    expect(getByTestId('icon-check')).toBeInTheDocument();
    expect(completedStep).toHaveClass('wizardSteps__stepItem--completed');
  });

  it('adds the correct class if the step is active', () => {
    renderWithProps();

    const currentStep = screen.getAllByTestId('wizard-steps-step')[0];
    expect(currentStep).toHaveClass('wizardSteps__stepItem--active');
  });
});
