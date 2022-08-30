import styled, { css } from 'styled-components';

export const StMacroDisplayContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;

    .inQuantity {
      font-size: 14px;
      margin: 16px 0;
      opacity: 0.7;
      width: 100%;
      flex-shrink: 0;
    }

    .macroGraph {
      min-width: 0;
      flex-basis: 50%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-bottom: 20px;

      .macroName,
      .macroAmounts {
        text-align: center;
      }

      .macroAmounts {
        font-weight: bold;
      }

      .graphContainer {
        margin: 12px 0;
        height: 40px;
      }
    }

    &.verticalDisplay {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 20px;
      height: auto;

      .inQuantity {
        transform: none;
        opacity: 1;
        font-weight: bold;
        font-size: initial;
        writing-mode: initial;
      }

      .macroGraph {
        margin: 20px 0;
        width: 250px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;

        .graphContainer {
          grid-area: 1 / 1 / 3 / 2;
          margin: 0;
        }

        .macroName,
        .macroAmounts {
          text-align: left;
        }

        .macroName {
          grid-area: 1 / 2 / 2 / 3;
        }

        .macroAmounts {
          grid-area: 2 / 2 / 3 / 3;
        }
      }
    }

    @media (min-width: 550px) {
      flex-wrap: nowrap;
      margin: 20px 0;

      .inQuantity {
        writing-mode: vertical-lr;
        transform: rotate(-180deg);
        width: auto;
        flex-shrink: 1;
      }

      .macroGraph {
        flex-basis: auto;
        flex-shrink: 1;
        margin-left: auto;
        margin-bottom: 0;
      }
    }
  `,
);
