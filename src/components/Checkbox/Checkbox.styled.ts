import styled, { css } from 'styled-components';

export const StCheckboxContainer = styled.label(
  () => css`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    .checkbox__inputControl {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .checkbox__inputControl + .checkbox__customCheckbox {
      border-radius: var(--bradius-global);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background-color: transparent;
      border: 2px solid var(--color-main-accent);
      margin-right: 10px;

      & > span {
        display: inline-flex;
        opacity: 0;
        font-size: 20px;
      }
    }

    .checkbox__inputControl:checked + .checkbox__customCheckbox {
      background-color: var(--color-main-accent);
      color: white;

      & > span {
        opacity: 1;
      }
    }
  `,
);
