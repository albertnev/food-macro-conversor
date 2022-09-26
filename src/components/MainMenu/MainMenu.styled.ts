import styled, { css } from 'styled-components';

import { getCssVarValue } from '../../utils/getCssVarValue';
import { hexToRgba } from '../../utils/hexToRgba';

export const StMenuContainer = styled.div(
  () => css`
    padding: 20px 0;
    background-color: var(--color-main-menu);
    border-bottom: 2px solid var(--color-main-dark);

    .menu__content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .menu__link {
        display: flex;
        align-items: center;

        &:hover {
          color: var(--color-main-accent);
        }
      }

      .menu__brandName {
        font-weight: bold;

        .menu__brandIcon {
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          font-size: 28px;
        }
      }

      .menu__toggle {
        display: flex;
        flex-direction: row;
        cursor: pointer;

        &:hover {
          color: var(--color-main-accent);
        }

        .menu__activePage {
          margin-right: 24px;
          font-weight: bold;
        }

        .menu__drawerIcon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
      }
    }
  `,
);

export const StMenuDrawerContainer = styled.div(
  () => css`
    position: absolute;
    top: 70px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: row;

    .menu__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${hexToRgba(
        getCssVarValue('--c-color-background'),
        0.6,
      )};
      z-index: 990;
    }

    .menu__drawerMenu {
      margin-left: auto;
      width: fit-content;
      width: min(100%, 350px);
      z-index: 999;
      background-color: var(--color-background);

      .menu__profileContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--color-secondary-dark);
        padding: 16px;
        color: var(--c-color-secondary-dark);

        .menu__profileImage {
          width: 80px;
          height: 80px;
          padding: 4px;
          border-radius: 50%;
          margin-bottom: 12px;
          overflow: hidden;
          border: 2px solid var(--c-color-secondary-dark);

          div {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }

        .menu__profileName,
        .menu__profileEmail {
          max-width: max(70%, 250px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .menu__profileName {
          font-weight: bold;
        }

        .menu__profileEmail {
          font-size: 80%;
        }
      }
    }
  `,
);
