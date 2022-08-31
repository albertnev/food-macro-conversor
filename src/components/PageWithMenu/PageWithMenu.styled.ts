import styled, { css } from 'styled-components';

export const StPageWithMenuContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
    align-items: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
  `,
);
