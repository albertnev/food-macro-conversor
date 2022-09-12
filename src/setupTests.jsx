// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => `T_${key}` }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt = '', height = 0, src = '', width = 0 }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} height={height} src={src} width={width} />
  ),
}));
