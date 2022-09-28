import styled, { css } from 'styled-components';

export const StFoodListContainer = styled.div(
  () => css`
    width: 100%;

    .customFoodList__addFoodButton {
      padding: 8px 16px;
      margin-left: auto;
    }

    .customFoodList__emptyContainer {
      display: flex;
      margin-top: 40px;
      width: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      opacity: 0.8;

      .customFoodList__emptyIcon {
        font-size: 56px;
      }
    }
  `,
);
