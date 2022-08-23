import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import React, { useState } from 'react';
import { Input } from '../components/Input';
import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { FoodSearchResultTd } from '../types/FoodSearchResultTd';
import { calcEquivalentFood } from '../utils/calcEquivalentFood';

const CompareFoods: NextPage = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');
  const [foodData, setFoodData] = useState<FoodSearchResultTd[]>();
  const [foodDetails, setFoodDetails] = useState<FoodDetailsTd>();
  const [datasource, setDatasource] = useState<string>('openfoodfacts');

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

  if (foodDetails) {
    console.log(
      calcEquivalentFood(
        foodDetails!,
        250,
        {
          grams: 100,
          id: '2620',
          kcals: '298',
          macronutrients: {
            alcohol: {
              amount: '0',
              name: 'alcohol',
              units: 'g',
            },
            carbs: {
              amount: '12.01',
              name: 'carbs',
              units: 'g',
            },
            fat: {
              amount: '18.11',
              name: 'fat',
              units: 'g',
            },
            protein: {
              amount: '21.91',
              name: 'protein',
              units: 'g',
            },
          },
          name: 'Empanada de carne',
        }!,
        ['fat', 'carbs'],
      ),
    );
  }

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
        <br />
        <div>
          <button
            type="button"
            onClick={() =>
              setDatasource((current) =>
                current === 'openfoodfacts' ? 'bedca' : 'openfoodfacts',
              )
            }
          >
            Toggle data source
          </button>
          <br />
          <span>
            Data source: <b>{datasource}</b>
          </span>
        </div>
        <br />
        <div>
          <span>
            {t('showingResultsFor')}: {searchText}
          </span>
        </div>
      </div>
      <div>
        {foodDetails && (
          <div
            style={{
              margin: '0 auto',
              marginTop: '100px',
              width: '40%',
            }}
          >
            <div>
              Detalles del alimento <b>{foodDetails.name}</b>:
            </div>
            <ul
              style={{
                listStyleType: 'circle',
                marginTop: '20px',
                paddingLeft: '40px',
              }}
            >
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
        {!!foodData?.length && !foodDetails && (
          <ul
            style={{
              margin: '0 auto',
              marginTop: '100px',
              width: '50%',
            }}
          >
            {foodData.map((food: any) => (
              <li
                key={`food-${food.id}`}
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
                    src={food.imageUrl}
                    unoptimized
                    width="100"
                  />
                )}
                <h5 style={{ margin: 0 }}>{food.name}</h5>
                <button type="button" onClick={() => fetchFoodDetails(food.id)}>
                  Ver detalle
                </button>
              </li>
            ))}
          </ul>
        )}
        {foodData && foodData.length === 0 && (
          <div>No hay resultados para esta búsqueda</div>
        )}
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
