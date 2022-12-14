import styled, { css } from 'styled-components';

export const StFoodEquivalenceContainer = styled.div(
  () => css`
    width: 100%;

    .foodEquivalence__filtersHeader {
      margin-bottom: 30px;
      width: 100%;

      .foodEquivalence__switchFoodsIcon {
        padding: 6px 12px;

        &:not(:hover) {
          background-color: var(--color-secondary-dark);

          @media (prefers-color-scheme: dark) {
            background-color: var(--fat-color);
          }
        }
      }

      .foodEquivalence__gramsInputContainer {
        .foodEquivalence__gramsInputDescription {
          font-size: 18px;

          > div {
            margin: 10px 0;
          }

          .foodEquivalence__foodName {
            font-style: italic;
            color: var(--color-secondary-dark);

            @media (prefers-color-scheme: dark) {
              color: var(--fat-color);
            }
          }

          .foodEquivalence__foodQuantity {
            font-weight: bold;
          }
        }
      }

      .foodEquivalence__macroSelectorContainer {
        max-width: 580px;
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        .foodEquivalence__macroSelectorText {
          width: 100%;
          flex-shrink: 0;
          margin-bottom: 10px;
          font-weight: bold;
          color: var(--color-main-dark);
        }

        .foodEquivalence__macroCheckbox {
          width: 50%;
          flex-shrink: 0;
          margin-bottom: 5px;
        }

        @media (min-width: 600px) {
          .foodEquivalence__macroCheckbox {
            width: auto;
            flex-shrink: 1;
          }
        }
      }
    }

    .foodEquivalence__foodComparatorContainer {
      overflow-y: auto;
      width: 100%;

      .foodEquivalence__foodComparator {
        .inQuantity {
          font-weight: bold;
          opacity: 1;
          font-size: inherit;
        }
      }

      &.foodEquivalence__foodComparatorContainer--mobile {
        .foodEquivalence__foodComparator {
          flex-direction: column;
        }
      }
    }
  `,
);
