import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
  foodDataSources,
  FoodDataSourcesType,
} from '../../constants/foodDataSources';
import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { FoodSearchResultTd } from '../../types/FoodSearchResultTd';
import { Button } from '../Button';
import styles from './FoodSelector.module.scss';
import SelectSource from './components/SelectSource';
import SearchFood from './components/SearchFood';
import ShowFoodDetails from './components/ShowFoodDetails';

interface FoodSelectorProps {
  onSelectFood: (selectedFood: FoodDetailsTd) => void;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ onSelectFood }) => {
  const { t } = useTranslation();
  const [searchStep, setSearchStep] = useState<number>(0);

  const [foodList, setFoodList] = useState<FoodSearchResultTd[]>();
  const [selectedFoodId, setSelectedFoodId] = useState<string>('');
  const [foodDetails, setFoodDetails] = useState<FoodDetailsTd>();
  const [datasource, setDatasource] = useState<FoodDataSourcesType>(
    foodDataSources.openfoodfacts,
  );

  const prevStep = () => {
    setSearchStep((current) => current - 1);
  };

  const nextStep = () => {
    if (searchStep === 2) {
      if (foodDetails) onSelectFood(foodDetails);
      return;
    }

    if (
      (searchStep === 0 && datasource) ||
      (searchStep === 1 && selectedFoodId)
    ) {
      setSearchStep((current) => current + 1);
    }
  };

  useEffect(() => {
    setFoodList([]);
  }, [datasource]);

  useEffect(() => {
    setSelectedFoodId('');
  }, [foodList]);

  useEffect(() => {
    setFoodDetails(undefined);
  }, [foodList, selectedFoodId]);

  return (
    <>
      {searchStep === 0 && (
        <SelectSource
          selectedSource={datasource}
          onSelectSource={setDatasource}
        />
      )}
      {searchStep === 1 && (
        <SearchFood
          datasource={datasource}
          foodList={foodList}
          selectedFood={foodDetails?.id}
          onSearchResponse={setFoodList}
          onSelect={setSelectedFoodId}
        />
      )}
      {searchStep === 2 && (
        <ShowFoodDetails
          datasource={datasource}
          foodDetails={foodDetails}
          foodId={selectedFoodId}
          onDetailsLoad={setFoodDetails}
        />
      )}
      <div className={styles.buttonsContainer}>
        {searchStep > 0 && <Button label={t('back')} onClick={prevStep} />}
        <Button
          label={t(searchStep === 2 ? 'select' : 'next')}
          onClick={nextStep}
        />
      </div>
    </>
  );
};

export default FoodSelector;
