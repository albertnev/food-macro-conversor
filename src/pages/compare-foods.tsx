import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import React, { useState } from 'react';
import { Input } from '../components/Input';
import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { FoodSearchResultTd } from '../types/FoodSearchResultTd';

const CompareFoods: NextPage = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');
  const [foodData, setFoodData] = useState<FoodSearchResultTd[]>();
  const [foodDetails, setFoodDetails] = useState<FoodDetailsTd>();

  // const fetchFoodData = async (text: string) => {
  //   const resp = await fetch(`/api/food/openfoodfacts/search?text=${text}`);
  //   const parsedData = await resp.json();
  //   setFoodDetails(undefined);
  //   setFoodData(parsedData);
  // };
  // const dataSource = 'openfoodfacts';
  const datasource = 'bedca';

  const fetchFoodData = async (text: string) => {
    const resp = await fetch(`/api/food/search?text=${text}`, {
      headers: { datasource },
    });
    const parsedData = await resp.json();
    setFoodDetails(undefined);
    setFoodData(parsedData);
  };

  const fetchFoodDetails = async (id: string) => {
    const resp = await fetch(`/api/food/getDetails?id=${id}`, {
      headers: { datasource },
    });
    const parsedData = await resp.json();
    setFoodDetails(parsedData);
  };

  return (
    <>
      <div
        style={{
          left: 0,
          padding: '20px',
          position: 'fixed',
          top: 0,
        }}
      >
        <div>
          <Input onChange={(val) => setSearchText(val)} />
          <button type="button" onClick={() => fetchFoodData(searchText)}>
            {t('search')}
          </button>
        </div>
        <div>
          <span>
            {t('showingResultsFor')}: {searchText}
          </span>
        </div>
      </div>
      <div>
        <ul
          style={{
            listStyleType: 'none',
            margin: '0 auto',
            marginTop: '100px',
            width: '50%',
          }}
        >
          {foodDetails && (
            <div>
              <div>
                Detalles del alimento <b>{foodDetails.name}</b>:
              </div>
              <ul>
                <li>
                  <div>Kcal: {foodDetails.kcals}kcal</div>
                </li>
                <li>
                  <div>
                    Alcohol: {foodDetails.macronutrients.alcohol.amount}
                    {foodDetails.macronutrients.alcohol.units}
                  </div>
                </li>
                <li>
                  <div>
                    Proteínas: {foodDetails.macronutrients.protein.amount}
                    {foodDetails.macronutrients.protein.units}
                  </div>
                </li>
                <li>
                  <div>
                    Grasas: {foodDetails.macronutrients.fat.amount}
                    {foodDetails.macronutrients.fat.units}
                  </div>
                </li>
                <li>
                  <div>
                    Carbohidratos: {foodDetails.macronutrients.carbs.amount}
                    {foodDetails.macronutrients.carbs.units}
                  </div>
                </li>
              </ul>
            </div>
          )}
          {!!foodData?.length &&
            !foodDetails &&
            foodData.map((food: any) => (
              <li
                style={{
                  border: '1px solid lightgray',
                  borderRadius: '4px',
                  marginBottom: '30px',
                  padding: '20px',
                }}
              >
                {food.imageUrl && (
                  <Image
                    height="100"
                    loader={() => food.imageUrl}
                    src={food.imageUrl}
                    width="100"
                  />
                )}
                <h5 style={{ margin: 0 }}>{food.name}</h5>
                <button type="button" onClick={() => fetchFoodDetails(food.id)}>
                  Ver detalle
                </button>
              </li>
            ))}
          {foodData && foodData.length === 0 && (
            <div>No hay resultados para esta búsqueda</div>
          )}
        </ul>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!)),
  },
});

export default CompareFoods;
