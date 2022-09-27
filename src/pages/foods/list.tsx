import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { PageWithMenu } from '../../components/PageWithMenu';
import useFetch from '../../hooks/useFetch';
import { Loader } from '../../components/Loader';
import { FoodList } from '../../components/FoodList';
import { FoodSearchResultTd } from '../../types/FoodSearchResultTd';
import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { Button } from '../../components/Button';

const ListFoods: NextPage = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const {
    data: fetchedFoodList,
    fetchData,
    isLoading,
  } = useFetch<FoodSearchResultTd[]>(`/api/food/list-custom`);
  const [selectedFood, setSelectedFood] = useState<FoodSearchResultTd>();

  const editFood = () => {
    if (selectedFood?.id) push(`/foods/update?id=${selectedFood.id}`);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.foodId]);

  return (
    <PageWithMenu>
      <Head>
        <title>{`Macro Conversor - ${t('myFoods')}`}</title>
      </Head>
      {isLoading && <Loader />}
      <FoodList
        foodList={fetchedFoodList}
        onSelect={(food) => setSelectedFood(food)}
      />
      <Button disabled={!selectedFood} label={t('edit')} onClick={editFood} />
    </PageWithMenu>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['common'])),
  },
});

export default ListFoods;
