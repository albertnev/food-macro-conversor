import styled, { css } from 'styled-components';

export const StFormWizardStepsContainer = styled.div(
  () => css`
    .wizardSteps__positioner {
      width: 100%;
      margin: 0;
      background-color: var(--color-main-accent);
      color: white;
      padding-top: 10px;
      padding-bottom: 10px;

      .wizardSteps__list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin: 0 auto;

        .wizardSteps__stepItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;

          /* Default step */
          .wizardSteps__stepNumber {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-bottom: 5px;
            border: none;
            background-color: var(--color-main-dark);
            color: var(--c-color-main-dark);
          }

          &:not(.wizardSteps__stepItem--active):not(.wizardSteps__stepItem--completed) {
            .wizardSteps__stepName {
              opacity: 0.8;
            }
          }

          &.wizardSteps__stepItem--active,
          &.wizardSteps__stepItem--completed {
            .wizardSteps__stepNumber {
              opacity: 1;
            }
          }

          /* Active step */
          &.wizardSteps__stepItem--active {
            .wizardSteps__stepNumber {
              border: none;
              background-color: var(--color-background);
              color: var(--color-main-accent);
            }
          }

          /* Completed step */
          &.wizardSteps__stepItem--completed:not(.wizardSteps__stepItem--active) {
            .wizardSteps__stepNumber {
              background-color: transparent;
              border: 2px solid white;
              font-size: 20px;
            }
          }
        }
      }
    }
  `,
);
