import styled, { css } from 'styled-components';

export const StMacroDisplayContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;

    .macroDisplay__inQuantity {
      font-size: 14px;
      margin: 16px 0;
      opacity: 0.7;
      width: 100%;
      flex-shrink: 0;
    }

    &.macroDisplayContainer--verticalDisplay {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 20px;
      height: auto;

      .macroDisplay__inQuantity {
        transform: none;
        opacity: 1;
        font-weight: bold;
        font-size: initial;
        writing-mode: initial;
      }
    }

    @media (min-width: 550px) {
      flex-wrap: nowrap;
      margin: 20px 0;

      .macroDisplay__inQuantity {
        writing-mode: vertical-lr;
        transform: rotate(-180deg);
        width: auto;
        flex-shrink: 1;
      }
    }
  `,
);
