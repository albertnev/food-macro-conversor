import React, { useState } from 'react';
import { GiOrange } from 'react-icons/gi';
import { CgDatabase } from 'react-icons/cg';

import { useTranslation } from 'next-i18next';
import { foodDataSources } from '../../constants/foodDataSources';
import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { FoodSearchResultTd } from '../../types/FoodSearchResultTd';
import { Button } from '../Button';
import { Input } from '../Input';
import { ButtonCard } from '../ButtonCard';
import styles from './FoodSelector.module.scss';

interface FoodSelectorProps {
  onSelectFood: (selectedFood: FoodDetailsTd) => void;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ onSelectFood }) => {
  const { t } = useTranslation();

  const [searchStep, setSearchStep] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [foodList, setFoodList] = useState<FoodSearchResultTd[]>();
  const [foodDetails, setFoodDetails] = useState<FoodDetailsTd>();
  const [datasource, setDatasource] = useState<string>(
    foodDataSources.openfoodfacts,
  );

  const fetchFoodData = async (text: string) => {
    const resp = await fetch(`/api/food/search?text=${text}`, {
      headers: { datasource },
    });
    const parsedData = await resp.json();

    setFoodDetails(undefined);
    setFoodList(parsedData);
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
      {searchStep === 0 && (
        <>
          <h2>Selecciona origen de datos</h2>
          <div className={styles.foodSourceButtonsContainer}>
            <ButtonCard
              icon={<GiOrange />}
              isActive={datasource === foodDataSources.openfoodfacts}
              label={t(`foodDataSources.openfoodfacts`)}
              onClick={() => setDatasource(foodDataSources.openfoodfacts)}
            />
            <ButtonCard
              icon={<CgDatabase />}
              isActive={datasource === foodDataSources.bedca}
              label={t(`foodDataSources.bedca`)}
              onClick={() => setDatasource(foodDataSources.bedca)}
            />
          </div>
          <div className={styles.foodSourceDescriptionContainer}>
            <h3>{t(`foodDataSources.${datasource}`)}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: t(`foodDataSourcesDescription.${datasource}`),
              }}
            />
          </div>
          <Button
            label={t('next')}
            onClick={() => setSearchStep((current) => current + 1)}
          />
        </>
      )}
      {searchStep === 1 && (
        <>
          <h2>Búsqueda de alimento</h2>
          <Input onChange={(val: string) => setSearchText(val)} />
          <Button label="Buscar" onClick={() => fetchFoodData(searchText)} />
          <ul>
            {foodList?.length &&
              foodList.map(({ id, name }) => (
                <li key={`food-${id}`}>
                  <span>{name}</span>
                  <Button
                    label={t('select')}
                    onClick={() => fetchFoodDetails(id)}
                  />
                </li>
              ))}
          </ul>
          <Button
            label={t('back')}
            onClick={() => setSearchStep((current) => current - 1)}
          />
          <Button
            label={t('next')}
            onClick={() => setSearchStep((current) => current + 1)}
          />
        </>
      )}
      {searchStep === 2 && foodDetails && (
        <>
          <h2>{foodDetails.name}</h2>
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
          <Button
            label={t('back')}
            onClick={() => setSearchStep((current) => current - 1)}
          />
          <Button label={t('next')} onClick={() => onSelectFood(foodDetails)} />
        </>
      )}
    </>
  );
};

export default FoodSelector;
