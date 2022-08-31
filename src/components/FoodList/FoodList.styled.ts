import styled, { css } from 'styled-components';

export const StFoodList = styled.ul(
  () => css`
    overflow: hidden;
    overflow-y: auto;
    padding: 10px;
    padding-left: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .foodList__item {
      width: 100%;
      border-radius: var(--bradius-global);
      margin-bottom: 10px;
      cursor: pointer;
      overflow: hidden;

      > div {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
      }

      .foodList__foodImage {
        width: 50px;
        height: 100%;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-background);
      }

      .foodList__foodDetails {
        flex: 1;
        padding: 12px;
        background-color: var(--color-main-dark);
        color: var(--c-color-main-dark);
        position: relative;

        .foodList__foodName {
          font-weight: 500;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .foodList__sourceIcon {
          position: absolute;
          bottom: 5px;
          right: 10px;
          opacity: 0.5;
        }
      }

      &--selected,
      &:hover {
        .foodList__foodDetails {
          background-color: var(--color-main-accent);
          color: var(--c-color-main-accent);
        }
      }
    }

    @media (min-width: 680px) {
      .foodList__item {
        box-shadow: var(--input-focused-box-shadow);
        width: 200px;
        height: 200px;
        margin-bottom: 20px;

        > div {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .foodList__foodImage {
          width: 100%;
          height: 100px;
          margin: 0 auto;
          padding-bottom: 12px;
        }
      }
    }
  `,
);
