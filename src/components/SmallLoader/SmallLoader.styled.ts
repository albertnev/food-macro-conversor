import styled, { css } from 'styled-components';

export const StSmallLoader = styled.span(
  () => css`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    border: 3px solid;
    border-color: var(--carbs-color) var(--carbs-color) transparent transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    &::after,
    &::before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border: 3px solid;
      border-color: transparent transparent var(--protein-color)
        var(--protein-color);
      width: 22px;
      height: 22px;
      border-radius: 50%;
      box-sizing: border-box;
      animation: rotationBack 0.5s linear infinite;
      transform-origin: center center;
    }

    &::before {
      width: 12px;
      height: 12px;
      border-color: var(--fat-color) var(--fat-color) transparent transparent;
      animation: rotation 1.5s linear infinite;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes rotationBack {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
  `,
);
