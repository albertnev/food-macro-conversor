import styled, { css } from 'styled-components';

export const StMenuList = styled.ul(
  () => css`
    padding: 24px 40px;

    .menu__page {
      &--active {
        color: var(--color-main-accent);
      }

      &.menu__page--restricted {
        color: var(--color-secondary-dark);

        .menu__link .menu__pageIcon {
          color: var(--color-secondary-dark);
        }
      }

      &.menu__page--development {
        opacity: 0.5;
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
  `,
);
