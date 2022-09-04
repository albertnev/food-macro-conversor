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

      .menu__pageList {
        display: flex;
        flex-direction: row;

        .menu__page {
          margin-left: 32px;
          &--active {
            color: var(--color-main-accent);
          }
        }
      }

      .menu__drawerIcon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
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
      min-width: max(50%, 300px);
      padding: 24px 40px;
      z-index: 999;
      background-color: var(--color-background);

      .menu__pageList {
        .menu__page {
          &--active {
            color: var(--color-main-accent);
          }

          .menu__link {
            display: flex;
            align-items: center;
            padding: 16px 0;
            border-bottom: 1px solid var(--color-main-accent);
            cursor: pointer;

            &:hover {
              color: var(--color-main-accent);
            }

            .menu__pageIcon {
              color: var(--color-main-accent);
              display: flex;
              align-items: center;
              margin-right: 16px;
              font-size: 24px;
            }
          }
        }
      }
    }
  `,
);
