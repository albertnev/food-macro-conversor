import styled, { css } from 'styled-components';

export const StAppContainer = styled.div(
  () => css`
    overflow: hidden;
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;

    .appContent {
      display: flex;
      flex-direction: column;
      width: 100%;
      overflow: hidden;
      overflow-y: auto;
      margin: 0 auto;

      .width-container {
        width: 100%;
        margin: 0 auto;
        padding-left: 16px;
        padding-right: 16px;

        @media (min-width: 992px) {
          width: 992px;
          padding-left: 40px;
          padding-right: 40px;
        }
      }
    }
  `,
);
