import styled, { css } from 'styled-components';

export const StTextareaContainer = styled.div(
  () => css`
    width: 100%;
    box-shadow: var(--input-box-shadow);
    border-top: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: var(--bradius-input);

    &:focus-within {
      box-shadow: var(--input-focused-box-shadow);
    }

    textarea {
      font-family: inherit;
      font-size: inherit;
      padding: 16px;
      border: none;
      width: 100%;
      min-height: 100px;
    }
  `,
);
