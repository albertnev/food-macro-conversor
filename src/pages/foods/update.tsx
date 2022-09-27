import React, { useEffect } from 'react';
import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { PageWithMenu } from '../../components/PageWithMenu';
import useFetch from '../../hooks/useFetch';
import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { foodDataSources } from '../../constants/foodDataSources';
import { Loader } from '../../components/Loader';
import { EditFoodForm } from '../../components/EditFoodForm';

const UpdateFood: NextPage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const {
    data: fetchedFoodData,
    fetchData,
    isLoading,
  } = useFetch<FoodDetailsTd>(`/api/food/getDetails`);

  const fetchUpdate = (foodData: FoodDetailsTd) => {
    fetch('/api/food/update', {
      body: JSON.stringify(foodData),
      method: 'post',
    });
  };

  useEffect(() => {
    if (query.id) {
      fetchData(
        {
          headers: { datasource: foodDataSources.database },
        },
        `?id=${query.id}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  return (
    <PageWithMenu pageName={t(fetchedFoodData?.id ? 'updateFood' : 'addFood')}>
      <Head>
        <title>{`Macro Conversor - ${t('update')}`}</title>
      </Head>
      {isLoading && <Loader />}
      <EditFoodForm foodDetails={fetchedFoodData} onSubmit={fetchUpdate} />
    </PageWithMenu>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['common'])),
  },
});

export default UpdateFood;
