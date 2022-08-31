import styled, { css } from 'styled-components';

export const StButton = styled.button(
  () => css`
    border: none;
    border-radius: var(--bradius-global);
    padding: var(--padding-button);
    background-color: var(--color-main-dark);
    color: var(--c-color-main-dark);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 300px) {
      min-width: 110px;
    }

    @media (min-width: 400px) {
      min-width: 150px;
    }

    .button__icon {
      font-size: 24px;
      display: inline-flex;
      margin-right: 10px;
    }

    &:hover {
      background-color: var(--color-main-accent);
    }

    &.button--secondary {
      border: 3px solid var(--color-main-dark);
      font-weight: bold;
      background-color: transparent;
      color: var(--color-main-dark);

      &:hover {
        color: var(--color-main-accent);
        border-color: var(--color-main-accent);
      }
    }
  `,
);
