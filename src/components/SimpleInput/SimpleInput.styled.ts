import styled, { css } from 'styled-components';

import { Input } from '../Input';

export const StSimpleInput = styled(Input)(
  () => css`
    background-color: transparent;
    display: inline-block;
    border: none;
    box-shadow: none;
    border-bottom: 2px solid var(--color-main-dark);
    width: auto;
    min-width: auto;
    border-radius: 0;
    width: 70px;

    .input__inputControl {
      font-weight: bold;
      color: var(--color-main-dark);
      padding: 0 10px;
      text-align: center;
    }
  `,
);
