import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import { mockedOpenFoodDetails } from '../../testUtils/mocks/foodDetails';
import { Button } from '../../components/Button';
import { PageWithMenu } from '../../components/PageWithMenu';

const UpdateFood: NextPage = () => {
  const { t } = useTranslation();

  const fetchUpdate = () => {
    fetch('/api/food/update', {
      body: JSON.stringify({ ...mockedOpenFoodDetails, id: '' }),
      method: 'post',
    });
  };

  return (
    <PageWithMenu>
      <Head>
        <title>{`Macro Conversor - ${t('update')}`}</title>
      </Head>
      <Button label="UPDATE" onClick={fetchUpdate} />
    </PageWithMenu>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['common'])),
  },
});

export default UpdateFood;
