import styled, { css } from 'styled-components';

import { Select } from '../Select';

export const StSelect = styled(Select)(
  () => css`
    .select__control {
      border: none;
      border-bottom: 2px solid var(--color-main-dark);
      border-radius: 0;
      max-width: fit-content;
      min-height: 22px;

      .select__value-container {
        padding-top: 0;
        padding-bottom: 0;

        .select__input-container {
          padding: 0;
        }
      }

      .select__dropdown-indicator {
        padding: 2px;
      }

      .select__indicator-separator {
        margin: 4px 0;
      }
    }
  `,
);
