import styled, { css } from 'styled-components';

export const StFoodComparatorContainer = styled.div(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .foodComparator__foodActionButton {
      min-width: auto;
      padding: 2px 8px;
      margin-top: 4px;
      font-size: 90%;
      align-self: flex-start;
    }

    .foodComparator__equivalenceIconContainer {
      margin: 15px;
      font-size: 50px;
      color: var(--color-main-accent);
    }

    .foodDetails__verticalDisplay {
      max-width: 50%;
    }
  `,
);
