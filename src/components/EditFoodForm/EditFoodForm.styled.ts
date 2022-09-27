import styled, { css } from 'styled-components';

export const StEditFoodFormContainer = styled.div(
  () => css`
    width: 100%;

    .editFoodForm__input {
      width: 100%;

      .input__inputControl {
        text-align: left;
      }
    }

    .editFoodForm__submitButton {
      margin-top: 32px;
      margin-left: auto;
    }

    .editFoodForm__macroDisplay .macroDisplay__inQuantity {
      font-weight: bold;
    }

    &.editFoodForm__verticalDisplay {
      width: auto;
    }

    .editFoodForm__titleContainer {
      display: flex;
      flex-direction: row;
      align-items: center;

      .editFoodForm__nameContainer {
        margin-left: 20px;
        margin-top: -12px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .editFoodForm__nameTitle {
          margin: 0;
          margin-bottom: 10px;
          font-size: 24px;
        }

        .editFoodForm__brand {
          font-weight: 600;
          opacity: 0.6;
        }
      }

      .editFoodForm__image {
        border-radius: 50%;
        border: 4px solid var(--color-main-dark);
        flex-shrink: 0;
        padding: 10px;
        width: 74px;
        height: 74px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        outline: 4px solid var(--color-background);
        outline-offset: -8px;
      }
    }

    .editFoodForm__detailTitle {
      font-weight: bold;
      margin-bottom: 12px;
    }
  `,
);
