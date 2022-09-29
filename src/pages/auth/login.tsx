import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import Head from 'next/head';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
  ClientSafeProvider,
} from 'next-auth/react';
import { RiGoogleLine, RiTwitterLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { PageWithMenu } from '../../components/PageWithMenu';
import { StLoginContainer } from '../../styles/Auth.styled';
import { Button } from '../../components/Button';

interface LoginPageProps {
  providers: ClientSafeProvider[];
}

const Login: NextPage<LoginPageProps> = ({ providers }: LoginPageProps) => {
  const { t } = useTranslation('login');
  const { query } = useRouter();

  const providerIcons = {
    google: <RiGoogleLine />,
    twitter: <RiTwitterLine />,
  };

  useEffect(() => {
    if (query.error) {
      toast.error(query.error, { toastId: 'login-error' });
    }
  }, [query.error]);

  return (
    <PageWithMenu>
      <Head>
        <title>{`Macro Conversor - ${t('login')}`}</title>
      </Head>
      <StLoginContainer>
        <div className="login__descriptionContainer">
          <h2>{t('login')}</h2>
          <p>{t('description.introduction')}</p>
          <ul>
            <li>{t('description.list.saveSettings')}</li>
            <li>{t('description.list.createFood')}</li>
            <li>{t('description.list.saveFavourites')}</li>
          </ul>
          <p>{t('description.notPublishingSocial')}</p>
        </div>
        <div className="login__providersContainer">
          <ul className="login__providersList">
            {Object.values(providers).map((provider) => (
              <li key={provider.name}>
                <Button
                  className={cx(
                    'login__providerButton',
                    `login__providerButton--${provider.id}`,
                  )}
                  onClick={() => signIn(provider.id)}
                >
                  <div className="login__providerIcon">
                    {providerIcons[provider.id as keyof typeof providerIcons]}
                  </div>
                  <span className="login__providerName">
                    {t('signInWith', { provider: provider.name })}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </StLoginContainer>
    </PageWithMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      props: {},
      redirect: { destination: '/equivalence' },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'es', [
        'common',
        'login',
      ])),
      csrfToken: await getCsrfToken(),
      providers: await getProviders(),
    },
  };
};

// export const getStaticProps: GetStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale || 'es', ['common', 'login'])),
//   },
// });

export default Login;
