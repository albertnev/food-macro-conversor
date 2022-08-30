import styled, { css } from 'styled-components';

export const StButtonCard = styled.button(
  () => css`
    padding: 10px;
    border-radius: var(--bradius-input);
    width: 120px;
    height: 120px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    background-color: var(--color-background);
    border: 2px solid var(--color-main-dark);
    color: var(--color-main-dark);
    cursor: pointer;

    &.active {
      border-color: var(--color-main-accent);
      background-color: var(--color-main-accent);
      color: var(--c-color-main-accent);
    }

    .buttonCard__icon {
      font-size: 40px;
    }

    .buttonCard__label {
      font-weight: bold;
      font-size: 16px;
    }
  `,
);
