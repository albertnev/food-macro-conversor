import styled, { css } from 'styled-components';

export const StAboutContainer = styled.div(
  () => css`
    .about__list {
      padding: 20px;
      margin: 0 20px;
      list-style-type: disc;

      .about__listItem {
        margin-bottom: 12px;

        span {
          vertical-align: middle;
        }

        .about__itemName {
          font-weight: bold;
        }

        .about__itemIcon {
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          vertical-align: text-top;
        }
      }
    }
  `,
);
