import styled, { css } from 'styled-components';

export const StFoodDetailsContainer = styled.div(
  () => css`
    width: 100%;

    &.foodDetails__verticalDisplay {
      width: auto;
    }

    .foodDetails__titleContainer {
      display: flex;
      flex-direction: row;
      align-items: center;

      .foodDetails__nameContainer {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .foodDetails__nameTitle {
          margin: 0;
        }

        .foodDetails__brand {
          font-weight: 600;
          opacity: 0.6;
        }
      }

      .foodDetails__image {
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

    .foodDetails__detailTitle {
      font-weight: bold;
    }
  `,
);
