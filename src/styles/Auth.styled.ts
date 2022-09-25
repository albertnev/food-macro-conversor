import styled, { css } from 'styled-components';

export const StLoginContainer = styled.div(
  () => css`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;

    .login__descriptionContainer {
      flex: 1;
      min-width: 60%;
      font-size: 18px;
      padding-bottom: 32px;
      padding-right: 0;
      border-bottom: 2px solid var(--color-main-dark);
      border-right: none;

      ul {
        list-style-type: circle;
        list-style-position: outside;
        padding-left: 48px;
        margin: 32px 0;

        li {
          margin-bottom: 12px;
        }
      }
    }

    .login__providersContainer {
      flex: 1;
      padding-top: 32px;
      padding-left: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .login__providersList {
        width: 100%;

        li {
          margin-bottom: 24px;
          width: 100%;

          .login__providerButton {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: var(--color-background);
            color: var(--color-main-dark);
            border: 1px solid var(--color-main-dark);
            font-weight: bold;
            padding-left: 0;

            &:hover {
              box-shadow: 0 0 5px gray;
            }

            .login__providerIcon {
              font-size: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 60px;
              border-right: 1px solid var(--color-main-dark);
            }

            .login__providerName {
              flex: 1;
              display: flex;
              margin-left: 20px;
              justify-content: flex-start;
              text-align: left;
            }

            &.login__providerButton--twitter {
              background-color: #1da1f2;
              border: none;
              color: white;

              .login__providerIcon {
                border-right-color: #116fa9;
              }
            }

            &.login__providerButton--google {
              background-color: #c62828;
              border: none;
              color: white;

              .login__providerIcon {
                border-right-color: #951f1f;
              }
            }
          }
        }
      }
    }

    @media (min-width: 650px) {
      flex-direction: row;
      justify-content: center;

      .login__descriptionContainer {
        padding-right: 32px;
        padding-bottom: 0;
        border-right: 2px solid var(--color-main-dark);
        border-bottom: none;
      }

      .login__providersContainer {
        padding-left: 32px;
        padding-top: 0;
      }
    }
  `,
);
