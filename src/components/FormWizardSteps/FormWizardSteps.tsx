import React from 'react';
import cx from 'classnames';
import { BsCheck } from 'react-icons/bs';

import { StFormWizardStepsContainer } from './FormWizardSteps.styled';

export interface StepProps {
  completed?: boolean;
  name: string;
}

interface FormWizardStepsProps {
  activeStep: number;
  steps: StepProps[];
}

const FormWizardSteps: React.FC<FormWizardStepsProps> = ({
  activeStep,
  steps,
}) => (
  <StFormWizardStepsContainer
    className={cx({ wizardStepsContainer: true })}
    data-testid="form-wizard-steps"
  >
    <div className="wizardSteps__positioner">
      <ul className="wizardSteps__list width-container">
        {steps.map(({ completed, name }, i) => {
          const isCompleted = activeStep > i || completed;
          const isActive = i === activeStep;

          return (
            <li
              key={`form-wizard-step-${name}`}
              className={cx({
                wizardSteps__stepItem: true,
                'wizardSteps__stepItem--active': isActive,
                'wizardSteps__stepItem--completed': isCompleted,
              })}
              data-testid="wizard-steps-step"
            >
              <div className="wizardSteps__stepNumber">
                {!isActive && isCompleted ? (
                  <BsCheck data-testid="icon-check" />
                ) : (
                  i + 1
                )}
              </div>
              <span className="wizardSteps__stepName">{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  </StFormWizardStepsContainer>
);

export default FormWizardSteps;
