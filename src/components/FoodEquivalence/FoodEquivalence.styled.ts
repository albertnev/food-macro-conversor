import styled, { css } from 'styled-components';

export const StFoodEquivalenceContainer = styled.div(
  () => css`
    .foodEquivalence__filtersHeader {
      margin-bottom: 30px;
      width: 100%;

      .foodEquivalence__gramsInputContainer {
        .foodEquivalence__gramsInputDescription {
          font-size: 18px;

          .foodEquivalence__foodName {
            font-style: italic;
            color: var(--color-secondary-dark);
          }

          .foodEquivalence__foodQuantity {
            font-weight: bold;

            .foodEquivalence__gramsInput {
              display: inline-block;
              border: none;
              box-shadow: none;
              border-bottom: 2px solid var(--color-main-dark);
              width: auto;
              min-width: auto;
              border-radius: 0;
              width: 70px;

              input {
                font-weight: bold;
                color: var(--color-main-dark);
                padding: 0 10px;
                text-align: center;
              }
            }
          }
        }
      }

      .macroSelectorContainer {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .macroSelectorText {
          font-weight: bold;
          color: var(--color-main-dark);
        }
      }
    }

    .foodComparatorContainer {
      overflow-y: auto;
      width: 100%;
    }
  `,
);
