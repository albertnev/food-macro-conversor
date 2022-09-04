import styled, { css } from 'styled-components';

export const StFoodCalculatorContainer = styled.div(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;

    .foodCalculator__filtersHeader {
      margin-bottom: 30px;
      width: 100%;
      .foodCalculator__gramsInputContainer {
        .foodCalculator__gramsInputDescription {
          font-size: 18px;

          > div {
            margin: 10px 0;
          }

          .foodCalculator__foodName {
            font-style: italic;
            color: var(--color-secondary-dark);

            @media (prefers-color-scheme: dark) {
              color: var(--fat-color);
            }
          }

          .foodCalculator__foodQuantity {
            font-weight: bold;
          }
        }
      }
    }

    .foodCalculator__foodActionButton {
      min-width: auto;
      padding: 2px 8px;
      margin-top: 4px;
      font-size: 90%;
      align-self: flex-start;
    }

    .foodCalculator__macroSelector {
      display: inline-block;
      min-width: 180px;
    }
  `,
);
