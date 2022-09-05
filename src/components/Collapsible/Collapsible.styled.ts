import styled, { css } from 'styled-components';

export const StCollapsibleContainer = styled.section(
  () => css`
    .collapsible__titleContainer {
      cursor: pointer;

      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .collapsible__caretIcon {
        display: flex;
        align-items: center;
        margin-right: 8px;
      }

      &--opened,
      &:hover {
        color: var(--color-main-accent);
      }
    }
  `,
);
