import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { FoodDetailsTd } from '../../types/FoodDetailsTd';
import { FoodSearchResultTd } from '../../types/FoodSearchResultTd';
import { Button } from '../Button';
import styles from './FoodSelector.module.scss';
import SearchFood from './components/SearchFood';
import ShowFoodDetails from './components/ShowFoodDetails';

interface FoodSelectorProps {
  onSelectFood: (selectedFood: FoodDetailsTd) => void;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ onSelectFood }) => {
  const { t } = useTranslation();
  const [searchStep, setSearchStep] = useState<number>(0);

  const [foodList, setFoodList] = useState<FoodSearchResultTd[]>();
  const [selectedFood, setSelectedFood] = useState<FoodSearchResultTd>();
  const [foodDetails, setFoodDetails] = useState<FoodDetailsTd>();

  const prevStep = () => {
    setSearchStep((current) => (current - 1 >= 0 ? current - 1 : 0));
  };

  const nextStep = () => {
    if (searchStep === 1) {
      if (foodDetails) onSelectFood(foodDetails);
      return;
    }

    if (searchStep === 0 && selectedFood) {
      setSearchStep((current) => current + 1);
    }
  };

  useEffect(() => {
    setSelectedFood(undefined);
  }, [foodList]);

  useEffect(() => {
    setFoodDetails(undefined);
  }, [foodList, selectedFood]);

  return (
    <>
      {searchStep === 0 && (
        <SearchFood
          foodList={foodList}
          selectedFoodId={selectedFood?.id}
          onSearchResponse={setFoodList}
          onSelect={setSelectedFood}
        />
      )}
      {searchStep === 1 && (
        <ShowFoodDetails
          datasource={selectedFood!.datasource}
          foodDetails={foodDetails}
          foodId={selectedFood!.id}
          onDetailsLoad={setFoodDetails}
        />
      )}
      <div className={styles.buttonsContainer}>
        {searchStep > 0 && <Button label={t('back')} onClick={prevStep} />}
        <Button
          label={t(searchStep === 1 ? 'select' : 'next')}
          onClick={nextStep}
        />
      </div>
    </>
  );
};

export default FoodSelector;
