import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { GoSearch } from 'react-icons/go';

import { PageWithMenu } from '../components/PageWithMenu';
import { StPage404Container } from '../styles/Page404.styled';

const Page404: NextPage = () => {
  const { t } = useTranslation();

  return (
    <PageWithMenu>
      <Head>
        <title>{`Macro Conversor - ${t('notFoundPage')}`}</title>
      </Head>
      <StPage404Container>
        <h1 className="page404_404">
          <GoSearch /> <span>404</span>
        </h1>
        <div className="page404__textDescription">{t('pageDoesNotExist')}</div>
      </StPage404Container>
    </PageWithMenu>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['common'])),
  },
});

export default Page404;
