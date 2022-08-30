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
    min-width: 150px;

    &:hover {
      opacity: 0.8;
    }

    &--small {
      min-width: 150px;
    }
  `,
);
