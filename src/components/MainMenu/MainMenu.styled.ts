import styled, { css } from 'styled-components';

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
    }
  `,
);
