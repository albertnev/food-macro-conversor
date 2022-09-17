// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
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

  return {
    i18n: {
      t,
    },
    useTranslation: () => ({
      t,
    }),
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
