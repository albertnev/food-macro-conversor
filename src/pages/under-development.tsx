import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { MdComputer } from 'react-icons/md';

import { PageWithMenu } from '../components/PageWithMenu';
import { StPage404Container } from '../styles/Page404.styled';

const Page404: NextPage = () => {
  const { t } = useTranslation();

  return (
    <PageWithMenu>
      <Head>
        <title>{`Macro Conversor - ${t('underDevelopment')}`}</title>
      </Head>
      <StPage404Container>
        <h1 className="page404_404">
          <MdComputer /> <span>{t('underDevelopment')}</span>
        </h1>
        <div className="page404__textDescription">
          {t('underDevelopmentDescription')}
        </div>
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
