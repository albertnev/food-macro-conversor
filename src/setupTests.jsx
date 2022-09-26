// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

jest.mock('next-i18next', () => {
  const t = (key, interpolation) =>
    `T_${key}${
      interpolation
        ? `--${Object.keys(interpolation)
            ?.map((k) => `${k}:${interpolation[k]}`)
            .join('--')}`
        : ''
    }`;

  // eslint-disable-next-line react/prop-types
  const Trans = ({ children, components, i18nKey }) => (
    <>
      {`T_${i18nKey}`}
      {components &&
        Object.keys(components).map((key) => (
          <div
            key={`${i18nKey}-component-${key}`}
            data-testid={`${i18nKey}-${key}`}
          >
            {components[key]}
          </div>
        ))}
      {children}
    </>
  );

  return {
    i18n: {
      t,
      Trans,
    },
    Trans,
    useTranslation: () => ({
      t,
    }),
  };
});

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      email: 'username@mail.com',
      name: 'Username',
    },
  };

  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(
      () => ({ data: mockSession, status: 'authenticated' }), // return type is [] in v3 but changed to {} in v4
    ),
  };
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt = '', height = 0, src = '', width = 0 }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} height={height} src={src} width={width} />
  ),
}));

global.ResizeObserver = ResizeObserver;
