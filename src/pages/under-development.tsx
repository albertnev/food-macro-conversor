import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { MdComputer } from 'react-icons/md';

import { PageWithMenu } from '../components/PageWithMenu';
import { StUnderDevelopmentContainer } from '../styles/UnderDevelopment.styled';

const Page404: NextPage = () => {
  const { t } = useTranslation();

  return (
    <PageWithMenu>
      <Head>
        <title>{`Macro Conversor - ${t('underDevelopment')}`}</title>
      </Head>
      <StUnderDevelopmentContainer>
        <h1 className="underDevelopment__title">
          <MdComputer /> <span>{t('underDevelopment')}</span>
        </h1>
        <div className="underDevelopment__textDescription">
          {t('underDevelopmentDescription')}
        </div>
      </StUnderDevelopmentContainer>
    </PageWithMenu>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['common'])),
  },
});

export default Page404;
