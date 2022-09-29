import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { MdOutlineAdd } from 'react-icons/md';
import { TbListSearch } from 'react-icons/tb';

import { PageWithMenu } from '../../components/PageWithMenu';
import useFetch from '../../hooks/useFetch';
import { Loader } from '../../components/Loader';
import { FoodList } from '../../components/FoodList';
import { FoodSearchResultTd } from '../../types/FoodSearchResultTd';
import { Button } from '../../components/Button';
import navigation from '../../constants/navigation';
import { StFoodListContainer } from '../../styles/FoodList';

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
    if (selectedFood?.id)
      push(`${navigation.foods.update}?id=${selectedFood.id}`);
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
      <StFoodListContainer>
        {isLoading && <Loader />}
        <Button
          className="customFoodList__addFoodButton"
          icon={<MdOutlineAdd />}
          label={t('addFood')}
          secondary
          onClick={() => push(navigation.foods.update)}
        />
        {(!!fetchedFoodList?.length && (
          <>
            <FoodList
              foodList={fetchedFoodList}
              onSelect={(food) => setSelectedFood(food)}
            />
            <Button
              disabled={!selectedFood}
              label={t('edit')}
              onClick={editFood}
            />
          </>
        )) || (
          <div
            className="customFoodList__emptyContainer"
            data-testid="custom-food-list-empty"
          >
            <div className="customFoodList__emptyIcon">
              <TbListSearch />
            </div>
            <div>{t('noCustomFoodsSaved')}</div>
            <div>{t('tryAddingCustomFood')}</div>
          </div>
        )}
      </StFoodListContainer>
    </PageWithMenu>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['common'])),
  },
});

export default ListFoods;
