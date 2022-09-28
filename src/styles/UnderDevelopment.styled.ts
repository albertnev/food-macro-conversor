import styled, { css } from 'styled-components';

export const StUnderDevelopmentContainer = styled.div(
  () => css`
    align-items: center;
    justify-content: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: var(--color-main-dark);

    .underDevelopment__title {
      font-size: 54px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .underDevelopment__textDescription {
      max-width: 60%;
      font-size: 20px;
    }
  `,
);
