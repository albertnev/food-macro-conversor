import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { PageWithMenu } from '../../components/PageWithMenu';
import useFetch from '../../hooks/useFetch';
import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { foodDataSources } from '../../constants/foodDataSources';
import { Loader } from '../../components/Loader';
import { EditFoodForm } from '../../components/EditFoodForm';
import { fetchServer } from '../../utils/fetchServer';
import navigation from '../../constants/navigation';

const UpdateFood: NextPage = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const {
    data: fetchedFoodData,
    fetchData,
    isLoading: foodFetchLoading,
  } = useFetch<FoodDetailsTd>(`/api/food/getDetails`);

  const fetchUpdate = async (foodData: FoodDetailsTd) => {
    setIsLoading(true);

    const resp = await fetchServer<FoodDetailsTd>('/api/food/update', {
      body: JSON.stringify(foodData),
      method: 'post',
    });

    if (resp.response?.id) {
      toast.success(
        t(
          fetchedFoodData?.id
            ? 'foodEditedSuccessfully'
            : 'foodCreatedSuccessfully',
        ),
      );
      await push(navigation.foods.list);
    } else {
      toast.error(t('errors.genericError'));
    }

    setIsLoading(false);
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
      {(isLoading || foodFetchLoading) && <Loader />}
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
