import styled, { css } from 'styled-components';

export const StSelectContainer = styled.div(
  () => css`
    .select__control {
      border-color: var(--color-main-dark);

      &--is-focused {
        outline: 0;
        box-shadow: none;
      }

      .select__dropdown-indicator {
        color: var(--color-main-dark);
      }

      .select__indicator-separator {
        background-color: var(--color-main-dark);
      }

      &:hover {
        border-color: var(--color-main-accent);

        .select__dropdown-indicator {
          color: var(--color-main-accent);
        }

        .select__indicator-separator {
          background-color: var(--color-main-accent);
        }
      }
    }
  `,
);
