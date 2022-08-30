import styled, { css } from 'styled-components';

export const StFoodSelectorContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;

    .foodSelector__sourceButtonsContainer {
      display: flex;
      margin: auto;
      width: 300px;
      justify-content: space-between;
    }

    .searchFood__searchContainer {
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      align-items: center;
      width: 100%;

      & .searchFood__input {
        width: 80%;

        @media (min-width: 900px) {
          width: 60%;
        }
      }

      .searchFood__loaderContainer {
        margin-left: 20px;
      }
    }

    .foodSelector__buttonsContainer {
      display: flex;
      flex-direction: row;
      margin-top: 24px;

      button {
        margin-right: 16px;
      }
    }
  `,
);
