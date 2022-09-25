import styled, { css } from 'styled-components';

export const StPage404Container = styled.div(
  () => css`
    align-items: center;
    justify-content: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: var(--color-main-dark);

    .page404_404 {
      margin-left: -32px; // center visually compensating icon visual weight
      font-size: 80px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      span {
        margin-left: 40px;
      }
    }

    .page404__textDescription {
      min-width: 350px;
      width: 60%;
      font-size: 20px;
    }
  `,
);
