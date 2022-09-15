import { Router } from 'next/router';

export function useRouter() {
  const router: Partial<Router> = {
    asPath: '',
    defaultLocale: 'es-ES',
    locale: 'es-ES',
    locales: ['es-ES'],
    pathname: '',
    push: jest.fn(),
    query: {},
    replace: jest.fn(),
    route: '/',
  };

  return router;
}
