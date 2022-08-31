import styled, { css } from 'styled-components';

export const StInputContainer = styled.label(
  () => css`
    box-shadow: var(--input-box-shadow);
    border-top: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: var(--bradius-input);
    display: flex;
    align-items: center;

    .input__icon {
      padding: 8px;
      padding-right: 0;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .input__inputControl {
      border: none;
      padding: var(--padding-input);
      background: transparent;
      min-width: 0;
      width: 100%;
    }

    &:focus-within {
      box-shadow: var(--input-focused-box-shadow);

      .input__icon {
        color: var(--color-main-accent);
      }
    }

    @media (prefers-color-scheme: dark) {
      background-color: white;

      .input__inputControl {
        color: var(--color-background);
      }

      .input__icon {
        color: var(--color-background);
      }
    }
  `,
);
