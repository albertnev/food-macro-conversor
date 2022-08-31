import styled, { css } from 'styled-components';

export const StLoaderContainer = styled.div(
  () => css`
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: var(--color-background);
      opacity: 0.9;
    }

    .loader__loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 10px;
      background: var(--carbs-color);
      border-radius: 5px;
      animation: load 1.8s ease-in-out infinite;
      &:before,
      &:after {
        position: absolute;
        display: block;
        content: '';
        animation: load 1.8s ease-in-out infinite;
        height: 10px;
        border-radius: 5px;
      }
      &:before {
        top: -20px;
        left: 10px;
        width: 40px;
        background: var(--protein-color);
      }
      &:after {
        bottom: -20px;
        width: 35px;
        background: var(--fat-color);
      }
    }

    @keyframes load {
      0% {
        transform: translateX(40px);
      }

      50% {
        transform: translateX(-30px);
      }
      100% {
        transform: translateX(40px);
      }
    }
  `,
);
