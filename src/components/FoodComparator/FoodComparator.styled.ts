import styled, { css } from 'styled-components';

export const StFoodComparatorContainer = styled.div(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .foodComparator__equivalenceIconContainer {
      font-size: 50px;
      color: var(--color-main-accent);
    }
  `,
);
